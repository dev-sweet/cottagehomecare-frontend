import * as React from "react";
import Link from "next/link";
import { ArrowRight, Users, HeartPulse } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { Patient } from "@/lib/types";

interface RecentPatientsProps {
  patients?: Patient[];
  isLoading?: boolean;
}

export function RecentPatients({ patients, isLoading }: RecentPatientsProps) {
  const displayPatients = (patients || []).slice(0, 4);

  return (
    <Card className="border-slate-200/90 shadow-xs flex flex-col h-full bg-white">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <Users className="h-4 w-4" />
          </div>
          <div>
            <CardTitle className="text-base font-bold text-slate-900">
              Patients Overview
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Recent patient admissions & conditions
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

      <CardContent className="pt-1 flex-1 flex flex-col justify-between">
        {isLoading ? (
          <div className="space-y-3 py-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-12 bg-slate-100 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : displayPatients.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center my-auto">
            <Users className="h-8 w-8 text-slate-300 mb-2" />
            <p className="text-sm font-medium text-slate-700">
              No Registered Patients
            </p>
            <p className="text-xs text-slate-400 max-w-xs mt-1">
              Patients allocated to doctors will show up here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {displayPatients.map((patient) => {
              return (
                <div
                  key={patient.id}
                  className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50/60 rounded-lg px-2 -mx-2 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold">
                      {patient.name
                        ? patient.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()
                        : "PT"}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-semibold text-slate-900 truncate">
                        {patient.name}
                      </span>
                      <span className="text-[11px] text-slate-500 truncate">
                        Dr: {patient.doctorName}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <HeartPulse className="h-3 w-3" />
                      <span className="truncate max-w-[120px]">
                        {patient.patientCondition}
                      </span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Synced directly with backend</span>
          <span className="font-medium text-slate-600">
            {displayPatients.length} patients shown
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
