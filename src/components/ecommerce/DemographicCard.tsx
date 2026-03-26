"use client";
import React from "react";

export default function DemographicCard() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
        Customers Demographic
      </h3>
      <div className="flex items-center justify-center h-48 mt-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-dashed border-gray-200 dark:border-gray-800">
        <span className="text-xs text-gray-400">Demographics visualization placeholder</span>
      </div>
    </div>
  );
}
