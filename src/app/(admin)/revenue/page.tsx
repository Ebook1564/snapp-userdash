"use client";

import React from "react";
import dynamic from "next/dynamic";
import { DASHBOARD_METRICS, TREND_DATA, REVENUE_BY_GAME, REVENUE_BY_GEO, MONETIZATION_FUNNEL } from "@/lib/mock-data";
import { downloadCSV } from "@/lib/csv-utils";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const summaryCards = [
  DASHBOARD_METRICS.mrr,
  DASHBOARD_METRICS.arpdau,
  DASHBOARD_METRICS.payers,
  DASHBOARD_METRICS.churn,
];

const revenueByGame = REVENUE_BY_GAME;
const revenueByGeo = REVENUE_BY_GEO;
const mockTrendData = TREND_DATA;
const funnelData = MONETIZATION_FUNNEL;

export default function RevenuePage() {
  const handleExportCSV = () => {
    downloadCSV(TREND_DATA, `revenue-report-${new Date().toISOString().split('T')[0]}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white/90">
            Revenue
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Monitor revenue performance across games, players, and regions.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <select className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-brand-500">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 90 days</option>
            <option>Year to date</option>
          </select>
          <button
            onClick={handleExportCSV}
            className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-white/5"
          >
            Export CSV
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
              className={`mt-1 text-xs font-medium ${card.deltaType === "up"
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
          <div className="mt-4 min-h-[200px]">
            <ReactApexChart
              options={{
                chart: {
                  type: "area",
                  toolbar: { show: false },
                  fontFamily: "inherit",
                },
                stroke: { curve: "smooth", width: 2 },
                fill: {
                  type: "gradient",
                  gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.45,
                    opacityTo: 0.05,
                    stops: [20, 100],
                  },
                },
                colors: ["#3c50e0", "#80caee"],
                xaxis: {
                  categories: mockTrendData.map((d) => d.month),
                  axisBorder: { show: false },
                  axisTicks: { show: false },
                },
                yaxis: {
                  labels: {
                    formatter: (val: number) => (val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val.toString()),
                  },
                },
                legend: { position: "top", horizontalAlign: "right" },
                grid: { borderColor: "rgba(0,0,0,0.05)" },
              }}
              series={[
                { name: "MRR", data: mockTrendData.map((d) => d.mrr) },
                { name: "DAU", data: mockTrendData.map((d) => d.dau) },
              ]}
              type="area"
              height={220}
            />
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

          <div className="mt-6 space-y-4">
            {funnelData.map((item, idx) => (
              <div key={item.label} className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-gray-500 dark:text-gray-400">{item.label}</span>
                  <span className="font-semibold text-gray-900 dark:text-white/90">
                    {item.value} {item.subValue && `(${item.subValue})`}
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                  <div
                    className="h-1.5 rounded-full bg-brand-500"
                    style={{ width: `${100 - (idx * 25)}%`, opacity: 1 - (idx * 0.2) }}
                  />
                </div>
              </div>
            ))}
          </div>

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
  );
}

