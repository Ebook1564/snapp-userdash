"use client";

import React, { useState } from "react";

type RevenueSummary = {
  label: string;
  value: string;
  delta: string;
  deltaType: "up" | "down" | "neutral";
};

type RevenueByGame = {
  game: string;
  mrr: number;
  arpdaU: number;
  payers: number;
  conversion: number; // %
};

type RevenueByGeo = {
  region: string;
  mrr: number;
  arpdaU: number;
};

const summaryCards: RevenueSummary[] = [
  {
    label: "Monthly Recurring Revenue (MRR)",
    value: "$48,300",
    delta: "+12.4% vs last month",
    deltaType: "up",
  },
  {
    label: "Average Revenue / DAU (ARPDAU)",
    value: "$0.43",
    delta: "+7.1% vs last week",
    deltaType: "up",
  },
  {
    label: "Paying Users",
    value: "3,280",
    delta: "+4.3% vs last month",
    deltaType: "up",
  },
  {
    label: "Churn Rate",
    value: "3.1%",
    delta: "-0.6 pts vs last month",
    deltaType: "down",
  },
];

const revenueByGame: RevenueByGame[] = [
  { game: "Galaxy Runner", mrr: 18500, arpdaU: 0.52, payers: 1450, conversion: 4.1 },
  { game: "Nova Slots", mrr: 14200, arpdaU: 0.71, payers: 980, conversion: 6.3 },
  { game: "Puzzle Forge", mrr: 9100, arpdaU: 0.31, payers: 540, conversion: 2.7 },
  { game: "Drift Arena", mrr: 6500, arpdaU: 0.28, payers: 310, conversion: 2.1 },
];

const revenueByGeo: RevenueByGeo[] = [
  { region: "North America", mrr: 19500, arpdaU: 0.61 },
  { region: "Europe", mrr: 13800, arpdaU: 0.47 },
  { region: "Asia", mrr: 10200, arpdaU: 0.36 },
  { region: "Latin America", mrr: 4800, arpdaU: 0.29 },
];

const mockTrendData = [
  { month: "Jan", mrr: 32000, dau: 72000 },
  { month: "Feb", mrr: 34500, dau: 76000 },
  { month: "Mar", mrr: 37100, dau: 81000 },
  { month: "Apr", mrr: 40400, dau: 86000 },
  { month: "May", mrr: 42900, dau: 91000 },
  { month: "Jun", mrr: 48300, dau: 97500 },
];

