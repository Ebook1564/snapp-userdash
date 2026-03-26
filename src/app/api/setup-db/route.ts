import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
    try {
        // 1. Create the table
        await pool.query(`
      CREATE TABLE IF NOT EXISTS userdatatable (
          id SERIAL PRIMARY KEY,
          useremail VARCHAR(255) UNIQUE NOT NULL,
          today_revenue DECIMAL(10, 3) DEFAULT 0.000,
          yesterday_revenue DECIMAL(10, 3) DEFAULT 0.000,
          last_7d_revenue DECIMAL(10, 3) DEFAULT 0.000,
          this_month_revenue DECIMAL(10, 3) DEFAULT 0.000,
          last_28d_revenue DECIMAL(10, 3) DEFAULT 0.000,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

        // 2. Insert initial data for common users
        const mockUsers = [
            { email: 'amandeepsaxena@example.com', today: 0.070, yesterday: 0.065, last7: 0.485, month: 2.150, last28: 4.300 },
            { email: 'praveen@example.com', today: 0.125, yesterday: 0.110, last7: 0.890, month: 3.420, last28: 7.150 },
            { email: 'partner@example.com', today: 0.042, yesterday: 0.038, last7: 0.295, month: 1.120, last28: 2.340 }
        ];

        for (const user of mockUsers) {
            await pool.query(`
        INSERT INTO userdatatable (useremail, today_revenue, yesterday_revenue, last_7d_revenue, this_month_revenue, last_28d_revenue)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (useremail) DO NOTHING;
      `, [user.email, user.today, user.yesterday, user.last7, user.month, user.last28]);
        }

        return NextResponse.json({
            success: true,
            message: "Database table 'userdatatable' initialized successfully with mock data."
        });
    } catch (error: unknown) {
        console.error("Database setup error:", error);
        return NextResponse.json({
            success: false,
            error: (error as any).message
        }, { status: 500 });
    }
}
