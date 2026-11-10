"use client";

import * as React from "react";
import { Info, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MOCK_DOCTOR_WORKLOAD } from "@/lib/mock-data";
import { DoctorWorkload } from "@/lib/types";
import { cn } from "@/lib/utils";

export function PatientsPerDoctorChart() {
  const [activeItem, setActiveItem] = React.useState<DoctorWorkload | null>(null);

  return (
    <Card className="border-slate-200/90 shadow-xs flex flex-col h-full">
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
                Active patient caseload and clinical capacity utilization
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
        <div className="space-y-3.5">
          {MOCK_DOCTOR_WORKLOAD.map((item) => {
            const isHigh = item.utilizationPercent >= 88;
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
                      • {item.specialty}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-xs">
                      {item.activePatients}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      / {item.capacityLimit} pts
                    </span>
                    <span
                      className={cn(
                        "text-[10px] font-bold px-1.5 py-0.2 rounded",
                        isHigh
                          ? "bg-amber-100 text-amber-800"
                          : "bg-teal-100 text-teal-800"
                      )}
                    >
                      {item.utilizationPercent}%
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500 ease-out",
                      isHigh
                        ? "bg-gradient-to-r from-amber-500 to-amber-600"
                        : "bg-gradient-to-r from-teal-500 to-teal-600"
                    )}
                    style={{ width: `${item.utilizationPercent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic / active hint */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Info className="h-3.5 w-3.5 text-slate-400" />
            <span>Target ratio: 60-80 patients per senior physician</span>
          </div>
          <span className="font-medium text-teal-700">8 Senior Staff</span>
        </div>
      </CardContent>
    </Card>
  );
}
