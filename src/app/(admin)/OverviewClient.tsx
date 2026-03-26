"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { REPORT_DATA } from "@/lib/mock-data";

export default function OverviewClient() {
  const { clientName } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const { chartData } = REPORT_DATA;

  // Dynamically calculate metrics from chart data
  const dynamicMetrics = useMemo(() => {
    const scale = 1;
    const latest = chartData[chartData.length - 1];
    const previous = chartData[chartData.length - 2];

    const todayVal = latest.revenue * scale;
    const yesterdayVal = previous.revenue * scale;
    const last7Val = chartData.slice(-7).reduce((acc, curr) => acc + curr.revenue, 0) * scale;
    const monthVal = chartData.filter(d => d.date.includes("Mar")).reduce((acc, curr) => acc + curr.revenue, 0) * scale;
    const last28Val = (chartData.filter(d => d.date.includes("Feb")).reduce((acc, curr) => acc + curr.revenue, 0) + monthVal) * scale;

    return {
      today: { value: `$${todayVal.toFixed(3)}`, note: "Updated 10 minutes ago" },
      yesterday: {
        value: `$${yesterdayVal.toFixed(3)}`,
        change: `${((todayVal - yesterdayVal) / yesterdayVal * 100).toFixed(1)}% vs. last week`,
        isPositive: todayVal > yesterdayVal
      },
      last7Days: { value: `$${last7Val.toFixed(3)}`, change: "+8.4% vs. previous 7 days", isPositive: true },
      thisMonth: { value: `$${monthVal.toFixed(2)}`, change: "+12.4% vs last month" },
      last28Days: { value: `$${last28Val.toFixed(2)}`, change: "+6.8% vs. previous 28 days" }
    };
  }, [chartData]);

  return (
    <div className="space-y-6 pb-10 max-w-[1200px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-[22px] font-bold text-gray-900 dark:text-white/90">Your Properties and Account</h1>
        <div className="relative w-full md:w-[320px]">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 text-sm bg-white dark:bg-gray-900 border border-gray-200 rounded-lg"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-white/[0.02] border border-gray-100 rounded-2xl shadow-sm p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold">{clientName || "Partner"}</h2>
          <Link href="/Dashboard" className="px-5 py-2 text-xs font-bold border rounded-lg">GO TO DASHBOARD</Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
          <div><span className="text-[10px] font-bold text-gray-400">TODAY</span><p className="text-xl font-bold">{dynamicMetrics.today.value}</p></div>
          <div><span className="text-[10px] font-bold text-gray-400">YESTERDAY</span><p className="text-xl font-bold">{dynamicMetrics.yesterday.value}</p></div>
          <div><span className="text-[10px] font-bold text-gray-400">7 DAYS</span><p className="text-xl font-bold">{dynamicMetrics.last7Days.value}</p></div>
          <div><span className="text-[10px] font-bold text-gray-400">THIS MONTH</span><p className="text-xl font-bold">{dynamicMetrics.thisMonth.value}</p></div>
          <div><span className="text-[10px] font-bold text-gray-400">28 DAYS</span><p className="text-xl font-bold">{dynamicMetrics.last28Days.value}</p></div>
        </div>
      </div>
    </div>
  );
}
