import { Metadata } from "next";
import { DoctorFilters } from "@/components/doctors/doctor-filters";
import { DoctorsTable } from "@/components/doctors/doctors-table";
import { DoctorsPagination } from "@/components/doctors/doctors-pagination";
import { AddDoctorButton } from "@/components/doctors/add-doctor-button";
import { MOCK_DOCTORS } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Doctors Directory | Doctor Tracker",
  description:
    "Manage and monitor active physician rosters, specialties, caseload allocations, and contact schedules.",
};

export default function DoctorsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Doctors Directory
            </h1>
            <span className="inline-flex items-center rounded-md bg-teal-50 px-2 py-0.5 text-xs font-semibold text-teal-700 border border-teal-200">
              48 Registered
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Comprehensive physician roster, clinical specialties, consultation schedules, and active patient allocations.
          </p>
        </div>

        {/* Add Doctor Button */}
        <div className="flex items-center gap-2">
          <AddDoctorButton />
        </div>
      </div>

      {/* Visual Search & Filter Controls */}
      <section aria-label="Physician search and filtering">
        <DoctorFilters />
      </section>

      {/* Responsive Doctors Table */}
      <section aria-label="Physicians roster table">
        <DoctorsTable doctors={MOCK_DOCTORS} />
      </section>

      {/* Pagination Controls */}
      <section aria-label="Pagination">
        <DoctorsPagination
          currentPage={1}
          totalPages={6}
          totalItems={48}
          itemsPerPage={8}
        />
      </section>
    </div>
  );
}
