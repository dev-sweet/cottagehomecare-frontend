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
import { Doctor } from "@/lib/types";

interface RecentDoctorsProps {
  doctors?: Doctor[];
  isLoading?: boolean;
}

export function RecentDoctors({ doctors, isLoading }: RecentDoctorsProps) {
  const displayDoctors = (doctors || []).slice(0, 4);

  return (
    <Card className="border-slate-200/90 shadow-xs flex flex-col h-full bg-white">
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
          href="/doctors"
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
        ) : displayDoctors.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center my-auto">
            <Stethoscope className="h-8 w-8 text-slate-300 mb-2" />
            <p className="text-sm font-medium text-slate-700">
              No Registered Doctors
            </p>
            <p className="text-xs text-slate-400 max-w-xs mt-1">
              Create a doctor in the Doctors section to view them here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {displayDoctors.map((doctor) => {
              return (
                <div
                  key={doctor.id}
                  className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50/60 rounded-lg px-2 -mx-2 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar
                      src={doctor.avatarUrl}
                      fallback={doctor.initials}
                      size="sm"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-semibold text-slate-900 truncate">
                        {doctor.name}
                      </span>
                      <span className="text-[11px] text-teal-700 font-medium truncate">
                        {doctor.specialization}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-500">
                      <Building2 className="h-3 w-3 text-slate-400" />
                      <span className="truncate max-w-[140px]">
                        {doctor.hospital}
                      </span>
                    </div>
                    <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                      {doctor.patientsCount} pts
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
            {displayDoctors.length} doctors shown
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
