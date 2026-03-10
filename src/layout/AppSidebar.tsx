"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import { useUser } from "../context/UserContext";
import {
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  DollarLineIcon,
  FolderIcon,
  DocsIcon,
  ChatIcon,
  PieChartIcon,
  PlugInIcon,
  UserCircleIcon,
} from "../icons/index";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string }[];
};

/* =======================
   MAIN NAV
   ======================= */
const navItems: NavItem[] = [
  {
    icon: <PieChartIcon className="w-5 h-5 flex-shrink-0" />,
    name: "Revenue Metrics",
    subItems: [
      { name: "Reports", path: "/" },
      { name: "Payments", path: "/payments" },
      { name: "Scheduled Reports", path: "/scheduled-reports" },
    ],
  },
  // {
  //   name: "Insights",
  //   icon: <GridIcon className="w-5 h-5 flex-shrink-0" />,
  //   path: "/insights",
  // },
  {
    icon: <FolderIcon className="w-5 h-5 flex-shrink-0" />,
    name: "Creatives Library",
    path: "/creatives-library",
  },
  {
    icon: <DocsIcon className="w-5 h-5 flex-shrink-0" />,
    name: "Developer Doc",
    path: "/developer-doc",
  },
  {
    icon: <ChatIcon className="w-5 h-5 flex-shrink-0" />,
    name: "Suggestions",
    path: "/suggestions",
  },
  {
    icon: <UserCircleIcon className="w-5 h-5 flex-shrink-0" />,
    name: "Account Info",
    path: "/account-info",
  },
];

/* =======================
   SUPPORT
   ======================= */

