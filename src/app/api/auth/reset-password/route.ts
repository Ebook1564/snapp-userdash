import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const { email, oldPassword, newPassword } = await request.json();

    // Validate input
    if (!email || !oldPassword || !newPassword) {
      return NextResponse.json(
        { error: "Email, old password, and new password are required" },
        { status: 400 }
      );
    }

    // Validate new password length
    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "New password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // Query the saved_passwords table
    const result = await pool.query(
      "SELECT * FROM saved_passwords WHERE email = $1",
      [email.toLowerCase().trim()]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const user = result.rows[0];

    // Verify old password
    let isOldPasswordValid = false;
    
    // Check if password is hashed (starts with bcrypt hash pattern)
    if (user.password.startsWith("$2")) {
      isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    } else {
      // If it's plain text, compare directly (for migration purposes)
      isOldPasswordValid = user.password === oldPassword;
    }

    if (!isOldPasswordValid) {
      return NextResponse.json(
        { error: "Old password is incorrect" },
        { status: 401 }
      );
    }

    // Hash the new password
    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update the password in the database
    // Assuming there's a column for storing the new/updated password
    // You mentioned there's already a null column - I'll update the password column
    // If you have a separate column for new password, adjust the query accordingly
    await pool.query(
      "UPDATE saved_passwords SET password = $1 WHERE email = $2",
      [hashedNewPassword, email.toLowerCase().trim()]
    );

    return NextResponse.json(
      { success: true, message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

