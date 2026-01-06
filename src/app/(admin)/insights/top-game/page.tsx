"use client";

import React from "react";

type TopGame = {
  rank: number;
  game: string;
  totalRevenue: number;
  totalPlayers: number;
  avgSessionTime: number; // minutes
  conversionRate: number;
  trend: "up" | "down" | "stable";
};

const topGames: TopGame[] = [
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

export default function BestGamePage() {
  const topGame = topGames[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white/90">
            Best Game
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Discover your top-performing games and understand what makes them
            successful.
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
            View Details
          </button>
        </div>
      </div>

      {/* Top Game Highlight */}
      <section className="rounded-xl border border-gray-200 bg-gradient-to-br from-brand-50 to-brand-100 px-6 py-6 shadow-sm dark:from-brand-500/10 dark:to-brand-500/5 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="rounded-full bg-brand-500 px-3 py-1 text-xs font-bold text-white">
                #1
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

      {/* Rankings Table */}
      <section className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white/90">
              Game Rankings
            </h2>
            <span className="text-[11px] text-gray-500 dark:text-gray-400">
              Ranked by total revenue
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
                  <th className="py-3 pr-4">Avg. Session</th>
                  <th className="py-3 pr-4">Conversion</th>
                  <th className="py-3 pr-4">Trend</th>
                </tr>
              </thead>
              <tbody>
                {topGames.map((game) => (
                  <tr
                    key={game.rank}
                    className={`border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${
                      game.rank === 1
                        ? "bg-brand-50/50 dark:bg-brand-500/5"
                        : ""
                    }`}
                  >
                    <td className="py-3 pr-4">
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                          game.rank === 1
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
                    <td className="py-3 pr-4 text-gray-700 dark:text-gray-300">
                      {game.avgSessionTime}m
                    </td>
                    <td className="py-3 pr-4 text-gray-700 dark:text-gray-300">
                      {game.conversionRate}%
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
      </section>

      {/* Success Factors */}
      <section className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white px-4 py-4 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
          <h2 className="text-sm font-semibold text-gray-900 mb-3 dark:text-white/90">
            What Makes {topGame.game} Successful?
          </h2>
          <ul className="space-y-3 text-xs">
            <li className="flex items-start gap-2">
              <span className="text-success-500 mt-0.5">✓</span>
              <div>
                <p className="font-medium text-gray-900 dark:text-white/90">
                  Strong Retention
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  High D1 retention rate of 42.3% indicates excellent
                  onboarding and first-day experience
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-500 mt-0.5">✓</span>
              <div>
                <p className="font-medium text-gray-900 dark:text-white/90">
                  Optimal Session Length
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Average session time of {topGame.avgSessionTime} minutes
                  keeps players engaged without overwhelming them
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-500 mt-0.5">✓</span>
              <div>
                <p className="font-medium text-gray-900 dark:text-white/90">
                  Balanced Monetization
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Conversion rate of {topGame.conversionRate}% shows effective
                  but non-intrusive monetization strategy
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white px-4 py-4 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
          <h2 className="text-sm font-semibold text-gray-900 mb-3 dark:text-white/90">
            Quick Stats
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Revenue Share
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white/90">
                {(
                  (topGame.totalRevenue /
                    topGames.reduce((sum, g) => sum + g.totalRevenue, 0)) *
                  100
                ).toFixed(1)}
                %
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Player Share
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white/90">
                {(
                  (topGame.totalPlayers /
                    topGames.reduce((sum, g) => sum + g.totalPlayers, 0)) *
                  100
                ).toFixed(1)}
                %
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Growth Trend
              </p>
              <p
                className={`text-lg font-semibold ${getTrendColor(
                  topGame.trend
                )}`}
              >
                {getTrendIcon(topGame.trend)} Trending Up
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

