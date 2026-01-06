"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

type SearchItem = {
  id: string;
  type: "game" | "campaign" | "creative";
  name: string;
  description: string;
};

const SEARCH_INDEX: SearchItem[] = [
  {
    id: "game-1",
    type: "game",
    name: "Galaxy Runner",
    description: "Endless runner game with space-themed levels and power-ups.",
  },
  {
    id: "game-2",
    type: "game",
    name: "SnappGame Arena",
    description: "Multiplayer battle arena with real-time events.",
  },
  {
    id: "campaign-1",
    type: "campaign",
    name: "Holiday Boost Campaign",
    description: "High-intent user acquisition campaign for Q4 holidays.",
  },
  {
    id: "campaign-2",
    type: "campaign",
    name: "Retention Re-Engagement",
    description: "Win-back campaign targeting inactive players.",
  },
  {
    id: "creative-1",
    type: "creative",
    name: "Rewarded Video - Extra Lives",
    description: "30s rewarded video promoting extra lives in-game.",
  },
  {
    id: "creative-2",
    type: "creative",
    name: "Interstitial - Level Complete",
    description: "Full-screen interstitial shown after level completion.",
  },
];

const typeLabel: Record<SearchItem["type"], string> = {
  game: "Game",
  campaign: "Campaign",
  creative: "Creative",
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") || "").trim();

  const results = query
    ? SEARCH_INDEX.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
        );
      })
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white/90">
          Search
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Search across your games, campaigns, and creatives.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white px-4 py-5 shadow-sm dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:py-6">
        {query ? (
          <>
            <div className="mb-4 flex items-center justify-between gap-2">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Showing results for{" "}
                <span className="font-semibold text-gray-900 dark:text-white/90">
                  “{query}”
                </span>
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                {results.length} result{results.length === 1 ? "" : "s"}
              </p>
            </div>

            {results.length === 0 ? (
              <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-900/40 dark:text-gray-400">
                No results found. Try a different keyword like{" "}
                <span className="font-medium">“galaxy”</span> or{" "}
                <span className="font-medium">“campaign”</span>.
              </div>
            ) : (
              <ul className="divide-y divide-gray-200 dark:divide-gray-800">
                {results.map((item) => (
                  <li
                    key={item.id}
                    className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:gap-3"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                          {typeLabel[item.type]}
                        </span>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white/90">
                          {item.name}
                        </h3>
                      </div>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-900/40 dark:text-gray-400">
            Start typing in the search bar at the top to find games, campaigns,
            and creatives.
          </div>
        )}
      </div>
    </div>
  );
}


