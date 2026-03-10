/**
 * Utility to export data to CSV and trigger a browser download
 */
export const downloadCSV = (data: any[], filename: string, headers?: string[]) => {
    if (data.length === 0) return;

    const csvRows: string[] = [];

    // Add headers if provided, otherwise extract from first item
    const actualHeaders = headers || Object.keys(data[0]);
    csvRows.push(actualHeaders.join(","));

    // Add data rows
    for (const row of data) {
        const values = actualHeaders.map(header => {
            const val = row[header] ?? "";
            const escaped = String(val).replace(/"/g, '""');
            return `"${escaped}"`;
        });
        csvRows.push(values.join(","));
    }

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
