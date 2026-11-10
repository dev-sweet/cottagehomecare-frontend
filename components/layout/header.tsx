"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Menu, ShieldCheck } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

export function Header({ onOpenMobileMenu }: HeaderProps) {
  const pathname = usePathname();

  const getPageInfo = () => {
    if (pathname.startsWith("/dashboard/doctors")) {
      return {
        title: "Doctors Management",
        breadcrumb: "Doctor Tracker / Dashboard / Doctors",
      };
    }
    if (pathname.startsWith("/dashboard/patients")) {
      return {
        title: "Patients Management",
        breadcrumb: "Doctor Tracker / Dashboard / Patients",
      };
    }
    return {
      title: "Admin Dashboard",
      breadcrumb: "Doctor Tracker / Dashboard",
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
          className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
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

      {/* Right: Authenticated Admin Status & Profile */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-full px-3 py-1">
          <ShieldCheck className="h-3.5 w-3.5 text-teal-600" />
          <span>Admin Portal</span>
        </div>

        <div className="flex items-center gap-2 pl-1 sm:pl-2">
          <Avatar
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256"
            fallback="AD"
            size="md"
            className="ring-2 ring-teal-500/20"
          />
          <div className="hidden md:flex flex-col">
            <span className="text-xs font-semibold text-slate-800">
              Admin
            </span>
            <span className="text-[10px] text-teal-600 font-medium">
              Authenticated
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
