"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter, usePathname } from "next/navigation";
import React, { useState, useMemo } from "react";
import { ChevronDownIcon } from "@/icons";

type SamplePick = {
  id: string;
  title: string;
  image: string;
  category: string;
  performance: "high" | "medium" | "low";
  date: string;
};

const gameNames = [
  "Galaxy Runner",
  "Nova Slots",
  "Puzzle Forge",
  "Drift Arena",
  "Magic Quest",
  "Space Battle",
  "Racing Legends",
  "Puzzle Master",
  "Adventure Time",
  "Crypto Miner",
  "Battle Royale",
  "Card Collector",
  "Dragon Slayer",
  "Treasure Hunt",
  "Mystery Box",
];

const categories = ["All", "Hero", "Action", "Banner", "Icon", "Promo"];

// Generate sample picks for a game
const generateSamplePicks = (gameId: number): SamplePick[] => {
  const gameName = gameNames[gameId - 1] || `Game ${gameId}`;
  const picks: SamplePick[] = [];
  const pickCategories = ["Hero", "Action", "Banner", "Icon", "Promo"];
  const performances: ("high" | "medium" | "low")[] = ["high", "medium", "low"];

  for (let i = 1; i <= 12; i++) {
    picks.push({
      id: `${gameId}-${i}`,
      title: `${gameName} - Creative ${i}`,
      image: `/images/creatives/game-${gameId}-pick-${i}.png`,
      category: pickCategories[Math.floor(Math.random() * pickCategories.length)],
      performance: performances[Math.floor(Math.random() * performances.length)],
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    });
  }

  return picks;
};

const getPerformanceColor = (performance: string) => {
  switch (performance) {
    case "high":
      return "bg-success-50 text-success-700 dark:bg-success-500/20 dark:text-success-400";
    case "medium":
      return "bg-warning-50 text-warning-700 dark:bg-warning-500/20 dark:text-warning-400";
    case "low":
      return "bg-error-50 text-error-700 dark:bg-error-500/20 dark:text-error-400";
    default:
      return "bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
  }
};

export default function GameDetailPage() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  
  // Safely get the ID from params
  const idParam = params?.id;
  const gameId = idParam ? parseInt(Array.isArray(idParam) ? idParam[0] : idParam, 10) : 0;
  const gameName = gameNames[gameId - 1] || `Game ${gameId}`;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPerformance, setSelectedPerformance] = useState("All");

  const allPicks = useMemo(() => {
    if (gameId > 0 && gameId <= 15) {
      return generateSamplePicks(gameId);
    }
    return [];
  }, [gameId]);

  const filteredPicks = useMemo(() => {
    return allPicks.filter((pick) => {
      const matchesSearch =
        searchQuery === "" ||
        pick.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || pick.category === selectedCategory;
      const matchesPerformance =
        selectedPerformance === "All" || pick.performance === selectedPerformance;

      return matchesSearch && matchesCategory && matchesPerformance;
    });
  }, [allPicks, searchQuery, selectedCategory, selectedPerformance]);

  // Show error if invalid game ID
  if (!gameId || isNaN(gameId) || gameId < 1 || gameId > 15) {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-error-200 bg-error-50 px-6 py-6 text-center dark:border-error-500/30 dark:bg-error-500/10">
          <h2 className="text-lg font-semibold text-error-800 dark:text-error-400">
            Game Not Found
          </h2>
          <p className="mt-2 text-sm text-error-600 dark:text-error-500">
            The game with ID {idParam || "unknown"} does not exist. Please select a game from 1 to 15.
          </p>
          <Link
            href="/creatives-library"
            className="mt-4 inline-block rounded-lg bg-error-500 px-4 py-2 text-sm font-medium text-white hover:bg-error-600 dark:bg-error-600 dark:hover:bg-error-700"
          >
            Back to Creatives Library
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-white/5"
        >
          ← Back
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white/90">
            {gameName} - Sample Picks
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            View and manage all creative assets for this game. Game ID: {gameId} | URL: {pathname}
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="rounded-xl border border-gray-200 bg-white px-4 py-4 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search picks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:placeholder:text-gray-500 dark:focus:border-brand-500"
            />
          </div>

          {/* Category Filter */}
          <div className="relative sm:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-11 w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2.5 pr-10 text-sm text-gray-700 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-brand-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
          </div>

          {/* Performance Filter */}
          <div className="relative sm:w-48">
            <select
              value={selectedPerformance}
              onChange={(e) => setSelectedPerformance(e.target.value)}
              className="h-11 w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2.5 pr-10 text-sm text-gray-700 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-brand-500"
            >
              <option value="All">All Performance</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
          Showing {filteredPicks.length} of {allPicks.length} picks
        </div>
      </div>

      {/* Sample Picks Grid */}
      {filteredPicks.length > 0 ? (
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPicks.map((pick) => (
            <div
              key={pick.id}
              className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-white/[0.03]"
            >
              {/* Snappgame Label */}
              <div className="absolute left-0 right-0 top-0 z-10 bg-brand-500 px-3 py-1.5 text-center">
                <span className="text-xs font-bold uppercase tracking-wide text-white">
                  SnappGame
                </span>
              </div>

              {/* Pick Image */}
              <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-800 pt-8">
                <Image
                  src={pick.image}
                  alt={pick.title}
                  fill
                  className="object-cover transition-transform duration-200 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `data:image/svg+xml,${encodeURIComponent(
                      `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#f3f4f6"/><text x="50%" y="50%" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle" dominant-baseline="middle">${pick.title}</text></svg>`
                    )}`;
                  }}
                />
                <span
                  className={`absolute right-3 top-11 rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${getPerformanceColor(
                    pick.performance
                  )}`}
                >
                  {pick.performance}
                </span>
              </div>

              {/* Pick Info */}
              <div className="flex flex-1 flex-col justify-between p-3">
                <div>
                  <p className="line-clamp-2 text-sm font-medium text-gray-900 dark:text-white/90">
                    {pick.title}
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="rounded bg-gray-100 px-2 py-0.5 dark:bg-gray-800">
                      {pick.category}
                    </span>
                    <span>{pick.date}</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <button className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-white/5">
                    View Details
                  </button>
                  <button className="rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-brand-600">
                    Use This
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white px-6 py-12 text-center dark:border-gray-800 dark:bg-white/[0.03]">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No picks found matching your filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
              setSelectedPerformance("All");
            }}
            className="mt-4 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