const othersItems: NavItem[] = [
  {
    name: "Support Center",
    icon: <ChatIcon className="w-5 h-5 flex-shrink-0" />,
    path: "/support",
  },
  {
    name: "Documentation",
    icon: <DocsIcon className="w-5 h-5 flex-shrink-0" />,
    path: "/documentation",
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const { clientName } = useUser();
  const pathname = usePathname();

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);

  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback(
    (path: string) => {
      if (path === "/") {
        return pathname === "/";
      }
      return pathname === path || pathname.startsWith(path + "/");
    },
    [pathname]
  );

  // Auto‑open submenu when a sub route is active
  useEffect(() => {
    let matched = false;
    ["main", "others"].forEach((menuType) => {
      const list = menuType === "main" ? navItems : othersItems;
      list.forEach((nav, index) => {
        nav.subItems?.forEach((sub) => {
          if (isActive(sub.path)) {
            setOpenSubmenu({ type: menuType as any, index });
            matched = true;
          }
        });
      });
    });
    if (!matched) setOpenSubmenu(null);
  }, [pathname, isActive]);

  // Measure submenu heights for smooth animation
  useEffect(() => {
    if (openSubmenu) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prev) =>
      prev && prev.type === menuType && prev.index === index
        ? null
        : { type: menuType, index }
    );
  };

  const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => {
    const isCollapsed = !isExpanded && !isHovered && !isMobileOpen;

    return (
      <ul className="flex flex-col gap-1.5">
        {items.map((nav, index) => {
          const isDropdown = !!nav.subItems;
          const isItemActive = isDropdown
            ? (openSubmenu?.type === menuType && openSubmenu?.index === index) ||
            nav.subItems?.some((sub) => isActive(sub.path))
            : isActive(nav.path || "");

          const baseClasses = `relative flex items-center w-full h-10 px-3 font-medium rounded-lg transition-all duration-200 cursor-pointer ${isItemActive
            ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
            : "text-blue-200 hover:bg-blue-800/30 hover:text-white"
            } ${isCollapsed
              ? "lg:justify-center lg:px-2.5"
              : "lg:justify-start gap-2"
            }`;

          const iconClasses = "flex items-center justify-center flex-shrink-0 w-5 h-5 min-w-[20px] min-h-[20px] text-current [&>svg]:w-full [&>svg]:h-full [&>svg]:text-current";

          return (
            <li key={nav.name} className="w-full">
              {isDropdown ? (
                // Parent item with dropdown
                <button
                  type="button"
                  onClick={() => handleSubmenuToggle(index, menuType)}
                  className={baseClasses}
                >
                  <span className={iconClasses}>{nav.icon}</span>
                  {!isCollapsed && (
                    <>
                      <span className="text-sm font-medium truncate min-w-0 leading-normal group-hover:pl-0 transition-all">
                        {nav.name}
                      </span>
                      <ChevronDownIcon
                        className={`ml-1.5 h-3.5 w-3.5 transition-all duration-200 flex-shrink-0 text-current ${(openSubmenu?.type === menuType && openSubmenu?.index === index) ||
                          nav.subItems?.some((sub) => isActive(sub.path))
                          ? "rotate-180"
                          : ""
                          }`}
                      />
                    </>
                  )}
                </button>
              ) : (
                // Simple link item
                nav.path && (
                  <Link href={nav.path} className={baseClasses}>
                    <span className={iconClasses}>{nav.icon}</span>
                    {!isCollapsed && (
                      <span className="text-sm font-medium truncate min-w-0 leading-normal">
                        {nav.name}
                      </span>
                    )}
                  </Link>
                )
              )}

              {/* Dropdown submenu */}
              {nav.subItems && !isCollapsed && (
                <div
                  ref={(el) => {
                    subMenuRefs.current[`${menuType}-${index}`] = el;
                  }}
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    height:
                      openSubmenu?.type === menuType && openSubmenu?.index === index
                        ? `${subMenuHeight[`${menuType}-${index}`] || 0}px`
                        : "0px",
                  }}
                >
                  <ul className="mt-1.5 space-y-1 pl-11">
                    {nav.subItems.map((sub) => (
                      <li key={sub.name} className="w-full">
                        <Link
                          href={sub.path}
                          className={`flex items-center w-full h-9 gap-2.5 rounded-lg px-3 text-sm font-medium transition-all duration-200 cursor-pointer ${isActive(sub.path)
                            ? "bg-orange-500/80 text-white shadow-sm"
                            : "text-blue-200/80 hover:bg-blue-800/20 hover:text-white"
                            }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50 flex-shrink-0"></span>
                          <span className="flex-1 truncate min-w-0 leading-normal">{sub.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <aside
      className={`fixed top-0 left-0 mt-14 sm:mt-16 lg:mt-0 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] lg:h-screen border-r border-blue-900/20 bg-gradient-to-b from-blue-950 to-blue-900 px-3 sm:px-3 md:px-4 pt-3 sm:pt-4 md:pt-5 text-white shadow-lg transition-all duration-300 ease-in-out z-50
        ${isExpanded || isMobileOpen
          ? "w-[260px] sm:w-[280px] md:w-[290px]"
          : isHovered
            ? "w-[260px] sm:w-[280px] md:w-[290px]"
            : "w-[70px] sm:w-[80px] md:w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* BRAND & USER SECTION */}
      <div className="space-y-3 sm:space-y-4">
        <div className={`${!isExpanded && !isHovered && !isMobileOpen ? "flex items-center justify-center" : ""}`}>
          {(isExpanded || isHovered || isMobileOpen) ? (
            <div className="pb-2 border-b border-blue-800/50">
              <h2 className="text-base sm:text-lg font-bold text-white truncate">
                {clientName}
              </h2>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <div className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-lg bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                <span className="text-base sm:text-lg font-bold text-white uppercase">{clientName.charAt(0)}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="mt-5 sm:mt-6 md:mt-7 overflow-y-auto pb-4 sm:pb-5 md:pb-6 no-scrollbar">
        {renderMenuItems(navItems, "main")}

        <div className="mt-7 sm:mt-8 md:mt-9 mb-3 sm:mb-3.5 md:mb-4">
          <h2 className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-blue-300/60 px-3">
            {isExpanded || isHovered || isMobileOpen ? (
              "Support"
            ) : (
              <div className="flex items-center justify-center">
                <HorizontaLDots />
              </div>
            )}
          </h2>
        </div>
        {renderMenuItems(othersItems, "others")}
      </nav>
    </aside>
  );
};

export default AppSidebar;
