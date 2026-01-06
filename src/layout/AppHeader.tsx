"use client";

import NotificationDropdown from "@/components/header/NotificationDropdown";
import UserDropdown from "@/components/header/UserDropdown";
import { useSidebar } from "@/context/SidebarContext";
import { BellIcon, ChevronDownIcon } from "@/icons";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const AppHeader: React.FC = () => {
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();
  const inputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSearch = (value: string) => {
    const query = value.trim();
    if (!query) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleToggle = () => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-800/50">
      <div className="mx-auto flex h-14 sm:h-16 items-center justify-between gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 lg:px-6">
        {/* LEFT SECTION: Toggle Button + Logo */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 min-w-0 flex-shrink-0">
          {/* Mobile/Desktop Toggle Button */}
          <button
            onClick={handleToggle}
            className="flex h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            aria-label="Toggle sidebar"
          >
            {isMobileOpen ? (
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

          {/* Logo page */}
          <Link
            href="/"
            className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-shrink-0"
          >
            <Image
              src="/images/Logo/Logo.svg"
              alt="SnappGame Logo"
              width={132}
              height={28}
              className="hidden sm:block h-6 sm:h-7 w-auto"
              priority
            />
            <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white/90 sm:hidden">
              SnappGame
            </span>
          </Link>
        </div>

        {/* CENTER SECTION: Search Bar (Responsive) */}
        <div className="hidden md:flex flex-1 justify-center px-2 lg:px-4 max-w-2xl mx-auto">
          <div className="relative w-full max-w-lg">
            {/* Search Icon */}
            <div className="pointer-events-none absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2">
              <svg
                className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500 dark:text-gray-400"
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

            {/* Search Input */}
            <input
              ref={inputRef}
              type="text"
              placeholder="Search games, campaigns..."
              className="h-9 sm:h-10 w-full rounded-lg border border-gray-300 bg-white pl-9 sm:pl-10 pr-16 sm:pr-20 text-xs sm:text-sm text-gray-700 shadow-sm placeholder:text-gray-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:placeholder:text-gray-400 dark:focus:border-orange-500"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(e.currentTarget.value);
                }
              }}
            />

            {/* Keyboard Shortcut Badge */}
            <span className="pointer-events-none absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-0.5 sm:gap-1 rounded border border-gray-300 bg-gray-100 px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-medium text-gray-600 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-300">
              <kbd className="text-[9px] sm:text-[10px]">⌘</kbd>
              <kbd className="text-[9px] sm:text-[10px]">K</kbd>
            </span>
          </div>
        </div>

        {/* RIGHT SECTION: Actions (Notifications, Live Status, User) */}
        <div className="flex items-center justify-end gap-1 sm:gap-1.5 md:gap-2 lg:gap-3 min-w-0 flex-shrink-0">
          {/* Live Status Button (Desktop Only) */}
          <button
            type="button"
            className="hidden xl:inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-2 sm:px-2.5 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            onClick={() => setApplicationMenuOpen((prev) => !prev)}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success-500 opacity-75"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success-500"></span>
            </span>
            <span className="hidden 2xl:inline">Live</span>
          </button>

          {/* Mobile Search Button (Shows on mobile instead of search bar) */}
          <button
            type="button"
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 md:hidden"
            aria-label="Search"
            onClick={() => {
              setIsMobileSearchOpen((prev) => !prev);
              setTimeout(() => mobileInputRef.current?.focus(), 100);
            }}
          >
            <svg
              className="h-4 w-4 sm:h-5 sm:w-5"
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
          </button>

          {/* Notifications Dropdown */}
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center">
            <NotificationDropdown />
          </div>

          {/* User Dropdown */}
          <div className="flex items-center">
            <UserDropdown />
          </div>
        </div>
      </div>

      {/* Mobile Search Bar (Collapsible) */}
      {isMobileSearchOpen && (
        <div className="md:hidden border-t border-gray-300 bg-gray-50 px-2.5 sm:px-3 py-2 dark:border-gray-700 dark:bg-gray-800 animate-in slide-in-from-top">
          <div className="relative">
            <div className="pointer-events-none absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2">
              <svg
                className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 dark:text-gray-500"
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
              ref={mobileInputRef}
              type="text"
              placeholder="Search games, campaigns..."
              className="h-9 sm:h-10 w-full rounded-lg border border-gray-300 bg-white pl-9 sm:pl-10 pr-4 text-xs sm:text-sm text-gray-700 shadow-sm placeholder:text-gray-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:placeholder:text-gray-400 dark:focus:border-orange-500"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(e.currentTarget.value);
                  setIsMobileSearchOpen(false);
                }
              }}
              onBlur={(e) => {
                // Close search if input loses focus and is empty
                if (!e.target.value) {
                  setTimeout(() => setIsMobileSearchOpen(false), 200);
                }
              }}
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default AppHeader;
