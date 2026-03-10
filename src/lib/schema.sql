-- SQL Migration: Create userdatatable
-- This table stores unique performance metrics for each user.

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

-- Initial Mock Data for User 1
INSERT INTO userdatatable (useremail, today_revenue, yesterday_revenue, last_7d_revenue, this_month_revenue, last_28d_revenue)
VALUES ('amandeepsaxena@example.com', 0.070, 0.065, 0.485, 2.150, 4.300)
ON CONFLICT (useremail) DO NOTHING;

-- Initial Mock Data for User 2 (Praveen)
INSERT INTO userdatatable (useremail, today_revenue, yesterday_revenue, last_7d_revenue, this_month_revenue, last_28d_revenue)
VALUES ('praveen@example.com', 0.125, 0.110, 0.890, 3.420, 7.150)
ON CONFLICT (useremail) DO NOTHING;
