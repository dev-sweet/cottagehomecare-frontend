"use client";

import * as React from "react";
import { Search, HeartPulse, RefreshCcw, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { PatientsTable } from "@/components/patients/PatientsTable";
import { Pagination } from "@/components/ui/Pagination";
import { BackendPatientRecord, Patient } from "@/lib/types";
import {
  useDeletePatient,
  useGetPatients,
  useUpdatePatient,
} from "@/hooks/api/usePatients";
import { useDashboardAnalytics } from "@/hooks/api/useDashboard";

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCondition, setSelectedCondition] = React.useState("all");
  const [dateFilter, setDateFilter] = React.useState("all");
  const [page, setPage] = React.useState(1);

  // TanStack Query: Fetch patients from backend API
  const {
    data: backendData,
    isFetching,
    isLoading,
  } = useGetPatients({
    page,
    limit: 10,
    search: searchTerm.trim() || undefined,
    condition: selectedCondition !== "all" ? selectedCondition : undefined,
  });

  const { data: analytics } = useDashboardAnalytics();

  const updatePatientMutation = useUpdatePatient();
  const deletePatientMutation = useDeletePatient();

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCondition("all");
    setDateFilter("all");
    setPage(1);
  };

  const handleEditPatient = (updated: Patient) => {
    updatePatientMutation.mutate({
      id: updated.id,
      data: {
        name: updated.name,
        condition: updated.patientCondition,
        phone: updated.phone,
        email: updated.email,
      },
    });
  };

  const handleDeletePatient = (patientId: string) => {
    deletePatientMutation.mutate(patientId);
  };

  // Map real backend patient records
  const patients: Patient[] = React.useMemo(() => {
    if (!backendData?.patients) return [];
    return backendData.patients.map((p: BackendPatientRecord) => ({
      id: p._id,
      name: p.name,
      patientCondition: p.condition,
      conditionCategory: p.condition,
      doctorId: p.doctor?._id || "",
      doctorName: p.doctor?.name || "Assigned Physician",
      doctorSpecialization: p.doctor?.specialization || "General Medicine",
      hospital: p.doctor?.hospital || "Hospital Not Specified",
      registeredDate: p.createdAt
        ? p.createdAt.split("T")[0]
        : "",
      phone: p.phone || "N/A",
      email: p.email || "N/A",
    }));
  }, [backendData]);

  // Client-side date filter if selected
  const displayedPatients = React.useMemo(() => {
    if (dateFilter === "all") return patients;

    const now = new Date();
    return patients.filter((patient) => {
      if (!patient.registeredDate) return true;
      const regDate = new Date(patient.registeredDate);

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
  }, [patients, dateFilter]);

  const totalCount = backendData?.pagination?.total ?? displayedPatients.length;
  const totalPages = backendData?.pagination?.totalPages ?? 1;

  // Available conditions from database analytics or current records
  const availableConditions = React.useMemo(() => {
    const list = new Set<string>();
    if (analytics?.distributions?.patientsByCondition) {
      analytics.distributions.patientsByCondition.forEach((c) =>
        list.add(c.condition)
      );
    }
    patients.forEach((p) => list.add(p.patientCondition));
    return Array.from(list);
  }, [analytics, patients]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="pb-2 border-b border-slate-200/60">
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Patients Management
          </h1>
          <span className="inline-flex items-center rounded-md bg-teal-50 px-2 py-0.5 text-xs font-semibold text-teal-700 border border-teal-200">
            {totalCount} Patients
          </span>
          {isFetching && (
            <span className="inline-flex items-center gap-1 text-[11px] text-teal-600">
              <Loader2 className="h-3 w-3 animate-spin" />
              Syncing
            </span>
          )}
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Dedicated patient page: list all patients, edit details, delete
          records, search, and filter date-wise and by condition.
        </p>
      </div>

      {/* Visual Search & Condition/Date-wise Filter Controls */}
      <section aria-label="Patient search and filtering">
        <div className="space-y-3 rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
                placeholder="Search patients by name, email, phone, or assigned doctor..."
                className="pl-9 bg-slate-50/50"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {/* Date-wise Filter */}
              <div className="relative min-w-[130px]">
                <select
                  value={dateFilter}
                  aria-label="Filter patients date-wise"
                  onChange={(e) => {
                    setDateFilter(e.target.value);
                    setPage(1);
                  }}
                  className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-1 text-xs text-slate-700 shadow-xs focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                >
                  <option value="all">All Dates</option>
                  <option value="this-month">Admitted This Month</option>
                  <option value="last-30">Last 30 Days</option>
                  <option value="2026">Registered in 2026</option>
                </select>
              </div>

              {/* Condition Filter */}
              <div className="relative min-w-[150px]">
                <select
                  value={selectedCondition}
                  aria-label="Filter patients by condition"
                  onChange={(e) => {
                    setSelectedCondition(e.target.value);
                    setPage(1);
                  }}
                  className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-1 text-xs text-slate-700 shadow-xs focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                >
                  <option value="all">All Conditions</option>
                  {availableConditions.map((condition) => (
                    <option key={condition} value={condition}>
                      {condition}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reset Filter Button */}
              {(searchTerm ||
                selectedCondition !== "all" ||
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

      {/* Real Patients Table */}
      <section aria-label="Patients directory">
        <PatientsTable
          patients={displayedPatients}
          onEditPatient={handleEditPatient}
          onDeletePatient={handleDeletePatient}
        />
      </section>

      {/* Pagination Controls */}
      <section aria-label="Patients pagination">
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
