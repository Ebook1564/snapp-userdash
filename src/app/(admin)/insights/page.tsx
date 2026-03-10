"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import {
  GAME_PERFORMANCE,
  GAME_RANKINGS,
  DASHBOARD_METRICS
} from "@/lib/mock-data";
import { downloadCSV } from "@/lib/csv-utils";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const gamePerformance = GAME_PERFORMANCE;
const topGames = GAME_RANKINGS;
const dashboardMetrics = DASHBOARD_METRICS;

const getStatusColor = (status: string) => {
  switch (status) {
    case "excellent":
      return "bg-success-50 text-success-700 dark:bg-success-500/20 dark:text-success-400";
    case "good":
      return "bg-warning-50 text-warning-700 dark:bg-warning-500/20 dark:text-warning-400";
    case "needs-improvement":
      return "bg-error-50 text-error-700 dark:bg-error-500/20 dark:text-error-400";
    default:
      return "bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
  }
};

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "up":
      return "↑";
    case "down":
      return "↓";
    default:
      return "→";
  }
};

const getTrendColor = (trend: string) => {
  switch (trend) {
    case "up":
      return "text-success-600 dark:text-success-400";
    case "down":
      return "text-error-600 dark:text-error-400";
    default:
      return "text-gray-500 dark:text-gray-400";
  }
};

