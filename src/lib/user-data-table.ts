import { generateMetricsForEmail } from "./generate-user-data";
import { getCurrencySymbol } from "./currency-utils";

export interface UserMetricRow {
    useremail: string;
    today_revenue: number;
    yesterday_revenue: number;
    last_7d_revenue: number;
    this_month_revenue: number;
    last_28d_revenue: number;
}

// Map mock users to their deterministic unique metrics
const createMockRow = (email: string): UserMetricRow => {
    const m = generateMetricsForEmail(email);
    return {
        useremail: email,
        today_revenue: m.today,
        yesterday_revenue: m.yesterday,
        last_7d_revenue: m.last7,
        this_month_revenue: m.month,
        last_28d_revenue: m.last28
    };
};

export const USER_DATA_TABLE: UserMetricRow[] = [
    createMockRow("amandeepsaxena@example.com"),
    createMockRow("praveen@example.com"),
    createMockRow("partner@example.com"),
    createMockRow("demo@example.com")
];

/**
 * Helper to fetch a user's data from the 'table' (Simulation)
 */
export const fetchUserMetrics = (email: string | null): UserMetricRow => {
    if (!email) return USER_DATA_TABLE[0];
    const normalized = email.toLowerCase().trim();

    const userRow = USER_DATA_TABLE.find(
        row => row.useremail.toLowerCase() === normalized
    );

    // If not in the hardcoded table, generate it on the fly (infinite users support)
    return userRow || createMockRow(normalized);
};

/**
 * Helper to generate user-specific detailed earnings history
 */
export const fetchDetailedEarnings = (email: string | null, country: string | null = null) => {
    const metrics = fetchUserMetrics(email);
    const baseRevenue = metrics.last_28d_revenue / 2; // Average per month
    const displayEmail = email || "Partner (11081)";
    const symbol = getCurrencySymbol(country);

    return [
        {
            month: "February",
            year: "2026",
            status: "Invoice not yet received",
            netEarnings: `${symbol}${baseRevenue.toFixed(2)}`,
            properties: [
                {
                    name: displayEmail,
                    revenue: `+ ${symbol}${baseRevenue.toFixed(3)}`
                }
            ],
            deductions: [
                {
                    label: "Invalid traffic deduction",
                    amount: `- ${symbol}0`
                }
            ],
            grossTotal: `${symbol}${baseRevenue.toFixed(3)}`,
            conversion: {
                rate: "1.00",
                label: `Reported in ${symbol}`,
                total: `${symbol}${baseRevenue.toFixed(2)}`
            },
            grandTotal: `${symbol}${baseRevenue.toFixed(2)}`
        }
    ];
};

/**
 * NEW: Async Fetcher for real database integration
 * Calls the /api/user-metrics endpoint
 */
export const fetchUserMetricsFromAPI = async (email: string | null): Promise<UserMetricRow> => {
    try {
        const response = await fetch("/api/user-metrics", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        });

        if (!response.ok) throw new Error("Failed to fetch metrics");
        return await response.json();
    } catch (err) {
        console.error("fetchUserMetricsFromAPI error:", err);
        return fetchUserMetrics(email); // Fallback to simulated data
    }
};
