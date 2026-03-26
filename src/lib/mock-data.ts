/**
 * Centralized realistic mock data for the SnappGame Business Dashboard
 */

export interface MetricData {
    value: string;
    change: string;
    isPositive: boolean;
    raw: number;
}

export const DASHBOARD_METRICS = {
    mrr: {
        label: "Monthly Recurring Revenue (MRR)",
        value: "$48,320",
        delta: "+12.4% vs last month",
        deltaType: "up" as const,
        raw: 48320,
    },
    arpdau: {
        label: "Average Revenue / DAU (ARPDAU)",
        value: "$0.43",
        delta: "+7.1% vs last week",
        deltaType: "up" as const,
        raw: 0.43,
    },
    payers: {
        label: "Paying Users",
        value: "3,280",
        delta: "+4.3% vs last month",
        deltaType: "up" as const,
        raw: 3280,
    },
    churn: {
        label: "Churn Rate",
        value: "3.1%",
        delta: "-0.6 pts vs last month",
        deltaType: "down" as const,
        raw: 3.1,
    },
};

export const OVERVIEW_DATA = {
    today: {
        value: "$1,610.67",
        note: "Updated 10 minutes ago",
        change: "+5.2% vs. yesterday",
        isPositive: true,
    },
    yesterday: {
        value: "$1,531.12",
        change: "-2.1% vs. same day last week",
        isPositive: false,
    },
    last7Days: {
        value: "$11,274.50",
        change: "+8.4% vs. previous 7 days",
        isPositive: true,
    },
    thisMonth: {
        value: DASHBOARD_METRICS.mrr.value,
        change: DASHBOARD_METRICS.mrr.delta,
        isPositive: true,
    },
    last28Days: {
        value: "$46,210.88",
        change: "+6.8% vs. previous 28 days",
        isPositive: true,
    },
};

export const TREND_DATA = [
    { month: "Feb", mrr: 34500, dau: 76000, revenue: 33200 },
    { month: "Mar", mrr: 37100, dau: 81000, revenue: 36500 },
];

export const REVENUE_BY_GAME = [
    { game: "Galaxy Runner", mrr: 18500, arpdaU: 0.52, payers: 1450, conversion: 4.1 },
    { game: "Nova Slots", mrr: 14200, arpdaU: 0.71, payers: 980, conversion: 6.3 },
    { game: "Puzzle Forge", mrr: 9100, arpdaU: 0.31, payers: 540, conversion: 2.7 },
    { game: "Drift Arena", mrr: 6520, arpdaU: 0.28, payers: 310, conversion: 2.1 },
];

export const REVENUE_BY_GEO = [
    { region: "North America", mrr: 19500, arpdaU: 0.61, percentage: 40 },
    { region: "Europe", mrr: 13800, arpdaU: 0.47, percentage: 28 },
    { region: "Asia", mrr: 10220, arpdaU: 0.36, percentage: 21 },
    { region: "Latin America", mrr: 4800, arpdaU: 0.29, percentage: 11 },
];

export const MONETIZATION_FUNNEL = [
    { label: "Installs (last 30d)", value: "82,400", subValue: "" },
    { label: "D1 retained", value: "31,800", subValue: "38.6%" },
    { label: "DAU (avg)", value: "97,500", subValue: "" },
    { label: "Payers", value: "3,280", subValue: "3.4%" },
];

export const PROPERTIES = [
    { id: "1", name: "Galaxy Runner", type: "Mobile Game", accountName: "" },
    { id: "2", name: "Nova Slots", type: "Casino Property", accountName: "" },
    { id: "3", name: "Puzzle Forge", type: "Casual Game", accountName: "" },
    { id: "4", name: "Drift Arena", type: "Racing Property", accountName: "" },
];

export const GAME_PERFORMANCE = [
    {
        game: "Galaxy Runner",
        dau: 24500,
        retention: { d1: 42.3, d7: 28.5, d30: 15.2 },
        revenue: 18500,
        rating: 4.8,
        status: "excellent",
    },
    {
        game: "Nova Slots",
        dau: 18900,
        retention: { d1: 38.7, d7: 24.1, d30: 12.8 },
        revenue: 14200,
        rating: 4.6,
        status: "excellent",
    },
    {
        game: "Puzzle Forge",
        dau: 12300,
        retention: { d1: 35.2, d7: 20.3, d30: 10.5 },
        revenue: 9100,
        rating: 4.3,
        status: "good",
    },
    {
        game: "Drift Arena",
        dau: 8700,
        retention: { d1: 32.1, d7: 18.7, d30: 9.2 },
        revenue: 6500,
        rating: 4.1,
        status: "needs-improvement",
    },
];

