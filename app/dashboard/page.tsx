import { Metadata } from "next";
import { StatCards } from "@/components/dashboard/stat-cards";
import { PatientsPerDoctorChart } from "@/components/dashboard/patients-per-doctor-chart";
import { RegistrationTrendsChart } from "@/components/dashboard/registration-trends-chart";
import { RecentDoctors } from "@/components/dashboard/recent-doctors";
import { RecentPatients } from "@/components/dashboard/recent-patients";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard | Doctor Tracker",
  description:
    "Executive healthcare administration dashboard with live clinical metrics, caseloads, and patient admissions.",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Top Welcome & Hospital Status Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Hospital Operations Overview
            </h1>
            <span className="hidden sm:inline-flex items-center rounded-md bg-teal-50 px-2 py-0.5 text-xs font-semibold text-teal-700 border border-teal-200">
              Live Roster
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time healthcare administration metrics, clinical caseload tracking, and admission telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600 shadow-2xs">
            <ShieldCheck className="h-4 w-4 text-teal-600" />
            <span>Shift: Day (08:00 - 16:00)</span>
          </div>
        </div>
      </div>

      {/* 1. Four Static Statistic Cards */}
      <section aria-labelledby="metrics-heading">
        <h2 id="metrics-heading" className="sr-only">
          Key Performance Metrics
        </h2>
        <StatCards />
      </section>

      {/* 2. Visual Charts Row */}
      <section
        aria-labelledby="analytics-heading"
        className="grid grid-cols-1 lg:grid-cols-12 gap-6"
      >
        <h2 id="analytics-heading" className="sr-only">
          Caseload & Registration Analytics
        </h2>

        {/* Patients Per Doctor Caseload (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <PatientsPerDoctorChart />
        </div>

        {/* Patient Registration Trends Chart (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col">
          <RegistrationTrendsChart />
        </div>
      </section>

      {/* 3. Recent Doctors & Recent Patients Row */}
      <section
        aria-labelledby="recent-activity-heading"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <h2 id="recent-activity-heading" className="sr-only">
          Recent Clinical Activity
        </h2>

        {/* Recent Doctors */}
        <div>
          <RecentDoctors />
        </div>

        {/* Recent Patients */}
        <div>
          <RecentPatients />
        </div>
      </section>
    </div>
  );
}
