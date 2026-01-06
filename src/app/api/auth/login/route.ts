import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
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
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const user = result.rows[0];

    // Verify password - handle both hashed and plain text passwords
    let isPasswordValid = false;
    
    // Check if password is hashed (bcrypt hashes start with $2)
    if (user.password.startsWith("$2")) {
      try {
        isPasswordValid = await bcrypt.compare(password, user.password);
      } catch (error) {
        // If bcrypt comparison fails, treat as invalid
        isPasswordValid = false;
      }
    } else {
      // Plain text password comparison (for migration purposes)
      isPasswordValid = user.password === password;
    }

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Return success with user info (excluding password)
    return NextResponse.json(
      {
        success: true,
        user: {
          email: user.email,
          id: user.id,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

