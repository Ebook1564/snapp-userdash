"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { OVERVIEW_DATA, PROPERTIES, REPORT_DATA, REVENUE_BY_GAME } from "@/lib/mock-data";
import { fetchUserMetrics, fetchUserMetricsFromAPI, UserMetricRow } from "@/lib/user-data-table";

interface FinancialMetric {
  value: string;
  note?: string;
  change?: string;
  isPositive?: boolean;
}

interface Property {
  id: string;
  name: string;
  type: string;
  accountName: string;
}

export default function AccountOverview() {
  const router = useRouter();
  const { clientName, clientEmail, isLoading } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [dbMetrics, setDbMetrics] = useState<UserMetricRow | null>(null);

  // Authentication guard
  useEffect(() => {
    if (!isLoading && !clientEmail) {
      router.push("/signin");
    }
  }, [clientEmail, isLoading, router]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [financialMetrics, setFinancialMetrics] = useState<{
    today: FinancialMetric;
    yesterday: FinancialMetric;
    last7Days: FinancialMetric;
    thisMonth: FinancialMetric;
    last28Days: FinancialMetric;
  }>(OVERVIEW_DATA);

  // Calculate financial metrics from centralized mock data with RAW scaling
  const dynamicFinancialMetrics = useMemo(() => {
    // FETCH from real DB (async) or simulated fallback
    const userMetrics = dbMetrics || fetchUserMetrics(clientEmail);
    const { chartData } = REPORT_DATA;

    // Values from the 'database'
    const todayVal = userMetrics.today_revenue;
    const yesterdayVal = userMetrics.yesterday_revenue;
    const last7Val = userMetrics.last_7d_revenue;
    const monthVal = userMetrics.this_month_revenue;
    const last28Val = userMetrics.last_28d_revenue;

    return {
      today: {
        value: `$${todayVal.toFixed(3)}`,
        note: "Updated 10 minutes ago"
      },
      yesterday: {
        value: `$${yesterdayVal.toFixed(3)}`,
        change: `${((todayVal - yesterdayVal) / (yesterdayVal || 1) * 100).toFixed(1)}% vs. same day last week`,
        isPositive: todayVal > yesterdayVal
      },
      last7Days: {
        value: `$${last7Val.toFixed(3)}`,
        change: "+8.4% vs. previous 7 days",
        isPositive: true
      },
      thisMonth: {
        value: `$${monthVal.toFixed(2)}`,
        change: "+12.4% vs last month",
        isPositive: true
      },
      last28Days: {
        value: `$${last28Val.toFixed(2)}`,
        change: "+6.8% vs. previous 28 days",
        isPositive: true
      }
    };
  }, [clientEmail, dbMetrics]);

  // Load metrics from Database API
  useEffect(() => {
    const loadDBMetrics = async () => {
      if (clientEmail) {
        const metrics = await fetchUserMetricsFromAPI(clientEmail);
        setDbMetrics(metrics);
      }
    };
    loadDBMetrics();
  }, [clientEmail]);

  // Simulate data loading - replace with actual API call
  useEffect(() => {
    const loadData = async () => {
      if (isLoading || !clientEmail) return;
      setIsDataLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Mock properties data - updated with realistic names
      setProperties(PROPERTIES.map(p => ({
        ...p,
        accountName: clientName || "Account Name"
      })));

      // We use the memoized dynamicFinancialMetrics instead of static OVERVIEW_DATA
      setFinancialMetrics(dynamicFinancialMetrics);

      setIsDataLoading(false);
    };

    loadData();
  }, [clientName, isLoading, clientEmail, dynamicFinancialMetrics]);

  // Handle logout: clear cookies and redirect
  const { setClientEmail } = useUser();
  const handleLogout = () => {
    setClientEmail(null); // This will clear cookies and redirect due to the guard
  };

  // Filter properties based on search query
  const filteredProperties = useMemo(() => {
    if (!searchQuery.trim()) return properties;
    const query = searchQuery.toLowerCase();
    return properties.filter(
      (prop) =>
        prop.name.toLowerCase().includes(query) ||
        prop.id.toLowerCase().includes(query) ||
        prop.accountName.toLowerCase().includes(query)
    );
  }, [properties, searchQuery]);

  if (isLoading || !clientEmail) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white overflow-hidden flex flex-col">
      {/* Dark Blue Header */}
      <header
        className="w-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 shadow-lg relative overflow-hidden flex-shrink-0"
      >
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex h-20 sm:h-24 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 rounded-lg bg-white/20 flex items-center justify-center border border-white/30 backdrop-blur-sm">
                <span className="text-xl sm:text-2xl font-bold text-white">S</span>
              </div>
              <span className="text-base sm:text-lg md:text-xl font-semibold text-white truncate">
                SnappGame Business
              </span>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="rounded-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base font-medium text-white transition-all hover:bg-white/20 hover:border-white/50 flex-shrink-0"
            >
              <span className="hidden sm:inline">LOG OUT</span>
              <span className="sm:hidden">OUT</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 flex-1 overflow-y-auto">
        {/* Header Section with Search */}
        <div className="mb-3 sm:mb-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4 mb-4">
            <div className="flex items-center gap-2 min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 truncate">
                Your Properties and Account
              </h1>
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            {/* Search Bar */}
            <div className="relative w-full lg:w-auto lg:min-w-[280px] lg:max-w-md">
              <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                <svg
                  className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by Property or Account"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 text-xs sm:text-sm text-gray-700 shadow-sm placeholder:text-gray-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isDataLoading ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-6 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Account Information Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-3 sm:mb-4">
              <div className="p-4 sm:p-5 md:p-6">
                {/* Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 truncate">
                    {clientName || "Account Name"}
                  </h2>
                  <Link
                    href="/Dashboard"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors flex-shrink-0 whitespace-nowrap"
                  >
                    <span className="hidden sm:inline">GO TO DASHBOARD</span>
                    <span className="sm:hidden">DASHBOARD</span>
                    <svg
                      className="h-3 w-3 sm:h-4 sm:w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>

                {/* Financial Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 mb-3 sm:mb-4">
                  {/* Today */}
                  <div className="border-b sm:border-b-0 sm:border-r border-gray-200 pb-2 sm:pb-0 sm:pr-3 md:pr-4 lg:pr-6 last:border-r-0">
                    <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wide text-gray-500 mb-1">
                      Today so far
                    </p>
                    <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-0.5 break-words">
                      {financialMetrics.today.value}
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-500 break-words leading-tight">
                      {financialMetrics.today.note}
                    </p>
                  </div>

                  {/* Yesterday */}
                  <div className="border-b sm:border-b-0 sm:border-r border-gray-200 pb-2 sm:pb-0 sm:pr-3 md:pr-4 lg:pr-6 last:border-r-0">
                    <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wide text-gray-500 mb-1">
                      Yesterday
                    </p>
                    <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-0.5 break-words">
                      {financialMetrics.yesterday.value}
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-500 break-words leading-tight">
                      {financialMetrics.yesterday.change}
                    </p>
                  </div>

                  {/* Last 7 days */}
                  <div className="border-b sm:border-b-0 sm:border-r border-gray-200 pb-2 sm:pb-0 sm:pr-3 md:pr-4 lg:pr-6 last:border-r-0">
                    <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wide text-gray-500 mb-1">
                      Last 7 days
                    </p>
                    <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-0.5 break-words">
                      {financialMetrics.last7Days.value}
                    </p>
                    <p
                      className={`text-[10px] sm:text-xs break-words leading-tight ${financialMetrics.last7Days.isPositive
                        ? "text-success-600"
                        : "text-error-600"
                        }`}
                    >
                      {financialMetrics.last7Days.change}
                    </p>
                  </div>

                  {/* This month */}
                  <div className="border-b sm:border-b-0 sm:border-r border-gray-200 pb-2 sm:pb-0 sm:pr-3 md:pr-4 lg:pr-6 last:border-r-0">
                    <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wide text-gray-500 mb-1">
                      This month
                    </p>
                    <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-0.5 break-words">
                      {financialMetrics.thisMonth.value}
                    </p>
                    <p
                      className={`text-[10px] sm:text-xs break-words leading-tight ${financialMetrics.thisMonth.isPositive
                        ? "text-success-600"
                        : "text-error-600"
                        }`}
                    >
                      {financialMetrics.thisMonth.change}
                    </p>
                  </div>

                  {/* Last 28 Days */}
                  <div className="pb-2 sm:pb-0">
                    <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wide text-gray-500 mb-1">
                      Last 28 Days
                    </p>
                    <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-0.5 break-words">
                      {financialMetrics.last28Days.value}
                    </p>
                    <p
                      className={`text-[10px] sm:text-xs break-words leading-tight ${financialMetrics.last28Days.isPositive
                        ? "text-success-600"
                        : "text-error-600"
                        }`}
                    >
                      {financialMetrics.last28Days.change}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

