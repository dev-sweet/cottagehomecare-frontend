import * as React from "react";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { MOCK_PATIENTS } from "@/lib/mock-data";
import { PatientSeverity, PatientStatus } from "@/lib/types";

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

export function RecentPatients() {
  // Show 4 recent patients
  const patients = MOCK_PATIENTS.slice(0, 4);

  return (
    <Card className="border-slate-200/90 shadow-xs flex flex-col h-full">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <Users className="h-4 w-4" />
          </div>
          <div>
            <CardTitle className="text-base font-bold text-slate-900">
              Recent Admissions
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Latest patient admissions, triage level & assigned doctor
            </CardDescription>
          </div>
        </div>

        <Link
          href="/patients"
          className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1 group"
        >
          <span>View All</span>
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </CardHeader>

      <CardContent className="pt-1 flex-1">
        <div className="divide-y divide-slate-100">
          {patients.map((patient) => {
            const severity = severityConfig[patient.severity];
            const status = statusConfig[patient.status];

            return (
              <div
                key={patient.id}
                className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50/60 rounded-lg px-2 -mx-2 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
                        {patient.name}
                      </span>
                      <span className="text-[10px] font-mono font-medium text-slate-400">
                        {patient.recordNumber}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate">
                      {patient.condition} • {patient.roomNumber}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500">
                    <Avatar
                      src={patient.assignedDoctor.avatarUrl}
                      fallback={patient.assignedDoctor.initials}
                      size="sm"
                    />
                    <span className="text-[11px] truncate max-w-[100px]">
                      {patient.assignedDoctor.name.replace("Dr. ", "")}
                    </span>
                  </div>

                  <Badge variant={status.variant} className="text-[10px] px-2 hidden sm:inline-flex">
                    {status.label}
                  </Badge>

                  <Badge variant={severity.variant} className="text-[10px] px-2">
                    {severity.label}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
