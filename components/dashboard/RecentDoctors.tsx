import * as React from "react";
import Link from "next/link";
import { ArrowRight, Stethoscope, Building2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { MOCK_DOCTORS } from "@/lib/mock-data";

export function RecentDoctors() {
  const doctors = MOCK_DOCTORS.slice(0, 4);

  return (
    <Card className="border-slate-200/90 shadow-xs flex flex-col h-full">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
            <Stethoscope className="h-4 w-4" />
          </div>
          <div>
            <CardTitle className="text-base font-bold text-slate-900">
              Doctors Overview
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Registered physicians and assigned hospital
            </CardDescription>
          </div>
        </div>

        <Link
          href="/dashboard/doctors"
          className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1 group"
        >
          <span>View All</span>
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </CardHeader>

      <CardContent className="pt-1 flex-1">
        <div className="divide-y divide-slate-100">
          {doctors.map((doctor) => {
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
                      <span>{doctor.specialization}</span>
                      <span>&bull;</span>
                      <Building2 className="h-3 w-3 text-slate-400" />
                      <span className="truncate">{doctor.hospital}</span>
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="inline-flex items-center rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-teal-700 border border-teal-200">
                    {doctor.patientsCount} patients
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
