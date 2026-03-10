/**
 * Generate unique, deterministic metrics based on a string seed (e.g., email)
 * village-people-style.
 */

// Simple hash function to convert string to a number
const hashString = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
};

// Deterministic random number generator based on a seed
const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};

export interface UserMetricsResult {
    today: number;
    yesterday: number;
    last7: number;
    month: number;
    last28: number;
}

export const generateMetricsForEmail = (email: string): UserMetricsResult => {
    const normalizedEmail = email.toLowerCase().trim();
    const seed = hashString(normalizedEmail);

    // Today's revenue: random between $0.020 and $0.150
    const today = 0.02 + seededRandom(seed) * 0.13;

    // Yesterday: 90% to 110% of today
    const yesterday = today * (0.9 + seededRandom(seed + 1) * 0.2);

    // Last 7 days: 7x average of today/yesterday roughly
    const last7 = (today + yesterday) / 2 * (6.5 + seededRandom(seed + 2) * 1.5);

    // This Month: 25x roughly
    const month = (today + yesterday) / 2 * (22 + seededRandom(seed + 3) * 8);

    // Last 28 days: Month + some more
    const last28 = month * (1.1 + seededRandom(seed + 4) * 0.4);

    return {
        today: Number(today.toFixed(3)),
        yesterday: Number(yesterday.toFixed(3)),
        last7: Number(last7.toFixed(3)),
        month: Number(month.toFixed(3)),
        last28: Number(last28.toFixed(3))
    };
};
