"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { MAIN_NAV_ITEMS } from "./NavItems";
import { useAuth } from "@/context/AuthContext";
import { useDashboardAnalytics } from "@/hooks/api/useDashboard";

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse?: () => void;
}

export function Sidebar({ isCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const { data: analytics } = useDashboardAnalytics();

  const getBadge = (href: string) => {
    if (href === "/doctors") {
      return analytics?.summary?.totalDoctors !== undefined
        ? String(analytics.summary.totalDoctors)
        : undefined;
    }
    if (href === "/patients") {
      return analytics?.summary?.totalPatients !== undefined
        ? String(analytics.summary.totalPatients)
        : undefined;
    }
    return undefined;
  };

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-30 hidden md:flex flex-col border-r border-slate-200/90 bg-white transition-all duration-300 ease-in-out select-none",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center px-4 border-b border-slate-100 shrink-0">
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center gap-3 overflow-hidden transition-all duration-200",
            isCollapsed && "justify-center w-full"
          )}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 text-white shadow-md shadow-teal-500/20">
            <Activity className="h-5 w-5" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-slate-900 tracking-tight text-base truncate">
                Doctor Tracker
              </span>
              <span className="text-xs text-slate-400 font-medium truncate">
                Admin Management Portal
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        {!isCollapsed && (
          <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Management
          </p>
        )}
        <nav className="space-y-1.5">
          {MAIN_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard" || pathname === "/"
                : pathname.startsWith(item.href);

            const badge = getBadge(item.href);

            return (
              <Link
                key={item.title}
                href={item.href}
                title={isCollapsed ? item.title : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 group",
                  isActive
                    ? "bg-teal-50 text-teal-700 font-semibold shadow-xs"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                  isCollapsed && "justify-center px-2"
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 shrink-0 transition-colors",
                    isActive
                      ? "text-teal-600"
                      : "text-slate-400 group-hover:text-slate-600"
                  )}
                />
                {!isCollapsed && (
                  <span className="truncate flex-1">{item.title}</span>
                )}
                {!isCollapsed && badge !== undefined && (
                  <span className="ml-auto text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom: Only Logout Button */}
      <div className="border-t border-slate-100 p-3 bg-white shrink-0 mt-auto">
        <button
          onClick={() => logout()}
          title="Sign Out"
          aria-label="Logout"
          className={cn(
            "w-full flex items-center rounded-lg font-medium text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-colors cursor-pointer text-sm",
            isCollapsed
              ? "justify-center h-10 w-full"
              : "gap-3 px-3 py-2.5"
          )}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!isCollapsed && <span className="font-semibold">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
