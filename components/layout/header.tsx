"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  Search,
  Bell,
  Plus,
  Stethoscope,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

export function Header({ onOpenMobileMenu }: HeaderProps) {
  const pathname = usePathname();
  const [hasNotification, setHasNotification] = React.useState(true);
  const [showNotificationToast, setShowNotificationToast] = React.useState(false);

  const getPageInfo = () => {
    if (pathname.startsWith("/doctors")) {
      return {
        title: "Doctors Directory",
        breadcrumb: "Clinical Staff / Doctors",
      };
    }
    if (pathname.startsWith("/patients")) {
      return {
        title: "Patients Registry",
        breadcrumb: "Patient Care / Admissions",
      };
    }
    return {
      title: "Hospital Overview",
      breadcrumb: "Administration / Dashboard",
    };
  };

  const { title, breadcrumb } = getPageInfo();

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 sm:px-6 backdrop-blur-md">
      {/* Left: Mobile Menu Trigger + Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          aria-label="Open mobile navigation"
          className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex flex-col">
          <span className="text-[11px] font-medium text-slate-400 hidden sm:block">
            {breadcrumb}
          </span>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-tight">
            {title}
          </h1>
        </div>
      </div>

      {/* Middle: Visual Quick Search Bar */}
      <div className="hidden lg:flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            readOnly
            placeholder="Quick search doctors, patients, MRN (Ctrl+K)..."
            className="h-9 w-full rounded-lg border border-slate-200/90 bg-slate-50/70 pl-9 pr-12 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white cursor-pointer transition-all"
            onClick={() => alert("Search modal ready for Phase 2 integration.")}
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-mono text-slate-400 shadow-2xs">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right: Hospital Status, Notification Bell, User Avatar */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Hospital Status Pill */}
        <div className="hidden xl:flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50/80 px-3 py-1 text-xs font-medium text-emerald-800">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          <span>ER & Wards Active</span>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setHasNotification(false);
              setShowNotificationToast(!showNotificationToast);
            }}
            aria-label="View notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200/90 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          >
            <Bell className="h-4 w-4" />
            {hasNotification && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-xs">
                3
              </span>
            )}
          </button>

          {/* Quick Notification Dropdown (Simulated) */}
          {showNotificationToast && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-200 bg-white p-3 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-semibold text-slate-900">
                  System Alerts
                </span>
                <span className="text-[10px] text-teal-600 font-medium cursor-pointer">
                  Mark all read
                </span>
              </div>
              <div className="mt-2 space-y-2 text-xs">
                <div className="flex gap-2.5 p-2 rounded-lg bg-teal-50/50">
                  <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-slate-800">
                      Dr. Vance completed ICU rounds
                    </p>
                    <p className="text-[10px] text-slate-400">12 mins ago</p>
                  </div>
                </div>
                <div className="flex gap-2.5 p-2 rounded-lg hover:bg-slate-50">
                  <Stethoscope className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-slate-800">
                      New admission: MRN-84928
                    </p>
                    <p className="text-[10px] text-slate-400">35 mins ago</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <Button
          size="sm"
          className="hidden sm:inline-flex gap-1.5 shadow-xs"
          onClick={() => {
            if (pathname.includes("doctor")) {
              alert("Add Doctor form modal available in Phase 2.");
            } else if (pathname.includes("patient")) {
              alert("Patient Intake Registration available in Phase 2.");
            } else {
              alert("Quick Admission flow available in Phase 2.");
            }
          }}
        >
          <Plus className="h-4 w-4" />
          <span>Quick Intake</span>
        </Button>

        {/* User Avatar */}
        <div className="flex items-center pl-1 sm:pl-2">
          <Avatar
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256"
            fallback="SJ"
            size="md"
            className="ring-2 ring-teal-500/20"
          />
        </div>
      </div>
    </header>
  );
}

