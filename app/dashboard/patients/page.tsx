"use client";

import * as React from "react";
import { Search, HeartPulse, RefreshCcw } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { PatientsTable } from "@/components/patients/PatientsTable";
import { Pagination } from "@/components/ui/Pagination";
import { MOCK_PATIENTS } from "@/lib/mock-data";
import { Patient } from "@/lib/types";

const conditionCategories = [
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Oncology",
  "Endocrinology",
  "General Medicine",
];

export default function PatientsPage() {
  const [patientsList, setPatientsList] = React.useState<Patient[]>(MOCK_PATIENTS);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCondition, setSelectedCondition] = React.useState("all");
  const [dateFilter, setDateFilter] = React.useState("all");

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCondition("all");
    setDateFilter("all");
  };

  const handleEditPatient = (updated: Patient) => {
    setPatientsList((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
  };

  const handleDeletePatient = (patientId: string) => {
    setPatientsList((prev) => prev.filter((p) => p.id !== patientId));
  };

  const filteredPatients = React.useMemo(() => {
    return patientsList.filter((p) => {
      const matchesSearch =
        !searchTerm ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.patientCondition.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCondition =
        selectedCondition === "all" || p.conditionCategory === selectedCondition;

      const matchesDate =
        dateFilter === "all" ||
        (dateFilter === "this-month" && p.registeredDate.startsWith("2026-11")) ||
        (dateFilter === "last-30" && p.registeredDate >= "2026-10-10") ||
        (dateFilter === "2026" && p.registeredDate.startsWith("2026"));

      return matchesSearch && matchesCondition && matchesDate;
    });
  }, [patientsList, searchTerm, selectedCondition, dateFilter]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="pb-2 border-b border-slate-200/60">
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Patients Management
          </h1>
          <span className="inline-flex items-center rounded-md bg-teal-50 px-2 py-0.5 text-xs font-semibold text-teal-700 border border-teal-200">
            {filteredPatients.length} Patients
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Dedicated patient page: list all patients, edit details, delete records, search, filter date-wise and by condition.
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
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search patients by name, email, phone, or assigned doctor..."
                className="pl-9 bg-slate-50/50"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {/* Date-wise Filter */}
              <div className="relative min-w-[140px]">
                <select
                  value={dateFilter}
                  aria-label="Filter patients date-wise"
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-1 text-xs text-slate-700 shadow-xs focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                >
                  <option value="all">All Registration Dates</option>
                  <option value="this-month">Registered This Month</option>
                  <option value="last-30">Last 30 Days</option>
                  <option value="2026">Registered in 2026</option>
                </select>
              </div>

              {/* Patient Condition Category Filter */}
              <div className="relative min-w-[160px]">
                <select
                  value={selectedCondition}
                  aria-label="Filter patients by condition category"
                  onChange={(e) => setSelectedCondition(e.target.value)}
                  className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-1 text-xs text-slate-700 shadow-xs focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                >
                  <option value="all">All Patient Conditions</option>
                  {conditionCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reset button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="text-xs text-slate-500 hover:text-slate-800 gap-1.5 h-9"
              >
                <RefreshCcw className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </Button>
            </div>
          </div>

          {/* Condition quick filter pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-0.5 text-xs">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
              <HeartPulse className="h-3.5 w-3.5 text-rose-500" />
              Condition:
            </span>
            <button
              onClick={() => setSelectedCondition("all")}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors shrink-0 cursor-pointer ${
                selectedCondition === "all"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              All
            </button>
            {conditionCategories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCondition(c)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors shrink-0 cursor-pointer ${
                  selectedCondition === c
                    ? "bg-teal-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Responsive Patients Table (List, Edit, Delete) */}
      <section aria-label="Patients list table">
        <PatientsTable
          patients={filteredPatients}
          onEditPatient={handleEditPatient}
          onDeletePatient={handleDeletePatient}
        />
      </section>

      {/* Shared Reusable Pagination Component */}
      <section aria-label="Pagination">
        <Pagination
          totalItems={filteredPatients.length}
          itemsPerPage={10}
          itemLabel="patients"
        />
      </section>
    </div>
  );
}
