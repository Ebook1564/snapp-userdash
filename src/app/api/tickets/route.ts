import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export async function POST(request: NextRequest) {
  try {
    // Handle FormData instead of JSON
    const formData = await request.formData();
    console.log("Incoming FormData fields:", Array.from(formData.keys()));

    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const attachment_filename = formData.get("attachment_filename") as string;
    const attachment_filetype = formData.get("attachment_filetype") as string;
    const attachment_filesize = formData.get("attachment_filesize") as string;
    const attachment = formData.get("attachment") as File | null;

    console.log("Parsed form data:", {
      category,
      hasAttachment: !!attachment,
      filename: attachment_filename,
      filetype: attachment_filetype,
      filesize: attachment_filesize,
    });

    const allowedCategories = [
      "technical issue",
      "billing question",
      "feature request",
      "bug report",
      "account issue",
      "others",
      "game",
    ];
    const allowedFiletypes = ["pdf", "jpg", "jpeg", "png"];

    // Validation
    if (!category || !allowedCategories.includes(category)) {
      console.error("Invalid category:", category);
      return NextResponse.json(
        { error: "Invalid category" },
        { status: 400 }
      );
    }

    if (!description) {
      console.error("Missing description");
      return NextResponse.json(
        { error: "Description is required" },
        { status: 400 }
      );
    }

    // Handle attachment validation and saving
    let final_filename: string | null = null;
    let final_filetype: string | null = null;
    let final_filesize: number | null = null;

    if (attachment && attachment_filename !== "null") {
      // Validate file type from actual file
      const mimeType = attachment.type;
      const extension = attachment_filename.split(".").pop()?.toLowerCase();
      
      if (!allowedFiletypes.includes(extension || "")) {
        console.error("Invalid attachment file extension:", extension);
        return NextResponse.json(
          { error: "Invalid attachment filetype. Only JPG, PNG, PDF allowed." },
          { status: 400 }
        );
      }

      if (attachment.size > 10 * 1024 * 1024) { // 10MB
        console.error("File too large:", attachment.size);
        return NextResponse.json(
          { error: "File size exceeds 10MB limit" },
          { status: 400 }
        );
      }

      // Generate unique filename
      const uniqueId = randomUUID();
      const cleanFilename = attachment_filename.replace(/[^a-zA-Z0-9.-]/g, "_");
      final_filename = `${uniqueId}_${cleanFilename}`;
      final_filetype = extension || null;
      final_filesize = attachment.size;

      // Save file to public/uploads/tickets directory
      const uploadsDir = path.join(process.cwd(), "public", "uploads", "tickets");
      const filePath = path.join(uploadsDir, final_filename);

      try {
        // Ensure directory exists - FIXED VERSION
        await mkdir(uploadsDir, { recursive: true });
        
        // Write file
        const buffer = Buffer.from(await attachment.arrayBuffer());
        await writeFile(filePath, buffer);
        
        console.log("File saved successfully:", filePath);
      } catch (fileError) {
        console.error("File save error:", fileError);
        return NextResponse.json(
          { error: "Failed to save attachment" },
          { status: 500 }
        );
      }
    }

    // Insert into database
    const query = `
      INSERT INTO ticket_raise (
        category,
        description,
        attachment_filename,
        attachment_filetype,
        attachment_filesize,
        status
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const values = [
      category,
      description,
      final_filename,
      final_filetype,
      final_filesize,
      "open",
    ];

    console.log("Running query with values:", values);
    const result = await pool.query(query, values);
    console.log("Insert result:", result.rows[0]);

    // Return ticket with file URL if attachment exists
    const ticket = result.rows[0];
    if (final_filename) {
      ticket.attachment_url = `/uploads/tickets/${final_filename}`;
    }

    return NextResponse.json({ ticket }, { status: 201 });

  } catch (error) {
    console.error("Error creating ticket:", error);
    return NextResponse.json(
      { error: "Failed to create ticket" },
      { status: 500 }
    );
  }
}
