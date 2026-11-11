"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { StatCards } from "@/components/dashboard/StatCards";
import { PatientsPerDoctorChart } from "@/components/dashboard/PatientsPerDoctorChart";
import { RegistrationTrendsChart } from "@/components/dashboard/RegistrationTrendsChart";
import { RecentDoctors } from "@/components/dashboard/RecentDoctors";
import { RecentPatients } from "@/components/dashboard/RecentPatients";
import { useDashboardAnalytics } from "@/hooks/api/useDashboard";
import { useGetDoctors } from "@/hooks/api/useDoctors";
import { useGetPatients } from "@/hooks/api/usePatients";
import { BackendDoctorRecord, BackendPatientRecord, Doctor, Patient } from "@/lib/types";

export default function DashboardPage() {
  const { data: analytics, isFetching, isLoading: isAnalyticsLoading } = useDashboardAnalytics();
  const { data: doctorsData, isLoading: isDoctorsLoading } = useGetDoctors({ limit: 4 });
  const { data: patientsData, isLoading: isPatientsLoading } = useGetPatients({ limit: 4 });

  const mappedDoctors: Doctor[] = React.useMemo(() => {
    if (doctorsData?.doctors && doctorsData.doctors.length > 0) {
      return doctorsData.doctors.map((d: BackendDoctorRecord) => ({
        id: d._id,
        name: d.name,
        specialization: d.specialization,
        hospital: d.hospital,
        phone: d.phone,
        email: d.email,
        registeredDate: d.createdAt ? d.createdAt.split("T")[0] : "",
        patientsCount: d.patientCount || 0,
        avatarUrl: "",
        initials: d.name
          ? d.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()
          : "DR",
        patients: [],
      }));
    }
    return [];
  }, [doctorsData]);

  const mappedPatients: Patient[] = React.useMemo(() => {
    if (patientsData?.patients && patientsData.patients.length > 0) {
      return patientsData.patients.map((p: BackendPatientRecord) => ({
        id: p._id,
        name: p.name,
        patientCondition: p.condition,
        conditionCategory: p.condition,
        doctorId: p.doctor?._id || "",
        doctorName: p.doctor?.name || "Assigned Physician",
        doctorSpecialization: p.doctor?.specialization || "General Medicine",
        hospital: p.doctor?.hospital || "Hospital",
        registeredDate: p.createdAt ? p.createdAt.split("T")[0] : "",
        phone: p.phone || "",
        email: p.email || "",
      }));
    }
    return [];
  }, [patientsData]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="pb-2 border-b border-slate-200/60 flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time analytics for total doctors, total patients, patients per doctor, and date-based registration trends.
          </p>
        </div>
        {isFetching && (
          <span className="inline-flex items-center gap-1.5 text-xs text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full font-medium border border-teal-200">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Live Sync
          </span>
        )}
      </div>

      {/* 1. Four Core Statistics Cards */}
      <section aria-labelledby="metrics-heading">
        <h2 id="metrics-heading" className="sr-only">
          Core Metrics
        </h2>
        <StatCards
          summary={analytics?.summary}
          isLoading={isAnalyticsLoading && !analytics}
        />
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
          <PatientsPerDoctorChart
            items={analytics?.patientsPerDoctor}
            isLoading={isAnalyticsLoading && !analytics}
          />
        </div>

        {/* Date-based Statistics Trends Chart */}
        <div className="lg:col-span-7 flex flex-col">
          <RegistrationTrendsChart
            trends={analytics?.dateBasedStatistics?.patientsTrend}
            isLoading={isAnalyticsLoading && !analytics}
          />
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
          <RecentDoctors
            doctors={mappedDoctors}
            isLoading={isDoctorsLoading && mappedDoctors.length === 0}
          />
        </div>

        {/* Recent Patients */}
        <div>
          <RecentPatients
            patients={mappedPatients}
            isLoading={isPatientsLoading && mappedPatients.length === 0}
          />
        </div>
      </section>
    </div>
  );
}
