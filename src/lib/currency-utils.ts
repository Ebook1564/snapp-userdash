/**
 * Utility to map country names to currency symbols
 */

export const getCurrencySymbol = (countryName: string | null): string => {
    if (!countryName) return "$"; // Default to USD

    const lowerCountry = countryName.toLowerCase().trim();
    console.log("[getCurrencySymbol] country:", lowerCountry);

    // America/USA
    if (
        lowerCountry === "america" ||
        lowerCountry === "usa" ||
        lowerCountry === "united states" ||
        lowerCountry === "united states of america"
    ) {
        return "$";
    }

    // Common Country Mappings
    const mapping: Record<string, string> = {
        "india": "₹",
        "in": "₹",
        "bharat": "₹",
        "united kingdom": "£",
        "uk": "£",
        "europe": "€",
        "france": "€",
        "germany": "€",
        "italy": "€",
        "spain": "€",
        "japan": "¥",
        "china": "¥",
        "canada": "C$",
        "australia": "A$",
        "brazil": "R$",
        "russia": "₽",
        "turkey": "₺",
        "south korea": "₩",
        "mexico": "Mex$",
        "singapore": "S$",
    };

    return mapping[lowerCountry] || "$"; // Default to $ if unknown, or we could handle it differently
};

export const formatCurrency = (amount: number, countryName: string | null): string => {
    const symbol = getCurrencySymbol(countryName);
    return `${symbol}${amount.toLocaleString()}`;
};
