"use client";

import * as React from "react";
import { Search, RefreshCcw } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { DoctorsTable } from "@/components/doctors/DoctorsTable";
import { Pagination } from "@/components/ui/Pagination";
import { AddDoctorButton } from "@/components/doctors/AddDoctorButton";
import { MOCK_DOCTORS } from "@/lib/mock-data";
import { Doctor } from "@/lib/types";

export default function DoctorsPage() {
  const [doctorsList, setDoctorsList] = React.useState<Doctor[]>(MOCK_DOCTORS);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [specialization, setSpecialization] = React.useState("all");
  const [hospital, setHospital] = React.useState("all");
  const [dateFilter, setDateFilter] = React.useState("all");

  const handleReset = () => {
    setSearchTerm("");
    setSpecialization("all");
    setHospital("all");
    setDateFilter("all");
  };

  const handleAddPatientToDoctor = (
    doctorId: string,
    patientName: string,
    patientCondition: string
  ) => {
    const newEntry = {
      id: `pt-${Date.now()}`,
      name: patientName,
      condition: patientCondition,
      registeredDate: new Date().toISOString().split("T")[0],
    };

    setDoctorsList((prev) =>
      prev.map((doc) => {
        if (doc.id === doctorId) {
          return {
            ...doc,
            patientsCount: doc.patientsCount + 1,
            patients: [...doc.patients, newEntry],
          };
        }
        return doc;
      })
    );
  };

  const handleDeletePatientFromDoctor = (doctorId: string, patientId: string) => {
    setDoctorsList((prev) =>
      prev.map((doc) => {
        if (doc.id === doctorId) {
          return {
            ...doc,
            patientsCount: Math.max(0, doc.patientsCount - 1),
            patients: doc.patients.filter((p) => p.id !== patientId),
          };
        }
        return doc;
      })
    );
  };

  const filteredDoctors = React.useMemo(() => {
    return doctorsList.filter((doc) => {
      const matchesSearch =
        !searchTerm ||
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.specialization.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSpecialization =
        specialization === "all" || doc.specialization === specialization;

      const matchesHospital =
        hospital === "all" || doc.hospital === hospital;

      const matchesDate =
        dateFilter === "all" ||
        (dateFilter === "this-month" && doc.registeredDate.startsWith("2026-11")) ||
        (dateFilter === "last-30" && doc.registeredDate >= "2026-10-10") ||
        (dateFilter === "2026" && doc.registeredDate.startsWith("2026"));

      return matchesSearch && matchesSpecialization && matchesHospital && matchesDate;
    });
  }, [doctorsList, searchTerm, specialization, hospital, dateFilter]);

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
              {filteredDoctors.length} Doctors
            </span>
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
                onChange={(e) => setSearchTerm(e.target.value)}
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
                  onChange={(e) => setDateFilter(e.target.value)}
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
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-1 text-xs text-slate-700 shadow-xs focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                >
                  <option value="all">All Specializations</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Oncology">Oncology</option>
                  <option value="Endocrinology">Endocrinology</option>
                  <option value="General Medicine">General Medicine</option>
                </select>
              </div>

              {/* Hospital Filter */}
              <div className="relative min-w-[140px]">
                <select
                  value={hospital}
                  aria-label="Filter doctors by hospital"
                  onChange={(e) => setHospital(e.target.value)}
                  className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-1 text-xs text-slate-700 shadow-xs focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                >
                  <option value="all">All Hospitals</option>
                  <option value="Metropolitan Central Hospital">Metropolitan Central</option>
                  <option value="St. Jude Neuroscience Institute">St. Jude Institute</option>
                  <option value="Valley Children's Hospital">Valley Children&apos;s</option>
                  <option value="Summit Orthopedic Center">Summit Orthopedic</option>
                  <option value="Hope Comprehensive Cancer Pavilion">Hope Cancer Pavilion</option>
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
      </section>

      {/* Responsive Doctors Table */}
      <section aria-label="Doctors list table">
        <DoctorsTable
          doctors={filteredDoctors}
          onAddPatient={handleAddPatientToDoctor}
          onDeletePatient={handleDeletePatientFromDoctor}
        />
      </section>

      {/* Shared Reusable Pagination Component */}
      <section aria-label="Pagination">
        <Pagination
          totalItems={filteredDoctors.length}
          itemsPerPage={8}
          itemLabel="physicians"
        />
      </section>
    </div>
  );
}
