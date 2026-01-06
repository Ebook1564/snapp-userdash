"use client";

import React, { useState } from "react";

type Suggestion = {
  id: string;
  title: string;
  category: "revenue" | "retention" | "monetization" | "ux" | "marketing";
  priority: "high" | "medium" | "low";
  description: string;
  impact: string;
  effort: "low" | "medium" | "high";
  status: "pending" | "in-progress" | "completed" | "dismissed";
};

const suggestions: Suggestion[] = [
  {
    id: "1",
    title: "Implement A/B Testing for Onboarding Flow",
    category: "retention",
    priority: "high",
    description:
      "Test different onboarding flows to improve D1 retention. Current retention is below industry average.",
    impact: "Could increase D1 retention by 5-8%",
    effort: "medium",
    status: "pending",
  },
  {
    id: "2",
    title: "Add Push Notification Campaigns",
    category: "retention",
    priority: "high",
    description:
      "Set up automated push notifications for re-engagement. Target players who haven't played in 3+ days.",
    impact: "Expected to recover 15-20% of churned players",
    effort: "low",
    status: "pending",
  },
  {
    id: "3",
    title: "Optimize IAP Pricing Strategy",
    category: "monetization",
    priority: "high",
    description:
      "Review and adjust in-app purchase pricing based on player behavior data. Current conversion is 3.4%.",
    impact: "Potential 10-15% revenue increase",
    effort: "low",
    status: "in-progress",
  },
  {
    id: "4",
    title: "Create Seasonal Events Calendar",
    category: "marketing",
    priority: "medium",
    description:
      "Plan and schedule seasonal events to boost engagement during key periods (holidays, summer, etc.).",
    impact: "Expected 20-30% DAU increase during events",
    effort: "high",
    status: "pending",
  },
  {
    id: "5",
    title: "Improve Tutorial UX",
    category: "ux",
    priority: "medium",
    description:
      "Redesign tutorial to be more interactive and less intrusive. Current tutorial has high skip rate.",
    impact: "Could improve D1 retention by 3-5%",
    effort: "medium",
    status: "pending",
  },
  {
    id: "6",
    title: "Add Social Sharing Features",
    category: "marketing",
    priority: "low",
    description:
      "Enable players to share achievements and invite friends. Could drive organic growth.",
    impact: "Potential 5-10% organic user acquisition",
    effort: "high",
    status: "pending",
  },
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case "revenue":
      return "bg-success-50 text-success-700 dark:bg-success-500/20 dark:text-success-400";
    case "retention":
      return "bg-brand-50 text-brand-700 dark:bg-brand-500/20 dark:text-brand-400";
    case "monetization":
      return "bg-warning-50 text-warning-700 dark:bg-warning-500/20 dark:text-warning-400";
    case "ux":
      return "bg-blue-light-50 text-blue-light-700 dark:bg-blue-light-500/20 dark:text-blue-light-400";
    case "marketing":
      return "bg-orange-50 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400";
    default:
      return "bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-error-50 text-error-700 dark:bg-error-500/20 dark:text-error-400";
    case "medium":
      return "bg-warning-50 text-warning-700 dark:bg-warning-500/20 dark:text-warning-400";
    case "low":
      return "bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
    default:
      return "bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
  }
};

const getEffortColor = (effort: string) => {
  switch (effort) {
    case "low":
      return "text-success-600 dark:text-success-400";
    case "medium":
      return "text-warning-600 dark:text-warning-400";
    case "high":
      return "text-error-600 dark:text-error-400";
    default:
      return "text-gray-600 dark:text-gray-400";
  }
};

export default function SuggestionsPage() {
  const [filter, setFilter] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredSuggestions = suggestions.filter((suggestion) => {
    if (filter !== "all" && suggestion.status !== filter) return false;
    if (
      selectedCategory !== "all" &&
      suggestion.category !== selectedCategory
    )
      return false;
    return true;
  });

  const stats = {
    pending: suggestions.filter((s) => s.status === "pending").length,
    inProgress: suggestions.filter((s) => s.status === "in-progress").length,
    completed: suggestions.filter((s) => s.status === "completed").length,
    highPriority: suggestions.filter((s) => s.priority === "high").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white/90">
            Suggestions
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            AI-powered recommendations to improve your games' performance and
            revenue.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-white/5">
            Generate New
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-4 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
            Pending
          </p>
          <p className="mt-2 text-xl font-semibold text-gray-900 dark:text-white/90">
            {stats.pending}
          </p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Awaiting review
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white px-4 py-4 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
            In Progress
          </p>
          <p className="mt-2 text-xl font-semibold text-gray-900 dark:text-white/90">
            {stats.inProgress}
          </p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Being implemented
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white px-4 py-4 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
            High Priority
          </p>
          <p className="mt-2 text-xl font-semibold text-gray-900 dark:text-white/90">
            {stats.highPriority}
          </p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Require attention
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white px-4 py-4 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
            Completed
          </p>
          <p className="mt-2 text-xl font-semibold text-gray-900 dark:text-white/90">
            {stats.completed}
          </p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Implemented
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="flex flex-wrap gap-2">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-brand-500"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-brand-500"
        >
          <option value="all">All Categories</option>
          <option value="revenue">Revenue</option>
          <option value="retention">Retention</option>
          <option value="monetization">Monetization</option>
          <option value="ux">UX</option>
          <option value="marketing">Marketing</option>
        </select>
      </section>

      {/* Suggestions List */}
      <section className="space-y-4">
        {filteredSuggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="rounded-xl border border-gray-200 bg-white px-4 py-4 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white/90">
                    {suggestion.title}
                  </h3>
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${getCategoryColor(
                      suggestion.category
                    )}`}
                  >
                    {suggestion.category}
                  </span>
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${getPriorityColor(
                      suggestion.priority
                    )}`}
                  >
                    {suggestion.priority} priority
                  </span>
                </div>

                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                  {suggestion.description}
                </p>

                <div className="flex items-center gap-4 text-xs">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">
                      Impact:{" "}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white/90">
                      {suggestion.impact}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">
                      Effort:{" "}
                    </span>
                    <span
                      className={`font-medium capitalize ${getEffortColor(
                        suggestion.effort
                      )}`}
                    >
                      {suggestion.effort}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button className="rounded-lg border border-brand-500 bg-brand-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-700">
                  Implement
                </button>
                <button className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-white/5">
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {filteredSuggestions.length === 0 && (
        <div className="rounded-xl border border-gray-200 bg-white px-6 py-12 text-center dark:border-gray-800 dark:bg-white/[0.03]">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No suggestions match your current filters.
          </p>
        </div>
      )}
    </div>
  );
}

