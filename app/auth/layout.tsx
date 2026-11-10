import * as React from "react";
import Link from "next/link";
import { Activity, ShieldCheck, HeartPulse } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-900">
      {/* Top Simple Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 text-white shadow-md shadow-teal-500/20">
            <Activity className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 tracking-tight text-base">
              Doctor Tracker
            </span>
            <span className="text-[11px] text-slate-400 font-medium">
              Administrative Health Portal
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 bg-white border border-slate-200/80 rounded-full px-3 py-1 shadow-2xs">
          <ShieldCheck className="h-3.5 w-3.5 text-teal-600" />
          <span>Secure Administrator Access</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>

      {/* Auth Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-slate-200/60">
        <span>Doctor Tracker &bull; Administrative Web Application</span>
        <div className="flex items-center gap-1.5 text-slate-500">
          <HeartPulse className="h-3.5 w-3.5 text-teal-600" />
          <span>Restricted to Authorized Hospital Personnel</span>
        </div>
      </footer>
    </div>
  );
}

