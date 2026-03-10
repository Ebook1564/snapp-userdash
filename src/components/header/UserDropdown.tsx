"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { useSidebar } from "@/context/SidebarContext";
import { useUser } from "@/context/UserContext";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { isExpanded, isMobileOpen, isHovered } = useSidebar();
  const { clientName, clientEmail, setClientEmail } = useUser(); // Include email and setter

  const toggleDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  // Show login if no clientName (not logged in)
  if (!clientName) {
    return (
      <Link
        href="/signin"
        className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
      >
        Sign in
      </Link>
    );
  }

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-2.5 py-1.5 text-gray-700 shadow-sm hover:bg-gray-50 transition-all duration-200 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
        title={clientEmail ? `${clientName} (${clientEmail})` : clientName}
      >
        <span className="hidden sm:block text-sm font-medium truncate max-w-[120px]">
          {clientName}
        </span>
        <svg
          className={`h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 flex-shrink-0 ${isOpen ? "rotate-180" : ""
            }`}
          viewBox="0 0 18 20"
          fill="none"
        >
          <path
            d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-2 w-64 flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-xl dark:border-gray-800 dark:bg-gray-900 z-50"
      >
        {/* User Header */}
        <div className="flex items-center gap-3 mb-4 p-2 -m-2 rounded-xl bg-gray-50 dark:bg-gray-800">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-semibold text-white">
              {clientName[0]?.toUpperCase()}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
              {clientName}
            </p>
            <p className="truncate text-xs text-gray-500 dark:text-gray-400">
              {clientEmail ?? "Logged in user"}
            </p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-1">
          <DropdownItem
            onItemClick={closeDropdown}
            tag="a"
            href="/profile"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 transition-colors"
          >
            <svg className="h-5 w-5 text-gray-500 dark:text-gray-400" viewBox="0 0 24 24" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 14.1526 4.3002 16.1184 5.61936 17.616C6.17279 15.3096 8.24852 13.5955 10.7246 13.5955H13.2746C15.7509 13.5955 17.8268 15.31 18.38 17.6167C19.6996 16.119 20.5 14.153 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5Z"
                fill="currentColor"
              />
            </svg>
            Edit Profile
          </DropdownItem>

          <DropdownItem
            onItemClick={closeDropdown}
            tag="a"
            href="/account-info"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 transition-colors"
          >
            <svg className="h-5 w-5 text-gray-500 dark:text-gray-400" viewBox="0 0 24 24" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 7C13.1 7 14 7.9 14 9C14 10.1 13.1 11 12 11C10.9 11 10 10.1 10 9C10 7.9 10.9 7 12 7ZM12 17C9.67 17 7.69 15.85 6.5 14.01C6.51 12.34 9.33 11.5 12 11.5C14.67 11.5 17.49 12.34 17.5 14.01C16.31 15.85 14.33 17 12 17Z"
                fill="currentColor"
              />
            </svg>
            Account Info
          </DropdownItem>
        </div>

        {/* Divider */}
        <div className="my-2 h-px bg-gray-200 dark:bg-gray-700" />

        {/* Sign Out */}
        <Link
          href="/signin"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
          onClick={() => {
            setClientEmail(null);
            closeDropdown();
          }}
        >
          <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.1 19.247C14.686 19.247 14.35 18.911 14.35 18.497V14.245H12.85V18.497C12.85 19.739 13.858 20.747 15.1 20.747H18.5C19.743 20.747 20.75 19.739 20.75 18.497V5.496C20.75 4.253 19.743 3.246 18.5 3.246H15.1C13.858 3.246 12.85 4.253 12.85 5.496V9.745H14.35V5.496C14.35 5.081 14.686 4.746 15.1 4.746H18.5C18.915 4.746 19.25 5.082 19.25 5.496V18.497C19.25 18.911 18.915 19.247 18.5 19.247H15.1ZM3.251 11.998C3.251 12.214 3.342 12.409 3.488 12.546L8.095 17.156C8.388 17.449 8.863 17.449 9.156 17.156C9.449 16.863 9.449 16.388 9.156 16.095L5.811 12.748H16.001C16.415 12.748 16.751 12.413 16.751 11.998C16.751 11.584 16.415 11.248 16.001 11.248H5.815L9.156 7.906C9.449 7.613 9.449 7.138 9.156 6.845C8.863 6.552 8.388 6.552 8.095 6.845L3.523 11.42C3.357 11.558 3.251 11.766 3.251 11.998Z"
              fill="currentColor"
            />
          </svg>
          Sign Out
        </Link>
      </Dropdown>
    </div>
  );
}
