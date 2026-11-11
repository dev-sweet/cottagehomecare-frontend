"use client";

import * as React from "react";
import { BarChart3, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { DoctorWorkload } from "@/lib/types";
import { cn } from "@/lib/utils";

interface PatientsPerDoctorChartProps {
  items?: Array<{
    doctorId: string;
    name: string;
    specialization: string;
    hospital: string;
    patientCount: number;
  }>;
  isLoading?: boolean;
}

export function PatientsPerDoctorChart({
  items,
  isLoading,
}: PatientsPerDoctorChartProps) {
  const [activeItem, setActiveItem] = React.useState<DoctorWorkload | null>(null);

  const workloadData: DoctorWorkload[] = React.useMemo(() => {
    if (!items || items.length === 0) return [];
    const maxPatientCount = Math.max(...items.map((i) => i.patientCount), 1);
    const capacityLimit = Math.max(10, Math.ceil(maxPatientCount * 1.5));

    return items.slice(0, 6).map((item) => {
      const utilizationPercent = Math.min(
        100,
        Math.round((item.patientCount / capacityLimit) * 100)
      );
      return {
        id: item.doctorId,
        doctorName: item.name,
        specialization: item.specialization,
        hospital: item.hospital,
        patientCount: item.patientCount,
        capacityLimit,
        utilizationPercent,
      };
    });
  }, [items]);

  return (
    <Card className="border-slate-200/90 shadow-xs flex flex-col h-full bg-white">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
              <BarChart3 className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-slate-900">
                Patients Per Doctor
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Active patient volume and allocation per physician
              </CardDescription>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="inline-block h-2 w-2 rounded-full bg-teal-500" />
            <span>Optimal</span>
            <span className="inline-block h-2 w-2 rounded-full bg-amber-500 ml-2" />
            <span>High Load</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-2 flex-1 flex flex-col justify-between">
        {isLoading ? (
          <div className="space-y-3 py-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-14 rounded-lg bg-slate-100 animate-pulse"
              />
            ))}
          </div>
        ) : workloadData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center my-auto">
            <Users className="h-10 w-10 text-slate-300 mb-2" />
            <p className="text-sm font-medium text-slate-700">
              No Patient Allocations Yet
            </p>
            <p className="text-xs text-slate-400 max-w-xs mt-1">
              Add patients and assign them to doctors to visualize doctor workload.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {workloadData.map((item) => {
              const isHigh = item.utilizationPercent >= 80;
              const isHovered = activeItem?.id === item.id;

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveItem(item)}
                  onMouseLeave={() => setActiveItem(null)}
                  className={cn(
                    "p-2.5 rounded-lg border transition-all duration-150 cursor-pointer",
                    isHovered
                      ? "bg-teal-50/50 border-teal-200 shadow-2xs"
                      : "bg-slate-50/50 border-slate-100 hover:bg-slate-50"
                  )}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-800">
                        {item.doctorName}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        ({item.specialization})
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-xs">
                        {item.patientCount} patients
                      </span>
                      <span
                        className={cn(
                          "text-[10px] font-semibold px-1.5 py-0.5 rounded",
                          isHigh
                            ? "bg-amber-100 text-amber-700"
                            : "bg-teal-100 text-teal-700"
                        )}
                      >
                        {item.utilizationPercent}%
                      </span>
                    </div>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="h-2 w-full bg-slate-200/80 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        isHigh
                          ? "bg-gradient-to-r from-amber-400 to-amber-500"
                          : "bg-gradient-to-r from-teal-400 to-teal-500"
                      )}
                      style={{
                        width: `${Math.max(item.utilizationPercent, 4)}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Real-time Doctor Workload Ratio</span>
          <span className="font-medium text-slate-500">
            {workloadData.length} Doctors Displayed
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
