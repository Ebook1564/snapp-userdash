"use client";

import React, { useState } from "react";

type SuggestionStatus = "NEW" | "DISMISSED";

interface Suggestion {
  id: string;
  title: string;
  description: string;
  revenueBoost: string;
  status: SuggestionStatus;
}

const INITIAL_SUGGESTIONS: Suggestion[] = [
  {
    id: "quizzop",
    title: "Integrate QuizSnapp",
    description: "It may interest you to know that we also have a quizzing platform, Quizzop, which you can integrate.",
    revenueBoost: "Adding Quizzop to your product(s) is likely to increase your monthly revenue from us by 50-75%.",
    status: "NEW"
  },
  {
    id: "feedzop",
    title: "Integrate FeedSnapp",
    description: "It may interest you to know that we also have a news platform, Feedzop, which you can integrate.",
    revenueBoost: "Adding Feedzop to your product(s) is likely to increase your monthly revenue from us by 50-75%.",
    status: "NEW"
  }
];

export default function SuggestionsPage() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>(INITIAL_SUGGESTIONS);
  const [activeTab, setActiveTab] = useState<SuggestionStatus>("NEW");

  const handleDismiss = (id: string) => {
    setSuggestions(prev =>
      prev.map(s => s.id === id ? { ...s, status: "DISMISSED" } : s)
    );
  };

  const handleRestore = (id: string) => {
    setSuggestions(prev =>
      prev.map(s => s.id === id ? { ...s, status: "NEW" } : s)
    );
  };

  const handleInterest = (id: string) => {
    alert(`Thank you for your interest in ${id}! Our team will contact you shortly with integration details.`);
  };

  const filteredSuggestions = suggestions.filter(s => s.status === activeTab);

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Suggestions</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Through Suggestions, we will bring suggestions to you which can be useful in further increasing revenue and engagement.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 dark:border-gray-800">
        {(["NEW", "DISMISSED"] as SuggestionStatus[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-4 text-xs font-bold tracking-widest transition-all relative ${activeTab === tab
              ? "text-blue-700 dark:text-blue-400"
              : "text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-white"
              }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-400" />
            )}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="space-y-6">
        {filteredSuggestions.length > 0 ? (
          filteredSuggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="bg-white dark:bg-white/[0.02] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-8 transition-all hover:shadow-md"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {suggestion.title}
              </h3>
              <div className="space-y-4 mb-10">
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {suggestion.description}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {suggestion.revenueBoost}
                </p>
              </div>

              <div className="flex items-center gap-10">
                {activeTab === "NEW" ? (
                  <>
                    <button
                      onClick={() => handleInterest(suggestion.id)}
                      className="px-6 py-3 bg-[#3e4cb4] text-white text-xs font-bold uppercase tracking-widest rounded-md hover:bg-[#34409a] transition-colors shadow-lg shadow-blue-500/10"
                    >
                      I'M INTERESTED
                    </button>
                    <button
                      onClick={() => handleDismiss(suggestion.id)}
                      className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      DISMISS
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleRestore(suggestion.id)}
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest hover:underline transition-colors"
                  >
                    RESTORE TO NEW
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 dark:bg-white/[0.02] mb-4">
              <svg className="w-8 h-8 text-gray-300 dark:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="text-gray-900 dark:text-white font-bold">No {activeTab.toLowerCase()} suggestions</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
}
