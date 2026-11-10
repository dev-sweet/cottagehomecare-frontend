import * as React from "react";
import Link from "next/link";
import { ArrowRight, Users, Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { MOCK_PATIENTS } from "@/lib/mock-data";

export function RecentPatients() {
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
              Recent Patients
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Latest registered patients and assigned doctors
            </CardDescription>
          </div>
        </div>

        <Link
          href="/dashboard/patients"
          className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1 group"
        >
          <span>View All</span>
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </CardHeader>

      <CardContent className="pt-1 flex-1">
        <div className="divide-y divide-slate-100">
          {patients.map((patient) => {
            return (
              <div
                key={patient.id}
                className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50/60 rounded-lg px-2 -mx-2 transition-colors"
              >
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
                      {patient.name}
                    </span>
                    <Badge variant="outline" className="text-[10px] text-teal-700 bg-teal-50/40 border-teal-200">
                      {patient.patientCondition}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    Attending: <span className="font-medium text-slate-700">{patient.doctorName}</span> &bull; {patient.hospital}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-slate-400 shrink-0">
                  <Calendar className="h-3 w-3" />
                  <span>{patient.registeredDate}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
