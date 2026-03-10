"use client";

import React, { useState } from "react";
import { SCHEDULED_REPORTS } from "@/lib/mock-data";

interface ReportSchedule {
    id: string;
    name: string;
    type: string;
    frequency: string;
    recipients: string[];
    format: string;
    status: "active" | "paused";
    lastRun: string;
}

export default function ScheduledReportsPage() {
    const [schedules, setSchedules] = useState<ReportSchedule[]>(SCHEDULED_REPORTS as ReportSchedule[]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [newSchedule, setNewSchedule] = useState({
        name: "",
        type: "Revenue Share",
        frequency: "Weekly",
        format: "CSV",
        recipients: ""
    });

    const toggleStatus = (id: string) => {
        setSchedules(prev => prev.map(s =>
            s.id === id ? { ...s, status: s.status === "active" ? "paused" : "active" } : s
        ));
    };

    const deleteSchedule = (id: string) => {
        if (confirm("Are you sure you want to delete this schedule?")) {
            setSchedules(prev => prev.filter(s => s.id !== id));
        }
    };

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        const schedule: ReportSchedule = {
            id: `SCH-00${schedules.length + 1}`,
            name: newSchedule.name,
            type: newSchedule.type,
            frequency: newSchedule.frequency,
            recipients: newSchedule.recipients.split(",").map(r => r.trim()),
            format: newSchedule.format,
            status: "active",
            lastRun: "Never"
        };
        setSchedules([schedule, ...schedules]);
        setIsCreateModalOpen(false);
        setNewSchedule({ name: "", type: "Revenue Share", frequency: "Weekly", format: "CSV", recipients: "" });
    };

    return (
        <div className="space-y-6 pb-8 min-h-screen font-sans">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white/90">Scheduled Reports</h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Automate your data exports and receive reports directly in your inbox.
                    </p>
                </div>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center gap-1.5 rounded bg-[#3e4cb4] px-4 py-1.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:bg-[#34409a] transition-all"
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    <span>Create Schedule</span>
                </button>
            </div>

            {schedules.length > 0 ? (
                <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden dark:border-gray-800 dark:bg-white/[0.02]">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-xs">
                            <thead>
                                <tr className="bg-gray-50/50 dark:bg-white/[0.02] text-left">
                                    <th className="py-3 px-4 font-bold text-gray-600 dark:text-gray-400">Report Name</th>
                                    <th className="py-3 px-4 font-bold text-gray-600 dark:text-gray-400">Frequency</th>
                                    <th className="py-3 px-4 font-bold text-gray-600 dark:text-gray-400">Recipients</th>
                                    <th className="py-3 px-4 font-bold text-gray-600 dark:text-gray-400">Last Run</th>
                                    <th className="py-3 px-4 font-bold text-gray-600 dark:text-gray-400">Status</th>
                                    <th className="py-3 px-4 font-bold text-gray-600 dark:text-gray-400 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {schedules.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors">
                                        <td className="py-3 px-4">
                                            <div className="font-bold text-gray-900 dark:text-white">{item.name}</div>
                                            <div className="text-[10px] text-gray-500">{item.type} • {item.format}</div>
                                        </td>
                                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300 font-medium">{item.frequency}</td>
                                        <td className="py-3 px-4 text-gray-500">{item.recipients.join(", ")}</td>
                                        <td className="py-3 px-4 text-gray-500 italic">{item.lastRun}</td>
                                        <td className="py-3 px-4">
                                            <button
                                                onClick={() => toggleStatus(item.id)}
                                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.status === 'active'
                                                        ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400'
                                                        : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                                                    }`}
                                            >
                                                {item.status}
                                            </button>
                                        </td>
                                        <td className="py-3 px-4 text-right">
                                            <button
                                                onClick={() => deleteSchedule(item.id)}
                                                className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 rounded-2xl border-2 border-dashed border-gray-100 dark:border-gray-800 bg-gray-50/20">
                    <div className="h-16 w-16 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">No active schedules found</h2>
                    <p className="max-w-xs text-center text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                        Set up daily, weekly, or monthly report intervals. We'll handle the processing and delivery.
                    </p>
                </div>
            )}

            {/* Create Schedule Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md shadow-2xl border border-gray-200 dark:border-gray-800">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">New Report Schedule</h3>
                                <button onClick={() => setIsCreateModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </div>
                            <form onSubmit={handleCreate} className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Report Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={newSchedule.name}
                                        onChange={e => setNewSchedule({ ...newSchedule, name: e.target.value })}
                                        placeholder="e.g. Weekly Payout Summary"
                                        className="w-full text-sm rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Report Type</label>
                                        <select
                                            value={newSchedule.type}
                                            onChange={e => setNewSchedule({ ...newSchedule, type: e.target.value })}
                                            className="w-full text-sm rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2.5"
                                        >
                                            <option>Revenue Share</option>
                                            <option>User Metrics</option>
                                            <option>Game Performance</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Frequency</label>
                                        <select
                                            value={newSchedule.frequency}
                                            onChange={e => setNewSchedule({ ...newSchedule, frequency: e.target.value })}
                                            className="w-full text-sm rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2.5"
                                        >
                                            <option>Daily</option>
                                            <option>Weekly</option>
                                            <option>Monthly</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Recipients (comma separated)</label>
                                    <input
                                        required
                                        type="text"
                                        value={newSchedule.recipients}
                                        onChange={e => setNewSchedule({ ...newSchedule, recipients: e.target.value })}
                                        placeholder="email@example.com, user@work.com"
                                        className="w-full text-sm rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2.5"
                                    />
                                </div>
                                <div className="pt-4 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsCreateModalOpen(false)}
                                        className="flex-1 px-4 py-2.5 text-xs font-bold text-gray-500 bg-gray-50 dark:bg-gray-800 dark:text-gray-400 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-2.5 text-xs font-bold text-white bg-[#3e4cb4] rounded-lg shadow-lg shadow-blue-500/20 hover:bg-[#34409a] transition-all"
                                    >
                                        Create Schedule
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
