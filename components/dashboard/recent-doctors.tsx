import * as React from "react";
import Link from "next/link";
import { ArrowRight, UserCheck, Stethoscope } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { MOCK_DOCTORS } from "@/lib/mock-data";
import { DoctorStatus } from "@/lib/types";

const statusConfig: Record<
  DoctorStatus,
  { label: string; variant: "success" | "warning" | "secondary" | "destructive" }
> = {
  available: { label: "On Duty", variant: "success" },
  in_surgery: { label: "In Surgery", variant: "warning" },
  off_duty: { label: "Off Duty", variant: "secondary" },
  on_leave: { label: "On Leave", variant: "destructive" },
};

export function RecentDoctors() {
  // Show first 4 doctors on the dashboard
  const doctors = MOCK_DOCTORS.slice(0, 4);

  return (
    <Card className="border-slate-200/90 shadow-xs flex flex-col h-full">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
            <UserCheck className="h-4 w-4" />
          </div>
          <div>
            <CardTitle className="text-base font-bold text-slate-900">
              Active Doctors
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Duty status & assigned department roster
            </CardDescription>
          </div>
        </div>

        <Link
          href="/doctors"
          className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1 group"
        >
          <span>View All</span>
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </CardHeader>

      <CardContent className="pt-1 flex-1">
        <div className="divide-y divide-slate-100">
          {doctors.map((doctor) => {
            const status = statusConfig[doctor.status];

            return (
              <div
                key={doctor.id}
                className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50/60 rounded-lg px-2 -mx-2 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar
                    src={doctor.avatarUrl}
                    fallback={doctor.initials}
                    size="md"
                  />
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
                      {doctor.name}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate flex items-center gap-1">
                      <Stethoscope className="h-3 w-3 text-slate-400" />
                      {doctor.specialty} • {doctor.officeRoom}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-bold text-slate-800">
                      {doctor.patientsCount}
                    </p>
                    <p className="text-[10px] text-slate-400">Patients</p>
                  </div>
                  <Badge variant={status.variant} className="text-[10px] px-2">
                    {status.label}
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

