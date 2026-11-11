"use client";

import * as React from "react";
import { Search, RefreshCcw, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { DoctorsTable } from "@/components/doctors/DoctorsTable";
import { Pagination } from "@/components/ui/Pagination";
import { AddDoctorButton } from "@/components/doctors/AddDoctorButton";
import { BackendDoctorRecord, Doctor } from "@/lib/types";
import {
  useAddPatientToDoctor,
  useDeletePatientFromDoctor,
  useGetDoctors,
} from "@/hooks/api/useDoctors";
import { useDashboardAnalytics } from "@/hooks/api/useDashboard";

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [specialization, setSpecialization] = React.useState("all");
  const [hospital, setHospital] = React.useState("all");
  const [dateFilter, setDateFilter] = React.useState("all");
  const [page, setPage] = React.useState(1);

  // TanStack Query: Fetch doctors from backend
  const {
    data: backendData,
    isFetching,
    isLoading,
  } = useGetDoctors({
    page,
    limit: 10,
    search: searchTerm.trim() || undefined,
    specialization: specialization !== "all" ? specialization : undefined,
    hospital: hospital !== "all" ? hospital : undefined,
  });

  // Fetch distributions for dynamic filter dropdowns
  const { data: analytics } = useDashboardAnalytics();

  const addPatientMutation = useAddPatientToDoctor();
  const deletePatientMutation = useDeletePatientFromDoctor();

  const handleReset = () => {
    setSearchTerm("");
    setSpecialization("all");
    setHospital("all");
    setDateFilter("all");
    setPage(1);
  };

  const handleAddPatientToDoctor = (
    doctorId: string,
    patientName: string,
    patientCondition: string
  ) => {
    addPatientMutation.mutate({
      doctorId,
      data: {
        name: patientName,
        condition: patientCondition,
        phone: "+1 (555) 000-0000",
      },
    });
  };

  const handleDeletePatientFromDoctor = (
    doctorId: string,
    patientId: string
  ) => {
    deletePatientMutation.mutate({
      doctorId,
      patientId,
    });
  };

  // Map real backend doctor records to UI model
  const doctors: Doctor[] = React.useMemo(() => {
    if (!backendData?.doctors) return [];
    return backendData.doctors.map((doc: BackendDoctorRecord) => ({
      id: doc._id,
      name: doc.name,
      specialization: doc.specialization,
      hospital: doc.hospital,
      phone: doc.phone,
      email: doc.email,
      registeredDate: doc.createdAt
        ? doc.createdAt.split("T")[0]
        : "",
      patientsCount:
        doc.patientCount ??
        (Array.isArray(doc.patients) ? doc.patients.length : 0),
      avatarUrl: "",
      initials: doc.name
        ? doc.name
            .split(" ")
            .map((n: string) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()
        : "DR",
      patients: (doc.patients || []).map((p) => ({
        id: p._id,
        name: p.name,
        condition: p.condition,
        registeredDate: p.createdAt ? p.createdAt.split("T")[0] : "",
      })),
    }));
  }, [backendData]);

  // Client-side date filter if selected
  const displayedDoctors = React.useMemo(() => {
    if (dateFilter === "all") return doctors;

    const now = new Date();
    return doctors.filter((doc) => {
      if (!doc.registeredDate) return true;
      const regDate = new Date(doc.registeredDate);

      if (dateFilter === "this-month") {
        return (
          regDate.getFullYear() === now.getFullYear() &&
          regDate.getMonth() === now.getMonth()
        );
      }
      if (dateFilter === "last-30") {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return regDate >= thirtyDaysAgo;
      }
      if (dateFilter === "2026") {
        return regDate.getFullYear() === 2026;
      }
      return true;
    });
  }, [doctors, dateFilter]);

  const totalCount = backendData?.pagination?.total ?? displayedDoctors.length;
  const totalPages = backendData?.pagination?.totalPages ?? 1;

  // Available specializations from database analytics or current records
  const availableSpecializations = React.useMemo(() => {
    const list = new Set<string>();
    if (analytics?.distributions?.doctorsBySpecialization) {
      analytics.distributions.doctorsBySpecialization.forEach((s) =>
        list.add(s.specialization)
      );
    }
    doctors.forEach((d) => list.add(d.specialization));
    return Array.from(list);
  }, [analytics, doctors]);

  // Available hospitals from database analytics or current records
  const availableHospitals = React.useMemo(() => {
    const list = new Set<string>();
    if (analytics?.distributions?.doctorsByHospital) {
      analytics.distributions.doctorsByHospital.forEach((h) =>
        list.add(h.hospital)
      );
    }
    doctors.forEach((d) => list.add(d.hospital));
    return Array.from(list);
  }, [analytics, doctors]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Doctors Management
            </h1>
            <span className="inline-flex items-center rounded-md bg-teal-50 px-2 py-0.5 text-xs font-semibold text-teal-700 border border-teal-200">
              {totalCount} Doctors
            </span>
            {isFetching && (
              <span className="inline-flex items-center gap-1 text-[11px] text-teal-600">
                <Loader2 className="h-3 w-3 animate-spin" />
                Syncing
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Create doctors, filter by date and specialization, view corresponding patients, and manage patient allocations.
          </p>
        </div>

        {/* Create Doctor Action */}
        <div className="flex items-center gap-2">
          <AddDoctorButton />
        </div>
      </div>

      {/* Visual Search & Filter Controls */}
      <section aria-label="Doctor search and filtering">
        <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[220px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
                placeholder="Search doctors by name, email, or hospital..."
                className="pl-9 bg-slate-50/50"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {/* Date-wise Filter */}
              <div className="relative min-w-[130px]">
                <select
                  value={dateFilter}
                  aria-label="Filter doctors date-wise"
                  onChange={(e) => {
                    setDateFilter(e.target.value);
                    setPage(1);
                  }}
                  className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-1 text-xs text-slate-700 shadow-xs focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                >
                  <option value="all">All Dates</option>
                  <option value="this-month">Joined This Month</option>
                  <option value="last-30">Last 30 Days</option>
                  <option value="2026">Registered in 2026</option>
                </select>
              </div>

              {/* Specialization Filter */}
              <div className="relative min-w-[140px]">
                <select
                  value={specialization}
                  aria-label="Filter doctors by specialization"
                  onChange={(e) => {
                    setSpecialization(e.target.value);
                    setPage(1);
                  }}
                  className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-1 text-xs text-slate-700 shadow-xs focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                >
                  <option value="all">All Specializations</option>
                  {availableSpecializations.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>

              {/* Hospital Filter */}
              <div className="relative min-w-[140px]">
                <select
                  value={hospital}
                  aria-label="Filter doctors by hospital"
                  onChange={(e) => {
                    setHospital(e.target.value);
                    setPage(1);
                  }}
                  className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-1 text-xs text-slate-700 shadow-xs focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                >
                  <option value="all">All Hospitals</option>
                  {availableHospitals.map((hosp) => (
                    <option key={hosp} value={hosp}>
                      {hosp}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reset Filter Button */}
              {(searchTerm ||
                specialization !== "all" ||
                hospital !== "all" ||
                dateFilter !== "all") && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="gap-1.5 text-xs text-slate-600 hover:text-slate-900 border-slate-200"
                >
                  <RefreshCcw className="h-3.5 w-3.5" />
                  <span>Reset</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Real Doctors Table View */}
      <section aria-label="Doctors directory">
        <DoctorsTable
          doctors={displayedDoctors}
          onAddPatient={handleAddPatientToDoctor}
          onDeletePatient={handleDeletePatientFromDoctor}
        />
      </section>

      {/* Pagination Controls */}
      <section aria-label="Doctors pagination">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={totalCount}
          itemsPerPage={10}
          onPageChange={(p) => setPage(p)}
        />
      </section>
    </div>
  );
}