export default function ClientDashboard() {
  const [dateRange, setDateRange] = useState("Last 30 days");
  const [isExporting, setIsExporting] = useState(false);

  const escapeCSVValue = (value: string | number): string => {
    const stringValue = String(value);
    // If value contains comma, quote, or newline, wrap in quotes and escape quotes
    if (stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  };

  const handleExportCSV = () => {
    setIsExporting(true);

    try {
      const csvData: string[] = [];
      const timestamp = new Date().toISOString().split("T")[0];

      // Header
      csvData.push(`Dashboard Export - ${escapeCSVValue(dateRange)}`);
      csvData.push(`Generated on: ${escapeCSVValue(new Date().toLocaleString())}`);
      csvData.push("");

      // Summary KPIs Section
      csvData.push("SUMMARY KPIs");
      csvData.push("Metric,Value,Change");
      summaryCards.forEach((card) => {
        csvData.push(
          `${escapeCSVValue(card.label)},${escapeCSVValue(card.value)},${escapeCSVValue(card.delta)}`
        );
      });
      csvData.push("");

      // Revenue by Game Section
      csvData.push("REVENUE BY GAME (Last 30 days)");
      csvData.push("Game,MRR,ARPDAU,Payers,Conversion %");
      revenueByGame.forEach((row) => {
        csvData.push(
          `${escapeCSVValue(row.game)},$${row.mrr.toLocaleString()},$${row.arpdaU.toFixed(2)},${row.payers.toLocaleString()},${row.conversion.toFixed(1)}%`
        );
      });
      csvData.push("");

      // Revenue by Region Section
      csvData.push("REVENUE BY REGION (Last 30 days)");
      csvData.push("Region,MRR,ARPDAU");
      revenueByGeo.forEach((row) => {
        csvData.push(
          `${escapeCSVValue(row.region)},$${row.mrr.toLocaleString()},$${row.arpdaU.toFixed(2)}`
        );
      });
      csvData.push("");

      // Trend Data Section
      csvData.push("REVENUE & DAU TREND");
      csvData.push("Month,MRR,DAU");
      mockTrendData.forEach((point) => {
        csvData.push(
          `${escapeCSVValue(point.month)},$${point.mrr.toLocaleString()},${point.dau.toLocaleString()}`
        );
      });
      csvData.push("");

      // Monetization Funnel Section
      csvData.push("MONETIZATION FUNNEL");
      csvData.push("Metric,Value");
      csvData.push("Installs (last 30d),82,400");
      csvData.push("D1 retained,31,800 (38.6%)");
      csvData.push("DAU (avg),97,500");
      csvData.push("Payers,3,280 (3.4%)");

      // Convert to CSV string
      const csvContent = csvData.join("\n");

      // Create blob and download
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      link.setAttribute("href", url);
      link.setAttribute("download", `dashboard-export-${timestamp}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting CSV:", error);
      alert("Failed to export CSV. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white/90">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Monitor revenue performance across games, players, and regions.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-brand-500"
            >
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>Last 90 days</option>
              <option>Year to date</option>
            </select>
            <button
              onClick={handleExportCSV}
              disabled={isExporting}
              className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-white/5"
            >
              {isExporting ? "Exporting..." : "Export CSV"}
            </button>
          </div>
        </div>

        {/* Summary KPI cards */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => (
            <div
              key={card.label}
              className="rounded-xl border border-gray-200 bg-white px-4 py-4 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
                {card.label}
              </p>
              <p className="mt-2 text-xl font-semibold text-gray-900 dark:text-white/90">
                {card.value}
              </p>
              <p
                className={`mt-1 text-xs font-medium ${
                  card.deltaType === "up"
                    ? "text-success-600 dark:text-success-400"
                    : card.deltaType === "down"
                    ? "text-error-600 dark:text-error-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {card.delta}
              </p>
            </div>
          ))}
        </section>

        {/* Trends row */}
        <section className="grid gap-4 lg:grid-cols-3">
          {/* Revenue & DAU trend (mock) */}
          <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white px-4 py-4 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-sm font-semibold text-gray-900 dark:text-white/90">
                  Revenue & DAU trend
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Track how revenue moves with daily active users.
                </p>
              </div>
              <span className="rounded-full bg-success-50 px-2 py-0.5 text-xs font-medium text-success-700 dark:bg-success-500/20 dark:text-success-400">
                Sample data
              </span>
            </div>

            {/* Simple trend visualization using bars/lines via divs (placeholder) */}
            <div className="mt-4">
              <div className="flex items-end gap-2 h-40">
                {mockTrendData.map((point) => {
                  const mrrHeight = (point.mrr / 50000) * 100;
                  const dauHeight = (point.dau / 100000) * 100;
                  return (
                    <div key={point.month} className="flex flex-col items-center flex-1 gap-1">
                      <div className="flex items-end gap-1 w-full">
                        <div
                          className="flex-1 rounded-t bg-brand-500/80 dark:bg-brand-500/60"
                          style={{ height: `${mrrHeight}%` }}
                          title={`MRR: ${point.mrr.toLocaleString()}`}
                        />
                        <div
                          className="flex-1 rounded-t bg-blue-light-400/60 dark:bg-blue-light-400/40"
                          style={{ height: `${dauHeight}%` }}
                          title={`DAU: ${point.dau.toLocaleString()}`}
                        />
                      </div>
                      <span className="mt-1 text-[10px] text-gray-500 dark:text-gray-400">
                        {point.month}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-3 flex items-center justify-end gap-4 text-[11px] text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-brand-500" />
                  <span>MRR</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-blue-light-400" />
                  <span>DAU</span>
                </div>
              </div>
            </div>
          </div>

          {/* Monetization funnel */}
          <div className="rounded-xl border border-gray-200 bg-white px-4 py-4 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
            <h2 className="text-sm font-semibold text-gray-900 mb-2 dark:text-white/90">
              Monetization funnel
            </h2>
            <p className="text-xs text-gray-500 mb-4 dark:text-gray-400">
              See how players move from installs to payers.
            </p>

            <ul className="space-y-3 text-xs">
              <li className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400">Installs (last 30d)</span>
                <span className="font-medium text-gray-900 dark:text-white/90">82,400</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400">D1 retained</span>
                <span className="font-medium text-gray-900 dark:text-white/90">31,800 (38.6%)</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400">DAU (avg)</span>
                <span className="font-medium text-gray-900 dark:text-white/90">97,500</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400">Payers</span>
                <span className="font-medium text-gray-900 dark:text-white/90">3,280 (3.4%)</span>
              </li>
            </ul>

            <div className="mt-4 h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
              <div className="h-2 rounded-full bg-brand-500" style={{ width: "35%" }} />
            </div>
            <p className="mt-2 text-[11px] text-gray-500 dark:text-gray-400">
              Focus on retention first; strong payers follow healthy DAU.
            </p>
          </div>
        </section>

        {/* Breakdown tables */}
        <section className="grid gap-4 lg:grid-cols-2">
          {/* Revenue by game */}
          <div className="rounded-xl border border-gray-200 bg-white px-4 py-4 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white/90">
                Revenue by game
              </h2>
              <span className="text-[11px] text-gray-500 dark:text-gray-400">
                Last 30 days
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-xs">
                <thead>
                  <tr className="text-left text-[11px] uppercase tracking-wide text-gray-400 dark:text-gray-500">
                    <th className="py-2 pr-4">Game</th>
                    <th className="py-2 pr-4">MRR</th>
                    <th className="py-2 pr-4">ARPDAU</th>
                    <th className="py-2 pr-4">Payers</th>
                    <th className="py-2 pr-4">Conversion</th>
                  </tr>
                </thead>
                <tbody>
                  {revenueByGame.map((row) => (
                    <tr key={row.game} className="border-t border-gray-100 dark:border-gray-800">
                      <td className="py-2 pr-4 text-gray-900 dark:text-white/90">{row.game}</td>
                      <td className="py-2 pr-4 text-gray-700 dark:text-gray-300">
                        ${row.mrr.toLocaleString()}
                      </td>
                      <td className="py-2 pr-4 text-gray-700 dark:text-gray-300">
                        ${row.arpdaU.toFixed(2)}
                      </td>
                      <td className="py-2 pr-4 text-gray-700 dark:text-gray-300">
                        {row.payers.toLocaleString()}
                      </td>
                      <td className="py-2 pr-4 text-gray-700 dark:text-gray-300">
                        {row.conversion.toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Revenue by region */}
          <div className="rounded-xl border border-gray-200 bg-white px-4 py-4 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white/90">
                Revenue by region
              </h2>
              <span className="text-[11px] text-gray-500 dark:text-gray-400">
                Last 30 days
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-xs">
                <thead>
                  <tr className="text-left text-[11px] uppercase tracking-wide text-gray-400 dark:text-gray-500">
                    <th className="py-2 pr-4">Region</th>
                    <th className="py-2 pr-4">MRR</th>
                    <th className="py-2 pr-4">ARPDAU</th>
                  </tr>
                </thead>
                <tbody>
                  {revenueByGeo.map((row) => (
                    <tr key={row.region} className="border-t border-gray-100 dark:border-gray-800">
                      <td className="py-2 pr-4 text-gray-900 dark:text-white/90">{row.region}</td>
                      <td className="py-2 pr-4 text-gray-700 dark:text-gray-300">
                        ${row.mrr.toLocaleString()}
                      </td>
                      <td className="py-2 pr-4 text-gray-700 dark:text-gray-300">
                        ${row.arpdaU.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-3 text-[11px] text-gray-500 dark:text-gray-400">
              Use regional insights to prioritize UA spend and localization efforts.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
