"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

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
  const { clientName } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [properties, setProperties] = useState<Property[]>([]);
  const [financialMetrics, setFinancialMetrics] = useState<{
    today: FinancialMetric;
    yesterday: FinancialMetric;
    last7Days: FinancialMetric;
    thisMonth: FinancialMetric;
    last28Days: FinancialMetric;
  }>({
    today: { value: "--", note: "This maybe up to 3 hours behind actual data" },
    yesterday: { value: "--", change: "No change vs. same day last week" },
    last7Days: { value: "--", change: "$0 (100%) vs. previous 7 days", isPositive: false },
    thisMonth: { value: "$0.002", change: "$0.002 vs. same period last year", isPositive: true },
    last28Days: { value: "$0.002", change: "$0.002 (48.20%) vs. previous 28 days", isPositive: false },
  });

  // Simulate data loading - replace with actual API call
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Mock properties data - replace with API call
      setProperties([
        {
          id: "1",
          name: "SnappGame",
          type: "SnappGame Property",
          accountName: clientName || "Account Name",
        },
      ]);

      // Calculate financial metrics from dashboard data
      // In a real app, this would come from an API
      // Using dashboard summary data structure
      const mrrValue = "$48,300"; // From dashboard summaryCards
      const arpdaUValue = "$0.43"; // From dashboard summaryCards
      
      setFinancialMetrics({
        today: { value: "--", note: "This maybe up to 3 hours behind actual data" },
        yesterday: { value: "--", change: "No change vs. same day last week" },
        last7Days: { value: "--", change: "$0 (100%) vs. previous 7 days", isPositive: false },
        thisMonth: { value: mrrValue, change: "+12.4% vs last month", isPositive: true },
        last28Days: { value: arpdaUValue, change: "+7.1% vs last week", isPositive: true },
      });

      setIsLoading(false);
    };

    loadData();
  }, [clientName]);

  const handleLogout = () => {
    router.push("/signin");
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
              <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white/90 truncate">
                Your Properties and Account
              </h1>
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 dark:text-gray-500 flex-shrink-0"
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
                className="w-full rounded-lg border border-gray-300 bg-white pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 text-xs sm:text-sm text-gray-700 shadow-sm placeholder:text-gray-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm dark:border-gray-800 dark:bg-white/[0.03] p-6 sm:p-8">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Account Information Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm dark:border-gray-800 dark:bg-white/[0.03] mb-3 sm:mb-4">
              <div className="p-4 sm:p-5 md:p-6">
                {/* Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white/90 truncate">
                    {clientName || "Account Name"}
                  </h2>
                  <Link
                    href="/Dashboard"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 flex-shrink-0 whitespace-nowrap"
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
                  <div className="border-b sm:border-b-0 sm:border-r border-gray-200 dark:border-gray-800 pb-2 sm:pb-0 sm:pr-3 md:pr-4 lg:pr-6 last:border-r-0">
                    <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">
                      Today so far
                    </p>
                    <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white/90 mb-0.5 break-words">
                      {financialMetrics.today.value}
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 break-words leading-tight">
                      {financialMetrics.today.note}
                    </p>
                  </div>

                  {/* Yesterday */}
                  <div className="border-b sm:border-b-0 sm:border-r border-gray-200 dark:border-gray-800 pb-2 sm:pb-0 sm:pr-3 md:pr-4 lg:pr-6 last:border-r-0">
                    <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">
                      Yesterday
                    </p>
                    <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white/90 mb-0.5 break-words">
                      {financialMetrics.yesterday.value}
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 break-words leading-tight">
                      {financialMetrics.yesterday.change}
                    </p>
                  </div>

                  {/* Last 7 days */}
                  <div className="border-b sm:border-b-0 sm:border-r border-gray-200 dark:border-gray-800 pb-2 sm:pb-0 sm:pr-3 md:pr-4 lg:pr-6 last:border-r-0">
                    <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">
                      Last 7 days
                    </p>
                    <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white/90 mb-0.5 break-words">
                      {financialMetrics.last7Days.value}
                    </p>
                    <p
                      className={`text-[10px] sm:text-xs break-words leading-tight ${
                        financialMetrics.last7Days.isPositive
                          ? "text-success-600 dark:text-success-400"
                          : "text-error-600 dark:text-error-400"
                      }`}
                    >
                      {financialMetrics.last7Days.change}
                    </p>
                  </div>

                  {/* This month */}
                  <div className="border-b sm:border-b-0 sm:border-r border-gray-200 dark:border-gray-800 pb-2 sm:pb-0 sm:pr-3 md:pr-4 lg:pr-6 last:border-r-0">
                    <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">
                      This month
                    </p>
                    <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white/90 mb-0.5 break-words">
                      {financialMetrics.thisMonth.value}
                    </p>
                    <p
                      className={`text-[10px] sm:text-xs break-words leading-tight ${
                        financialMetrics.thisMonth.isPositive
                          ? "text-success-600 dark:text-success-400"
                          : "text-error-600 dark:text-error-400"
                      }`}
                    >
                      {financialMetrics.thisMonth.change}
                    </p>
                  </div>

                  {/* Last 28 Days */}
                  <div className="pb-2 sm:pb-0">
                    <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">
                      Last 28 Days
                    </p>
                    <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white/90 mb-0.5 break-words">
                      {financialMetrics.last28Days.value}
                    </p>
                    <p
                      className={`text-[10px] sm:text-xs break-words leading-tight ${
                        financialMetrics.last28Days.isPositive
                          ? "text-success-600 dark:text-success-400"
                          : "text-error-600 dark:text-error-400"
                      }`}
                    >
                      {financialMetrics.last28Days.change}
                    </p>
                  </div>
                </div>

                {/* Properties Section */}
                <div className="pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-800">
                  <p className="text-xs sm:text-sm font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2 sm:mb-3">
                    PROPERTIES · YOU HAVE {filteredProperties.length} {filteredProperties.length === 1 ? "PROPERTY" : "PROPERTIES"}
                  </p>
                  {filteredProperties.length > 0 ? (
                    <div className="space-y-2">
                      {filteredProperties.map((property) => (
                        <div key={property.id} className="flex items-start gap-3">
                          <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center border border-blue-200 dark:border-blue-800">
                            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                              {property.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white/90 truncate">
                              {property.name}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 break-words">
                              You have 1 {property.type} ({property.accountName}).
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-3">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        No properties found matching your search.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

