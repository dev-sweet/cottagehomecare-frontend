"use client";

import * as React from "react";
import {
  FileText,
  Calendar,
  Building,
  MoreVertical,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Patient, PatientSeverity, PatientStatus } from "@/lib/types";

interface PatientsTableProps {
  patients: Patient[];
}

const severityConfig: Record<
  PatientSeverity,
  { label: string; variant: "destructive" | "warning" | "info" | "secondary" }
> = {
  critical: { label: "Critical", variant: "destructive" },
  high: { label: "High Risk", variant: "warning" },
  moderate: { label: "Moderate", variant: "info" },
  low: { label: "Stable", variant: "secondary" },
};

const statusConfig: Record<
  PatientStatus,
  { label: string; variant: "success" | "info" | "warning" | "secondary" }
> = {
  admitted: { label: "Admitted", variant: "info" },
  in_treatment: { label: "In Care", variant: "warning" },
  outpatient: { label: "Outpatient", variant: "secondary" },
  discharged: { label: "Discharged", variant: "success" },
};

export function PatientsTable({ patients }: PatientsTableProps) {
  return (
    <div className="rounded-xl border border-slate-200/90 bg-white shadow-xs overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/75">
            <TableHead className="w-[280px]">Patient Information</TableHead>
            <TableHead>Condition & Category</TableHead>
            <TableHead>Assigned Physician</TableHead>
            <TableHead>Room & Intake Date</TableHead>
            <TableHead>Triage / Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {patients.map((patient) => {
            const severity = severityConfig[patient.severity];
            const status = statusConfig[patient.status];

            return (
              <TableRow key={patient.id} className="group hover:bg-slate-50/60">
                {/* Patient Information */}
                <TableCell>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900 group-hover:text-teal-700 transition-colors">
                        {patient.name}
                      </span>
                      <span className="font-mono text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded">
                        {patient.recordNumber}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 mt-0.5">
                      {patient.age} yrs • {patient.gender} • Blood {patient.bloodType}
                    </span>
                    <span className="text-[11px] text-slate-400 mt-0.5">
                      {patient.contactNumber}
                    </span>
                  </div>
                </TableCell>

                {/* Condition & Category */}
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs sm:text-sm font-medium text-slate-800">
                      {patient.condition}
                    </span>
                    <Badge variant="outline" className="w-fit text-[10px] text-teal-700 border-teal-200 bg-teal-50/40">
                      {patient.conditionCategory}
                    </Badge>
                  </div>
                </TableCell>

                {/* Assigned Physician */}
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <Avatar
                      src={patient.assignedDoctor.avatarUrl}
                      fallback={patient.assignedDoctor.initials}
                      size="sm"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs sm:text-sm font-semibold text-slate-800 truncate">
                        {patient.assignedDoctor.name}
                      </span>
                      <span className="text-[11px] text-slate-400 truncate">
                        {patient.assignedDoctor.specialty}
                      </span>
                    </div>
                  </div>
                </TableCell>

                {/* Room & Admission Date */}
                <TableCell>
                  <div className="flex flex-col text-xs text-slate-600 gap-1">
                    <span className="flex items-center gap-1 font-medium text-slate-700">
                      <Building className="h-3.5 w-3.5 text-slate-400" />
                      {patient.roomNumber}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      Intake: {patient.admissionDate}
                    </span>
                  </div>
                </TableCell>

                {/* Triage / Severity & Status */}
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5">
                      <Badge variant={severity.variant} className="text-[10px] px-2">
                        {severity.label}
                      </Badge>
                      <Badge variant={status.variant} className="text-[10px] px-2">
                        {status.label}
                      </Badge>
                    </div>
                  </div>
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-8 px-2.5 hidden sm:inline-flex"
                      onClick={() => alert(`Medical Chart for ${patient.name} (${patient.recordNumber})`)}
                    >
                      <FileText className="h-3.5 w-3.5 mr-1" />
                      Chart
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-400 hover:text-slate-700"
                      onClick={() => alert(`Actions menu for ${patient.name}`)}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