export const GAME_RANKINGS = [
    {
        rank: 1,
        game: "Galaxy Runner",
        totalRevenue: 18500,
        totalPlayers: 24500,
        avgSessionTime: 24,
        conversionRate: 4.1,
        trend: "up",
    },
    {
        rank: 2,
        game: "Nova Slots",
        totalRevenue: 14200,
        totalPlayers: 18900,
        avgSessionTime: 31,
        conversionRate: 6.3,
        trend: "up",
    },
    {
        rank: 3,
        game: "Puzzle Forge",
        totalRevenue: 9100,
        totalPlayers: 12300,
        avgSessionTime: 18,
        conversionRate: 2.7,
        trend: "stable",
    },
    {
        rank: 4,
        game: "Drift Arena",
        totalRevenue: 6500,
        totalPlayers: 8700,
        avgSessionTime: 22,
        conversionRate: 2.1,
        trend: "down",
    },
];

export const REPORT_DATA = {
    summary: {
        revenue: { value: "$0.085", label: "YOUR REVENUE", info: "Estimated revenue from all properties" },
        impressions: { value: "111", label: "AD IMPRESSIONS", info: "Total number of ad views" },
        ecpm: { value: "$0.77", label: "eCPM", info: "Effective cost per mille (thousand impressions)" }
    },
    timeRanges: [
        "Today", "Yesterday", "Last 7 Days",
        "This Month: Mar", "Last Month: Feb", "Custom"
    ],
    chartData: [
        { date: "01 Feb 26", revenue: 0.04, impressions: 58, ecpm: 0.65 },
        { date: "08 Feb 26", revenue: 0.04, impressions: 62, ecpm: 0.64 },
        { date: "15 Feb 26", revenue: 0.04, impressions: 59, ecpm: 0.63 },
        { date: "22 Feb 26", revenue: 0.04, impressions: 61, ecpm: 0.66 },
        { date: "01 Mar 26", revenue: 0.07, impressions: 105, ecpm: 0.71 },
        { date: "06 Mar 26", revenue: 0.08, impressions: 110, ecpm: 0.72 },
    ],
    tableData: [
        { date: "All", revenue: "$0.110", impressions: "110", ecpm: "$0.72" },
        { date: "06/03/2026", revenue: "$0.080", impressions: "110", ecpm: "$0.72" },
        { date: "01/03/2026", revenue: "$0.070", impressions: "105", ecpm: "$0.71" },
        { date: "22/02/2026", revenue: "$0.040", impressions: "61", ecpm: "$0.66" },
        { date: "15/02/2026", revenue: "$0.040", impressions: "59", ecpm: "$0.63" },
        { date: "08/02/2026", revenue: "$0.040", impressions: "62", ecpm: "$0.64" },
        { date: "01/02/2026", revenue: "$0.040", impressions: "58", ecpm: "$0.65" },
    ]
};

export const PAYMENT_DATA = [
    { id: "INV-2026-003", month: "February", year: "2026", amount: "$134,800.00", status: "In Process", date: "Mar 01, 2026", type: "Revenue Share" },
    { id: "INV-2026-002", month: "January", year: "2026", amount: "$112,450.50", status: "Paid", date: "Feb 01, 2026", type: "Revenue Share" },
];

export const DETAILED_EARNINGS = [
    {
        month: "March",
        year: "2026",
        status: "Current Month",
        netEarnings: "₹7.20",
        properties: [
            {
                name: "AmandeepSaxena (11081)",
                revenue: "+ $0.080"
            }
        ],
        deductions: [
            {
                label: "Invalid traffic deduction",
                amount: "- $0"
            }
        ],
        grossTotal: "$0.080",
        conversion: {
            rate: "₹90.00",
            label: "USD to INR @ $1 = ₹90.00",
            total: "₹7.20"
        },
        grandTotal: "₹7.20"
    },
    {
        month: "February",
        year: "2026",
        status: "Invoice in process",
        netEarnings: "₹14.40",
        properties: [
            {
                name: "AmandeepSaxena (11081)",
                revenue: "+ $0.160"
            }
        ],
        deductions: [
            {
                label: "Invalid traffic deduction",
                amount: "- $0"
            }
        ],
        grossTotal: "$0.160",
        conversion: {
            rate: "₹90.00",
            label: "USD to INR @ $1 = ₹90.00",
            total: "₹14.40"
        },
        grandTotal: "₹14.40"
    }
];

// Add specific country to mock detailed earnings for demo
if (DETAILED_EARNINGS[0]) {
    (DETAILED_EARNINGS[0] as Record<string, unknown>).user_country = "India";
}

export const SCHEDULED_REPORTS = [
    {
        id: "SCH-001",
        name: "Weekly Revenue Performance",
        type: "Revenue Share",
        frequency: "Every Monday",
        recipients: ["finance@snappgame.com"],
        format: "CSV",
        status: "active",
        lastRun: "Mar 02, 2026",
    },
    {
        id: "SCH-002",
        name: "Daily User Insights",
        type: "User Metrics",
        frequency: "Daily at 8:00 AM",
        recipients: ["ops@snappgame.com", "marketing@snappgame.com"],
        format: "PDF",
        status: "active",
        lastRun: "Mar 05, 2026",
    },
    {
        id: "SCH-003",
        name: "Monthly Games Ranking",
        type: "Game Performance",
        frequency: "1st of every month",
        recipients: ["games-leads@snappgame.com"],
        format: "CSV",
        status: "paused",
        lastRun: "Mar 01, 2026",
    }
];

