"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

type Creative = {
  id: number;
  title: string;
  image: string;
  tag?: string;
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

const creatives: Creative[] = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  title: `${gameNames[i]} – Game Sticker`,
  image: `/images/creatives/game-${i + 1}.png`,
  tag: i < 3 ? (i === 0 ? "Top Performer" : i === 1 ? "High CTR" : "Trending") : undefined,
}));

export default function CreativesLibraryPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white/90">
            Creatives Library
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Store your best-performing stickers and link them directly to game
            pages.
          </p>
        </div>

        <div className="flex gap-2">
          <button className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-white/5">
            Upload creative
          </button>
          <button className="hidden rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-white/5 sm:inline-flex">
            Manage folders
          </button>
        </div>
      </div>

      {/* Section title */}
      <h2 className="mb-4 text-lg font-bold text-center text-gray-800 dark:text-white/90">
        Game Stickers
      </h2>

      {/* Sticker grid */}
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {creatives.map((creative) => (
          <Link
            key={creative.id}
            href={`/creatives-library/${creative.id}`}
            className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-white/[0.03]"
          >
            {/* Snappgame Label */}
            <div className="absolute left-0 right-0 top-0 z-10 bg-brand-500 px-3 py-1.5 text-center">
              <span className="text-xs font-bold uppercase tracking-wide text-white">
                Snappgame
              </span>
            </div>

            {/* Sticker image */}
            <div className="relative h-40 w-full bg-gray-100 dark:bg-gray-800 pt-8">
              <Image
                src={creative.image}
                alt={creative.title}
                fill
                className="object-cover transition-transform duration-200 group-hover:scale-105"
                onError={(e) => {
                  // Fallback to a placeholder if image doesn't exist
                  const target = e.target as HTMLImageElement;
                  target.src = `data:image/svg+xml,${encodeURIComponent(
                    `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#f3f4f6"/><text x="50%" y="50%" font-family="Arial" font-size="20" fill="#9ca3af" text-anchor="middle" dominant-baseline="middle">${gameNames[creative.id - 1]}</text></svg>`
                  )}`;
                }}
              />
              {creative.tag && (
                <span className="absolute right-3 top-11 rounded-full bg-success-50 px-2 py-0.5 text-[11px] font-medium text-success-700 dark:bg-success-500/20 dark:text-success-400">
                  {creative.tag}
                </span>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-1 flex-col justify-between p-3">
              <div>
                <p className="line-clamp-2 text-sm font-medium text-gray-900 dark:text-white/90">
                  {creative.title}
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Click to view sample picks and manage campaigns.
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
                <span>Game ID: {creative.id}</span>
                <span className="flex items-center gap-1 text-brand-600 group-hover:text-brand-700 dark:text-brand-500">
                  View picks
                  <span aria-hidden>↗</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
