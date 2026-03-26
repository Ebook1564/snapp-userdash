import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Try usertable using useremail column first (your schema uses `useremail`).
    let user: Record<string, unknown> | null = null;
    // allow debug flag from client to return raw row (only in non-production)
    const { debug } = await request.json().catch(() => ({ debug: false }));

    try {
      // Primary: usertable with useremail
      const primary = await pool.query(`SELECT * FROM usertable WHERE useremail = $1`, [
        email.toLowerCase().trim(),
      ]);
      if (primary.rows.length) {
        user = primary.rows[0];
        console.log("[profile API] found user in table: usertable (useremail)");
      }
    } catch (err) {
      console.warn("[profile API] usertable query failed:", (err as Error).message);
      // continue to other fallbacks
    }

    // If not found, try some common alternative tables/columns
    if (!user) {
      const candidateTables: Array<{ table: string; column: string }> = [
        { table: "users", column: "email" },
        { table: "user_profiles", column: "email" },
        { table: "users", column: "useremail" },
        { table: "user", column: "email" },
      ];

      for (const cand of candidateTables) {
        try {
          const res = await pool.query(`SELECT * FROM ${cand.table} WHERE ${cand.column} = $1`, [
            email.toLowerCase().trim(),
          ]);
          if (res.rows.length) {
            user = res.rows[0];
            console.log(`[profile API] found user in table: ${cand.table} (${cand.column})`);
            break;
          }
        } catch (err) {
          console.warn(`[profile API] query failed for ${cand.table}.${cand.column}:`, (err as Error).message);
          continue;
        }
      }
    }

    // Final fallback to the legacy saved_passwords table (email column)
    if (!user) {
      try {
        const fallback = await pool.query(`SELECT * FROM saved_passwords WHERE email = $1`, [
          email.toLowerCase().trim(),
        ]);
        if (fallback.rows.length) {
          user = fallback.rows[0];
          console.log("[profile API] found user in table: saved_passwords (fallback)");
        }
      } catch (err) {
        console.error("[profile API] fallback query error for saved_passwords:", (err as Error).message);
        return NextResponse.json({ error: "Database query error" }, { status: 500 });
      }
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

      // Debug logging: print the row keys and a redacted row to help identify available columns.
      try {
        console.log("[profile API] db row keys:", Object.keys(user || {}));
        const redacted = { ...user };
        if (redacted.password) redacted.password = "<redacted>";
        console.log("[profile API] db row:", redacted);
      } catch (e) {
        console.error("[profile API] error logging row:", e);
      }

    // Map fields defensively - don't assume every column exists
    // defensive mapping: handle different column names that may exist in various DB schemas
    const mappedUser = {
      id: user.id ?? null,
      // username fields
      username: user.username ?? user.user_name ?? user.user_name ?? null,
      // prefer the schema's useremail if present
      email:
        user.useremail ?? user.user_email ?? user.email ?? user.username ?? null,
      // expose useremail separately if present
      useremail: user.useremail ?? user.user_email ?? null,
      first_name: user.first_name ?? user.firstname ?? user.name ?? null,
      last_name: user.last_name ?? user.lastname ?? null,
      // phone can be under many names across schemas
      phone:
        user.phone ??
        user.phonenumber ??
        user.mobile ??
        user.phone_number ??
        user.contact ??
        user.userphone ??
        user.phoneno ??
        user.phone_no ??
        user.mobile_no ??
        user.contact_number ??
        user.telephone ??
        user.telephone_no ??
        user.tel ??
        user.msisdn ??
        null,
      bio: user.bio ?? user.description ?? null,
      // country code / name variations
      country_code:
        user.country_code ?? user.countrycode ?? user.country_iso ?? user.iso_country ?? user.countrycode_iso ?? null,
      country_name:
        user.country_name ?? user.country ?? user.country_full ?? user.countryname ?? user.nationality ?? null,
      // keep original fields handy for debugging
      _raw: user,
    };

    // redacted raw row for debug (do not expose passwords)
    const redacted = { ...user };
    if (redacted.password) redacted.password = "<redacted>";

    const responsePayload: Record<string, unknown> = { success: true, user: mappedUser };
    if (debug && process.env.NODE_ENV !== "production") {
      responsePayload.rawRow = redacted;
    }

    return NextResponse.json(responsePayload, { status: 200 });
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
