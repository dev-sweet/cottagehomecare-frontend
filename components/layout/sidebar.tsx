"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  LogOut,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MAIN_NAV_ITEMS, SECONDARY_NAV_ITEMS } from "./nav-items";
import { Avatar } from "@/components/ui/avatar";

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({ isCollapsed, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col border-r border-slate-200/90 bg-white transition-all duration-300 ease-in-out z-30 select-none relative",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-slate-100">
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
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 tracking-tight text-base truncate">
                  Doctor Tracker
                </span>
                <span className="inline-flex items-center rounded bg-teal-50 px-1.5 py-0.2 text-[10px] font-semibold text-teal-700 border border-teal-200">
                  PRO
                </span>
              </div>
              <span className="text-xs text-slate-400 font-medium truncate">
                Clinical Health Portal
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* Collapse Toggle Pill */}
      <button
        onClick={onToggleCollapse}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="absolute -right-3 top-20 z-40 flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-100 hover:text-slate-900 transition-colors"
      >
        {isCollapsed ? (
          <ChevronRight className="h-3.5 w-3.5" />
        ) : (
          <ChevronLeft className="h-3.5 w-3.5" />
        )}
      </button>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        <div>
          {!isCollapsed && (
            <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Primary Navigation
            </p>
          )}
          <nav className="space-y-1">
            {MAIN_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));

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
                  {!isCollapsed && item.badge && (
                    <span
                      className={cn(
                        "ml-auto text-[11px] font-semibold px-2 py-0.5 rounded-full",
                        item.badgeVariant === "success"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-600"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Secondary Navigation */}
        <div>
          {!isCollapsed && (
            <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Hospital Operations
            </p>
          )}
          <nav className="space-y-1">
            {SECONDARY_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  title={isCollapsed ? item.title : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors group",
                    isCollapsed && "justify-center px-2"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-slate-600" />
                  {!isCollapsed && (
                    <span className="truncate flex-1 text-xs">{item.title}</span>
                  )}
                  {!isCollapsed && item.badge && (
                    <span className="ml-auto text-[10px] font-medium px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-700">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* System Notice Card (Expanded only) */}
        {!isCollapsed && (
          <div className="rounded-xl border border-teal-100 bg-teal-50/60 p-3.5 text-xs text-teal-900">
            <div className="flex items-center gap-2 mb-1.5 font-semibold text-teal-800">
              <Sparkles className="h-3.5 w-3.5 text-teal-600" />
              <span>Phase 1 System Ready</span>
            </div>
            <p className="text-[11px] text-teal-700/90 leading-relaxed">
              Real-time patient intake and duty rosters updated. Mock telemetry active.
            </p>
          </div>
        )}
      </div>

      {/* Footer Profile Strip */}
      <div className="border-t border-slate-100 p-3">
        <div
          className={cn(
            "flex items-center gap-3 rounded-lg p-1.5 hover:bg-slate-50 transition-colors",
            isCollapsed && "justify-center p-0"
          )}
        >
          <Avatar
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256"
            fallback="SJ"
            size="sm"
          />
          {!isCollapsed && (
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-semibold text-slate-800 truncate">
                Dr. Sarah Jenkins
              </span>
              <span className="text-[11px] text-slate-400 truncate flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-teal-500" />
                Admin Director
              </span>
            </div>
          )}
          {!isCollapsed && (
            <button
              title="Sign Out (Simulated)"
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}

