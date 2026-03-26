"use client";

import React, { useState } from "react";
import { useUser } from "@/context/UserContext";
import { fetchDetailedEarnings } from "@/lib/user-data-table";
import { downloadCSV } from "@/lib/csv-utils";

type TabType = "Earnings" | "Remittances";

export default function PaymentsPage() {
    const { clientEmail } = useUser();
    const [activeTab, setActiveTab] = useState<TabType>("Earnings");
    const [expandedMonth, setExpandedMonth] = useState<string | null>(null);

    // Fetch user-specific earnings entries
    const userDetailedEarnings = fetchDetailedEarnings(clientEmail);

    const handleDownloadAll = () => {
        const exportData = userDetailedEarnings.map((item: { month: string; year: string; netEarnings: string; grossTotal: string; status: string }) => ({
            MonthYear: `${item.month} ${item.year}`,
            NetEarnings: item.netEarnings,
            GrossTotal: item.grossTotal,
            Status: item.status
        }));
        downloadCSV(exportData, `payments-${clientEmail || "user"}`);
    };


    const toggleMonth = (monthYear: string) => {
        setExpandedMonth(expandedMonth === monthYear ? null : monthYear);
    };

    return (
        <div className="space-y-6 pb-8 min-h-screen font-sans">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white/90">Payments</h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Track your earnings, monthly invoices, and payment status.
                    </p>
                </div>
                <button
                    onClick={handleDownloadAll}
                    className="flex items-center gap-1.5 rounded bg-orange-500 px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-orange-600 transition-colors"
                >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    <span>Download All Invoices</span>
                </button>
            </div>

            {/* Tabs Navigation */}
            <div className="flex border-b border-gray-100 dark:border-gray-800">
                {(["Earnings", "Remittances"] as TabType[]).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all relative ${activeTab === tab
                            ? "text-blue-700 dark:text-blue-400"
                            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white"
                            }`}
                    >
                        {tab}
                        {activeTab === tab && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-400" />
                        )}
                    </button>
                ))}
            </div>

            {activeTab === "Earnings" && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    {/* Header Row for Earnings List */}
                    <div className="rounded-lg bg-gray-100 dark:bg-gray-800/50 px-6 py-2.5 flex items-center justify-between text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-tight">
                        <div className="w-[40%]">Month & Year</div>
                        <div className="w-[40%] text-right pr-10">Net Earnings</div>
                    </div>

                    <div className="space-y-3">
                        {userDetailedEarnings.map((item: { month: string; year: string; netEarnings: string }) => {
                            const isExpanded = expandedMonth === `${item.month} ${item.year}`;
                            return (
                                <div key={`${item.month}-${item.year}`} className="rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-white/[0.02] shadow-sm overflow-hidden transition-all">
                                    <button
                                        onClick={() => toggleMonth(`${item.month} ${item.year}`)}
                                        className={`w-full px-6 py-6 flex items-center justify-between transition-colors ${isExpanded ? "bg-gray-50/50 dark:bg-white/[0.03]" : "hover:bg-gray-50/50 dark:hover:bg-white/[0.01]"}`}
                                    >
                                        <div className="w-[40%] text-left">
                                            <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.month} {item.year}</span>
                                        </div>
                                        <div className="w-[40%] flex items-center justify-end gap-4">
                                            <span className="text-sm font-bold text-gray-900 dark:text-white">{item.netEarnings}</span>
                                            <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </button>

                                    {isExpanded && (
                                        <div className="px-10 pb-8 pt-2 border-t border-gray-50 dark:border-gray-800/50 animate-in zoom-in-95 duration-200">
                                            <div className="space-y-6">
                                                {/* Revenue From Properties */}
                                                <div>
                                                    <h3 className="text-[11px] font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Revenue from properties</h3>
                                                    <div className="space-y-4">
                                                        {(item as Record<string, any>).properties.map((prop: { name: string; revenue: string }, idx: number) => (
                                                            <div key={idx} className="flex items-center justify-between pb-4 border-b border-gray-50 dark:border-gray-800/50 last:border-0 last:pb-0">
                                                                <div className="flex items-center gap-3">
                                                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{prop.name}</span>
                                                                </div>
                                                                <span className="text-sm font-bold text-green-500">{prop.revenue}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Deductions */}
                                                <div className="space-y-3">
                                                    {(item as Record<string, any>).deductions.map((deduct: { label: string; amount: string }, idx: number) => (
                                                        <div key={idx} className="flex items-center justify-between">
                                                            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-gray-400">
                                                                {deduct.label}
                                                                <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                                                </svg>
                                                            </div>
                                                            <span className="text-sm font-medium text-red-400">{deduct.amount}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Totals */}
                                                <div className="space-y-4 pt-2 border-t border-gray-100 dark:border-gray-800">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[11px] font-bold text-gray-900 dark:text-white uppercase tracking-wider">Gross Total</span>
                                                        <span className="text-sm font-bold text-gray-900 dark:text-white">{(item as Record<string, any>).grossTotal}</span>
                                                    </div>
                                                    {/* Conversion row hidden or simplified */}
                                                    <div className="hidden items-center justify-between pl-6 text-xs font-medium text-gray-500 dark:text-gray-400">
                                                        <span>{(item as Record<string, any>).conversion.label}</span>
                                                        <span>{(item as Record<string, any>).conversion.total}</span>
                                                    </div>
                                                </div>

                                                <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                                                    <span className="text-[11px] font-bold text-gray-900 dark:text-white uppercase tracking-wider">Grand Total</span>
                                                    <span className="text-sm font-extrabold text-[#3e4cb4] dark:text-blue-400">{(item as Record<string, any>).grandTotal}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}



            {activeTab === "Remittances" && (
                <div className="flex flex-col items-center justify-center py-20 rounded-2xl border-2 border-dashed border-gray-100 dark:border-gray-800 bg-gray-50/20 animate-in fade-in duration-300">
                    <div className="h-16 w-16 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-4 text-blue-500">
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Repittance History</h2>
                    <p className="max-w-xs text-center text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                        Track foreign exchange transfers and bank settlements for your international earnings.
                    </p>
                </div>
            )}

            {/* Bottom Help Notice */}
            <div className="flex items-start gap-4 rounded bg-gray-50 border border-gray-100 p-3 dark:bg-white/[0.02] dark:border-gray-800">
                <div className="flex-shrink-0 mt-0.5">
                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                </div>
                <div>
                    <p className="text-[11px] text-gray-600 leading-relaxed dark:text-gray-400">
                        Invoices are generated on the 1st of every month for the previous month&apos;s earnings.
                        Payments are typically processed within 30 days of invoice generation (Net-30).
                        If you notice any discrepancy, please contact our support team immediately.
                    </p>
                    <button className="mt-1 text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider hover:underline">
                        Visit Support Center
                    </button>
                </div>
            </div>
        </div>
    );
}
