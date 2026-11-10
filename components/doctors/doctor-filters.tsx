"use client";

import * as React from "react";
import { Search, RefreshCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DoctorFiltersProps {
  onSearchChange?: (term: string) => void;
  onSpecialtyChange?: (specialty: string) => void;
  onStatusChange?: (status: string) => void;
}

export function DoctorFilters({
  onSearchChange,
  onSpecialtyChange,
  onStatusChange,
}: DoctorFiltersProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [specialty, setSpecialty] = React.useState("all");
  const [status, setStatus] = React.useState("all");

  const handleReset = () => {
    setSearchTerm("");
    setSpecialty("all");
    setStatus("all");
  };

  return (
    <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              onSearchChange?.(e.target.value);
            }}
            placeholder="Search doctor by name, specialty, room, or email..."
            className="pl-9 bg-slate-50/50"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Specialty Filter */}
          <div className="relative min-w-[140px]">
            <select
              value={specialty}
              aria-label="Filter doctors by specialty"
              onChange={(e) => {
                setSpecialty(e.target.value);
                onSpecialtyChange?.(e.target.value);
              }}
              className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-1 text-xs text-slate-700 shadow-xs focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
            >
              <option value="all">All Specialties</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Oncology">Oncology</option>
              <option value="Endocrinology">Endocrinology</option>
              <option value="General Medicine">General Medicine</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="relative min-w-[130px]">
            <select
              value={status}
              aria-label="Filter doctors by duty status"
              onChange={(e) => {
                setStatus(e.target.value);
                onStatusChange?.(e.target.value);
              }}
              className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-1 text-xs text-slate-700 shadow-xs focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
            >
              <option value="all">All Duty Statuses</option>
              <option value="available">On Duty / Available</option>
              <option value="in_surgery">In Surgery</option>
              <option value="off_duty">Off Duty</option>
              <option value="on_leave">On Leave</option>
            </select>
          </div>

          {/* Reset Filters */}
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
    </div>
  );
}
