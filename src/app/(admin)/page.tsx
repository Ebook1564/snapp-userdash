"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { REPORT_DATA } from "@/lib/mock-data";

export default function PropertiesOverviewPage() {
  const { clientName } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const { chartData } = REPORT_DATA;

  // Dynamically calculate metrics from chart data to match Dashboard logic
  const dynamicMetrics = useMemo(() => {
    const scale = 1; // RAW scale to match graph tooltips exactly ($0.070)

    const latest = chartData[chartData.length - 1];
    const previous = chartData[chartData.length - 2];

    const todayVal = latest.revenue * scale;
    const yesterdayVal = previous.revenue * scale;
    const last7Val = chartData.slice(-7).reduce((acc, curr) => acc + curr.revenue, 0) * scale;
    const monthVal = chartData.filter(d => d.date.includes("Mar")).reduce((acc, curr) => acc + curr.revenue, 0) * scale;
    const last28Val = (chartData.filter(d => d.date.includes("Feb")).reduce((acc, curr) => acc + curr.revenue, 0) + monthVal) * scale;

    return {
      today: {
        value: `$${todayVal.toFixed(3)}`,
        note: "Updated 10 minutes ago"
      },
      yesterday: {
        value: `$${yesterdayVal.toFixed(3)}`,
        change: `${((todayVal - yesterdayVal) / yesterdayVal * 100).toFixed(1)}% vs. same day last week`,
        isPositive: todayVal > yesterdayVal
      },
      last7Days: {
        value: `$${last7Val.toFixed(3)}`,
        change: "+8.4% vs. previous 7 days",
        isPositive: true
      },
      thisMonth: {
        value: `$${monthVal.toFixed(2)}`,
        change: "+12.4% vs last month"
      },
      last28Days: {
        value: `$${last28Val.toFixed(2)}`,
        change: "+6.8% vs. previous 28 days"
      }
    };
  }, [chartData]);


  return (
    <div className="space-y-6 pb-10 max-w-[1200px] mx-auto">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-[22px] font-bold text-gray-900 dark:text-white/90 tracking-tight">
            Your Properties and Account
          </h1>
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
            </svg>
          </button>
        </div>

        <div className="relative w-full md:w-[320px]">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by Property or Account"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Main Account Card */}
      <div className="bg-white dark:bg-white/[0.02] border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-8">
          {/* Top Row: User + CTA */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white/90">
              {clientName || "Partner"}
            </h2>
            <Link
              href="/Dashboard"
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors tracking-wide uppercase"
            >
              GO TO DASHBOARD
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-gray-50 dark:border-gray-800/50">
            {/* Today */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">TODAY SO FAR</span>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{dynamicMetrics.today.value}</p>
              <span className="text-[10px] text-gray-400">{dynamicMetrics.today.note}</span>
            </div>

            {/* Yesterday */}
            <div className="space-y-1 border-l border-gray-50 dark:border-gray-800/50 pl-8">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">YESTERDAY</span>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{dynamicMetrics.yesterday.value}</p>
              <span className={`text-[10px] font-bold ${dynamicMetrics.yesterday.isPositive ? "text-green-500" : "text-gray-400"}`}>
                {dynamicMetrics.yesterday.change}
              </span>
            </div>

            {/* Last 7 Days */}
            <div className="space-y-1 border-l border-gray-50 dark:border-gray-800/50 pl-8">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">LAST 7 DAYS</span>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{dynamicMetrics.last7Days.value}</p>
              <span className={`text-[10px] font-bold ${dynamicMetrics.last7Days.isPositive ? "text-green-500" : "text-gray-400"}`}>
                {dynamicMetrics.last7Days.change}
              </span>
            </div>

            {/* This Month */}
            <div className="space-y-1 border-l border-gray-50 dark:border-gray-800/50 pl-8">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">THIS MONTH</span>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{dynamicMetrics.thisMonth.value}</p>
              <span className="text-[10px] text-green-500 font-bold">{dynamicMetrics.thisMonth.change}</span>
            </div>

            {/* Last 28 Days */}
            <div className="space-y-1 border-l border-gray-50 dark:border-gray-800/50 pl-8">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">LAST 28 DAYS</span>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{dynamicMetrics.last28Days.value}</p>
              <span className="text-[10px] text-green-500 font-bold">{dynamicMetrics.last28Days.change}</span>
            </div>
          </div>



        </div>
      </div>
    </div>
  );
}
