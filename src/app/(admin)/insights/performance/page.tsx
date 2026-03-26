"use client";

import React from "react";

type GamePerformance = {
  game: string;
  dau: number;
  retention: {
    d1: number;
    d7: number;
    d30: number;
  };
  revenue: number;
  rating: number;
  status: "excellent" | "good" | "needs-improvement";
};

const gamePerformance: GamePerformance[] = [
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

export default function GamePerformancePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white/90">
            Game Performance
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Track key metrics and performance indicators across all your games.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <select className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-brand-500">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 90 days</option>
            <option>All time</option>
          </select>
          <button className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-white/5">
            Export Report
          </button>
        </div>
      </div>

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
            $48,300
          </p>
          <p className="mt-1 text-xs font-medium text-success-600 dark:text-success-400">
            +12.4% vs last month
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

      {/* Performance Table */}
      <section className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
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
                  <th className="py-3 pr-4">D1 Retention</th>
                  <th className="py-3 pr-4">D7 Retention</th>
                  <th className="py-3 pr-4">D30 Retention</th>
                  <th className="py-3 pr-4">Revenue</th>
                  <th className="py-3 pr-4">Rating</th>
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
                      {game.retention.d7}%
                    </td>
                    <td className="py-3 pr-4 text-gray-700 dark:text-gray-300">
                      {game.retention.d30}%
                    </td>
                    <td className="py-3 pr-4 text-gray-700 dark:text-gray-300">
                      ${game.revenue.toLocaleString()}
                    </td>
                    <td className="py-3 pr-4 text-gray-700 dark:text-gray-300">
                      <div className="flex items-center gap-1">
                        <span>★</span>
                        <span>{game.rating}</span>
                      </div>
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
      </section>

      {/* Retention Chart Placeholder */}
      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-4 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
          <h2 className="text-sm font-semibold text-gray-900 mb-3 dark:text-white/90">
            Retention Trends
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Track how player retention evolves over time. Focus on improving D1
            retention for better long-term performance.
          </p>
          <div className="mt-4 h-32 flex items-end gap-2">
            {gamePerformance.map((game) => (
              <div key={game.game} className="flex-1 flex flex-col gap-1">
                <div
                  className="w-full rounded-t bg-brand-500/80 dark:bg-brand-500/60"
                  style={{ height: `${game.retention.d1}%` }}
                  title={`${game.game}: ${game.retention.d1}%`}
                />
                <span className="text-[10px] text-gray-500 dark:text-gray-400 text-center">
                  {game.game.split(" ")[0]}
                </span>
              </div>
            ))}
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

