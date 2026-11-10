import { Metadata } from "next";
import { PatientFilters } from "@/components/patients/patient-filters";
import { PatientsTable } from "@/components/patients/patients-table";
import { PatientsPagination } from "@/components/patients/patients-pagination";
import { MOCK_PATIENTS } from "@/lib/mock-data";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Patients Registry | Doctor Tracker",
  description:
    "Monitor active patient admissions, clinical condition categories, assigned doctors, and triage statuses.",
};

export default function PatientsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Patients Registry
            </h1>
            <span className="inline-flex items-center rounded-md bg-teal-50 px-2 py-0.5 text-xs font-semibold text-teal-700 border border-teal-200">
              2,845 Monitored
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time patient census, categorized by medical condition, attending physician, and clinical triage severity.
          </p>
        </div>

        {/* Quick Admit Button (Phase 1 preview) */}
        <div className="flex items-center gap-2">
          <Button
            size="default"
            className="gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Admit New Patient</span>
          </Button>
        </div>
      </div>

      {/* Visual Search & Condition Filter Controls */}
      <section aria-label="Patient search and condition filtering">
        <PatientFilters />
      </section>

      {/* Responsive Patients Table */}
      <section aria-label="Patients admission registry table">
        <PatientsTable patients={MOCK_PATIENTS} />
      </section>

      {/* Pagination Controls */}
      <section aria-label="Pagination">
        <PatientsPagination
          currentPage={1}
          totalPages={285}
          totalItems={2845}
          itemsPerPage={10}
        />
      </section>
    </div>
  );
}
