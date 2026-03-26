import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { generateMetricsForEmail } from "@/lib/generate-user-data";

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const normalizedEmail = email.toLowerCase().trim();

        // AUTO-SETUP: Create table and POPULATE if missing
        try {
            await pool.query(`
                CREATE TABLE IF NOT EXISTS userdatatable (
                    id SERIAL PRIMARY KEY,
                    useremail VARCHAR(255) UNIQUE NOT NULL,
                    today_revenue DECIMAL(10, 3) DEFAULT 0.000,
                    yesterday_revenue DECIMAL(10, 3) DEFAULT 0.000,
                    last_7d_revenue DECIMAL(10, 3) DEFAULT 0.000,
                    this_month_revenue DECIMAL(10, 3) DEFAULT 0.000,
                    last_28d_revenue DECIMAL(10, 3) DEFAULT 0.000,
                    dau INTEGER DEFAULT 0,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            `);

            // Migration: Add dau column if it somehow missed the CREATE TABLE (or existing table)
            try {
                await pool.query("ALTER TABLE userdatatable ADD COLUMN IF NOT EXISTS dau INTEGER DEFAULT 0;");
            } catch (err) {
                // Ignore if already exists or IF NOT EXISTS not supported
            }

            // Check if table is empty
            const checkEmpty = await pool.query("SELECT COUNT(*) FROM userdatatable");
            if (parseInt(checkEmpty.rows[0].count) === 0) {
                console.log("[Auto-Setup] Populating empty userdatatable with unique metrics...");
                const seedEmails = [
                    'amandeepsaxena@example.com',
                    'praveen@example.com',
                    'partner@example.com',
                    'demo@example.com'
                ];
                for (const mail of seedEmails) {
                    const metrics = generateMetricsForEmail(mail);
                    await pool.query(`
                        INSERT INTO userdatatable (useremail, today_revenue, yesterday_revenue, last_7d_revenue, this_month_revenue, last_28d_revenue, dau)
                        VALUES ($1, $2, $3, $4, $5, $6, $7)
                        ON CONFLICT (useremail) DO NOTHING;
                    `, [mail, metrics.today, metrics.yesterday, metrics.last7, metrics.month, metrics.last28, metrics.dau]);
                }
            }
        } catch (e) {
            console.warn("Auto-setup check failed:", (e as Error).message);
        }

        // Query the userdatatable
        const result = await pool.query(
            "SELECT * FROM userdatatable WHERE useremail = $1",
            [normalizedEmail]
        );

        if (result.rows.length === 0) {
            // AUTO-INSERT: If user not in table, add them with UNIQUE deterministic metrics
            console.log(`[Metrics API] Auto-registering new user with unique entries: ${normalizedEmail}`);
            const metrics = generateMetricsForEmail(normalizedEmail);

            const insertResult = await pool.query(`
                INSERT INTO userdatatable (useremail, today_revenue, yesterday_revenue, last_7d_revenue, this_month_revenue, last_28d_revenue, dau)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING *;
            `, [normalizedEmail, metrics.today, metrics.yesterday, metrics.last7, metrics.month, metrics.last28, metrics.dau]);

            const newRow = insertResult.rows[0];
            return NextResponse.json({
                id: newRow.id,
                useremail: newRow.useremail,
                today_revenue: parseFloat(newRow.today_revenue),
                yesterday_revenue: parseFloat(newRow.yesterday_revenue),
                last_7d_revenue: parseFloat(newRow.last_7d_revenue),
                this_month_revenue: parseFloat(newRow.this_month_revenue),
                last_28d_revenue: parseFloat(newRow.last_28d_revenue),
                dau: parseInt(newRow.dau),
                created_at: newRow.created_at,
                updated_at: newRow.updated_at
            });
        }

        const row = result.rows[0];

        // Map DB numeric types (which come as strings from pg) to numbers
        return NextResponse.json({
            id: row.id,
            useremail: row.useremail,
            today_revenue: parseFloat(row.today_revenue),
            yesterday_revenue: parseFloat(row.yesterday_revenue),
            last_7d_revenue: parseFloat(row.last_7d_revenue),
            this_month_revenue: parseFloat(row.this_month_revenue),
            last_28d_revenue: parseFloat(row.last_28d_revenue),
            dau: parseInt(row.dau),
            created_at: row.created_at,
            updated_at: row.updated_at
        });

    } catch (error: any) {
        console.error("Fetch metrics error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
