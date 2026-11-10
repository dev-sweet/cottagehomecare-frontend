"use client";

import * as React from "react";
import { Search, HeartPulse, RefreshCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MedicalConditionCategory } from "@/lib/types";

interface PatientFiltersProps {
  onSearchChange?: (term: string) => void;
  onConditionChange?: (condition: string) => void;
  onSeverityChange?: (severity: string) => void;
  onStatusChange?: (status: string) => void;
}

const conditionCategories: MedicalConditionCategory[] = [
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Oncology",
  "Endocrinology",
  "General Medicine",
];

export function PatientFilters({
  onSearchChange,
  onConditionChange,
  onSeverityChange,
  onStatusChange,
}: PatientFiltersProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCondition, setSelectedCondition] = React.useState("all");
  const [selectedSeverity, setSelectedSeverity] = React.useState("all");
  const [selectedStatus, setSelectedStatus] = React.useState("all");

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCondition("all");
    setSelectedSeverity("all");
    setSelectedStatus("all");
  };

  return (
    <div className="space-y-3 rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs">
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
            placeholder="Search patient by MRN, name, room, or assigned doctor..."
            className="pl-9 bg-slate-50/50"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Patient Condition Category Filter */}
          <div className="relative min-w-[150px]">
            <select
              value={selectedCondition}
              aria-label="Filter patients by medical condition category"
              onChange={(e) => {
                setSelectedCondition(e.target.value);
                onConditionChange?.(e.target.value);
              }}
              className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-1 text-xs text-slate-700 shadow-xs focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
            >
              <option value="all">All Medical Conditions</option>
              {conditionCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Triage / Severity Filter */}
          <div className="relative min-w-[125px]">
            <select
              value={selectedSeverity}
              aria-label="Filter patients by severity"
              onChange={(e) => {
                setSelectedSeverity(e.target.value);
                onSeverityChange?.(e.target.value);
              }}
              className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-1 text-xs text-slate-700 shadow-xs focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High Risk</option>
              <option value="moderate">Moderate</option>
              <option value="low">Stable</option>
            </select>
          </div>

          {/* Admission Status Filter */}
          <div className="relative min-w-[125px]">
            <select
              value={selectedStatus}
              aria-label="Filter patients by admission status"
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                onStatusChange?.(e.target.value);
              }}
              className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-1 text-xs text-slate-700 shadow-xs focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="admitted">Admitted</option>
              <option value="in_treatment">In Treatment</option>
              <option value="outpatient">Outpatient</option>
              <option value="discharged">Discharged</option>
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

      {/* Condition quick filter badges */}
      <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-0.5 text-xs no-scrollbar">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
          <HeartPulse className="h-3.5 w-3.5 text-rose-500" />
          Quick Filter:
        </span>
        <button
          onClick={() => {
            setSelectedCondition("all");
            onConditionChange?.("all");
          }}
          className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors shrink-0 cursor-pointer ${
            selectedCondition === "all"
              ? "bg-slate-900 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          All ({conditionCategories.length})
        </button>
        {conditionCategories.map((c) => (
          <button
            key={c}
            onClick={() => {
              setSelectedCondition(c);
              onConditionChange?.(c);
            }}
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
  );
}