export default function InsightsPage() {
  const topGame = topGames[0];
  const [dateRange, setDateRange] = useState("Last 30 days");
  const [isExporting, setIsExporting] = useState(false);

  const exportToCSV = () => {
    setIsExporting(true);
    try {
      // Export game performance
      downloadCSV(gamePerformance.map(g => ({
        Game: g.game,
        DAU: g.dau,
        'D1 Retention': `${g.retention.d1}%`,
        'D7 Retention': `${g.retention.d7}%`,
        'D30 Retention': `${g.retention.d30}%`,
        Revenue: g.revenue,
        Rating: g.rating,
        Status: g.status
      })), `game-performance-${new Date().toISOString().split('T')[0]}`);
    } catch (error) {
      console.error("Error exporting report:", error);
      alert("Failed to export report. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white/90">
            Insights
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Comprehensive view of game performance and top performers.
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
            <option>All time</option>
          </select>
          <button
            onClick={exportToCSV}
            disabled={isExporting}
            className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            {isExporting ? (
              <>
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Exporting...
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export Report
              </>
            )}
          </button>
        </div>
      </div>

      {/* Top Game Highlight */}
      <section className="rounded-xl border border-gray-200 bg-gradient-to-br from-brand-50 to-brand-100 px-6 py-6 shadow-sm dark:from-brand-500/10 dark:to-brand-500/5 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <div className="flex items-center gap-2 mb-2">
              <span className="rounded-full bg-brand-500 px-3 py-1 text-xs font-bold text-white">
                #1 Best Game
              </span>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white/90">
                {topGame.game}
              </h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Your top-performing game this month
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Total Revenue
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white/90">
                  ${topGame.totalRevenue.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Total Players
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white/90">
                  {topGame.totalPlayers.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Avg. Session
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white/90">
                  {topGame.avgSessionTime}m
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Conversion
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white/90">
                  {topGame.conversionRate}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Overview Cards */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-4 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
            Total DAU
          </p>
          <p className="mt-2 text-xl font-semibold text-gray-900 dark:text-white/90">
            64,400
          </p>
          <p className="mt-1 text-xs font-medium text-success-600 dark:text-success-400">
            +8.2% vs last month
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white px-4 py-4 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
            Avg. D1 Retention
          </p>
          <p className="mt-2 text-xl font-semibold text-gray-900 dark:text-white/90">
            37.1%
          </p>
          <p className="mt-1 text-xs font-medium text-success-600 dark:text-success-400">
            +2.3 pts vs last month
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white px-4 py-4 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
            Total Revenue
          </p>
          <p className="mt-2 text-xl font-semibold text-gray-900 dark:text-white/90">
            {dashboardMetrics.mrr.value}
          </p>
          <p className="mt-1 text-xs font-medium text-success-600 dark:text-success-400">
            {dashboardMetrics.mrr.delta}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white px-4 py-4 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
            Avg. Rating
          </p>
          <p className="mt-2 text-xl font-semibold text-gray-900 dark:text-white/90">
            4.5
          </p>
          <p className="mt-1 text-xs font-medium text-gray-500 dark:text-gray-400">
            Across all games
          </p>
        </div>
      </section>

      {/* Combined Content Grid */}
      <section className="grid gap-6 lg:grid-cols-2">
        {/* Game Performance Table */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white/90">
                Game Performance Metrics
              </h2>
              <span className="text-[11px] text-gray-500 dark:text-gray-400">
                Last 30 days
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-xs">
                <thead>
                  <tr className="text-left text-[11px] uppercase tracking-wide text-gray-400 dark:text-gray-500 border-b border-gray-200 dark:border-gray-800">
                    <th className="py-3 pr-4">Game</th>
                    <th className="py-3 pr-4">DAU</th>
                    <th className="py-3 pr-4">D1 Ret.</th>
                    <th className="py-3 pr-4">Revenue</th>
                    <th className="py-3 pr-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {gamePerformance.map((game) => (
                    <tr
                      key={game.game}
                      className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <td className="py-3 pr-4 font-medium text-gray-900 dark:text-white/90">
                        {game.game}
                      </td>
                      <td className="py-3 pr-4 text-gray-700 dark:text-gray-300">
                        {game.dau.toLocaleString()}
                      </td>
                      <td className="py-3 pr-4 text-gray-700 dark:text-gray-300">
                        {game.retention.d1}%
                      </td>
                      <td className="py-3 pr-4 text-gray-700 dark:text-gray-300">
                        ${game.revenue.toLocaleString()}
                      </td>
                      <td className="py-3 pr-4">
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${getStatusColor(
                            game.status
                          )}`}
                        >
                          {game.status.replace("-", " ")}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Game Rankings Table */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white/90">
                Game Rankings
              </h2>
              <span className="text-[11px] text-gray-500 dark:text-gray-400">
                Ranked by revenue
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-xs">
                <thead>
                  <tr className="text-left text-[11px] uppercase tracking-wide text-gray-400 dark:text-gray-500 border-b border-gray-200 dark:border-gray-800">
                    <th className="py-3 pr-4">Rank</th>
                    <th className="py-3 pr-4">Game</th>
                    <th className="py-3 pr-4">Revenue</th>
                    <th className="py-3 pr-4">Players</th>
                    <th className="py-3 pr-4">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {topGames.map((game) => (
                    <tr
                      key={game.rank}
                      className={`border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${game.rank === 1
                        ? "bg-brand-50/50 dark:bg-brand-500/5"
                        : ""
                        }`}
                    >
                      <td className="py-3 pr-4">
                        <span
                          className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${game.rank === 1
                            ? "bg-brand-500 text-white"
                            : game.rank === 2
                              ? "bg-gray-400 text-white"
                              : game.rank === 3
                                ? "bg-orange-400 text-white"
                                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                            }`}
                        >
                          {game.rank}
                        </span>
                      </td>
                      <td className="py-3 pr-4 font-medium text-gray-900 dark:text-white/90">
                        {game.game}
                      </td>
                      <td className="py-3 pr-4 text-gray-700 dark:text-gray-300">
                        ${game.totalRevenue.toLocaleString()}
                      </td>
                      <td className="py-3 pr-4 text-gray-700 dark:text-gray-300">
                        {game.totalPlayers.toLocaleString()}
                      </td>
                      <td className="py-3 pr-4">
                        <span
                          className={`text-sm font-medium ${getTrendColor(
                            game.trend
                          )}`}
                        >
                          {getTrendIcon(game.trend)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Insights */}
      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-4 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
          <h2 className="text-sm font-semibold text-gray-900 mb-3 dark:text-white/90">
            Retention Trends
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            Track how player retention evolves over time. Focus on improving D1
            retention for better long-term performance.
          </p>
          <div className="mt-4 min-h-[200px]">
            <ReactApexChart
              options={{
                chart: { type: "bar", toolbar: { show: false }, stacked: false },
                colors: ["#3c50e0", "#80caee", "#10b981"],
                plotOptions: {
                  bar: {
                    horizontal: false,
                    columnWidth: "55%",
                    borderRadius: 4,
                  },
                },
                xaxis: {
                  categories: gamePerformance.map((g) => g.game.split(" ")[0]),
                },
                yaxis: {
                  title: { text: "Retention (%)" },
                  max: 100,
                },
                legend: { position: "top" },
                tooltip: { y: { formatter: (val) => `${val}%` } },
              }}
              series={[
                { name: "D1", data: gamePerformance.map((g) => g.retention.d1) },
                { name: "D7", data: gamePerformance.map((g) => g.retention.d7) },
                { name: "D30", data: gamePerformance.map((g) => g.retention.d30) },
              ]}
              type="bar"
              height={220}
            />
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white px-4 py-4 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
          <h2 className="text-sm font-semibold text-gray-900 mb-3 dark:text-white/90">
            Performance Insights
          </h2>
          <ul className="space-y-3 text-xs">
            <li className="flex items-start gap-2">
              <span className="text-success-500">✓</span>
              <span className="text-gray-700 dark:text-gray-300">
                Galaxy Runner shows excellent retention metrics across all
                cohorts
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning-500">⚠</span>
              <span className="text-gray-700 dark:text-gray-300">
                Drift Arena needs attention on D1 retention - consider
                onboarding improvements
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-500">ℹ</span>
              <span className="text-gray-700 dark:text-gray-300">
                Overall portfolio health is strong with 37.1% average D1
                retention
              </span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

