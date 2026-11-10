import { Metadata } from "next";
import { StatCards } from "@/components/dashboard/StatCards";
import { PatientsPerDoctorChart } from "@/components/dashboard/PatientsPerDoctorChart";
import { RegistrationTrendsChart } from "@/components/dashboard/RegistrationTrendsChart";
import { RecentDoctors } from "@/components/dashboard/RecentDoctors";
import { RecentPatients } from "@/components/dashboard/RecentPatients";

export const metadata: Metadata = {
  title: "Dashboard | Doctor Tracker",
  description:
    "Administrative dashboard with analytics on total doctors, total patients, patients per doctor, and date-based statistics.",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="pb-2 border-b border-slate-200/60">
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Visual analytics for total doctors, total patients, patients per doctor, and date-based registration trends.
        </p>
      </div>

      {/* 1. Four Core Statistics Cards */}
      <section aria-labelledby="metrics-heading">
        <h2 id="metrics-heading" className="sr-only">
          Core Metrics
        </h2>
        <StatCards />
      </section>

      {/* 2. Visual Charts Row */}
      <section
        aria-labelledby="analytics-heading"
        className="grid grid-cols-1 lg:grid-cols-12 gap-6"
      >
        <h2 id="analytics-heading" className="sr-only">
          Patients Per Doctor & Date-Based Statistics
        </h2>

        {/* Patients Per Doctor Chart */}
        <div className="lg:col-span-5 flex flex-col">
          <PatientsPerDoctorChart />
        </div>

        {/* Date-based Statistics Trends Chart */}
        <div className="lg:col-span-7 flex flex-col">
          <RegistrationTrendsChart />
        </div>
      </section>

      {/* 3. Recent Doctors & Recent Patients */}
      <section
        aria-labelledby="recent-activity-heading"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <h2 id="recent-activity-heading" className="sr-only">
          Doctors and Patients Lists
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
