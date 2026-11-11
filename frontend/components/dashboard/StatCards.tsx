"use client";

import * as React from "react";
import {
  Stethoscope,
  Users,
  BarChart3,
  CalendarCheck,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { StatMetric } from "@/lib/types";
import { cn } from "@/lib/utils";

const iconMap = {
  Stethoscope: Stethoscope,
  Users: Users,
  BarChart3: BarChart3,
  CalendarCheck: CalendarCheck,
};

const themeStyles = {
  teal: {
    iconBg: "bg-teal-50 text-teal-600 ring-teal-500/10",
    badge: "text-teal-700 bg-teal-50/80 border-teal-200",
  },
  emerald: {
    iconBg: "bg-emerald-50 text-emerald-600 ring-emerald-500/10",
    badge: "text-emerald-700 bg-emerald-50/80 border-emerald-200",
  },
  sky: {
    iconBg: "bg-sky-50 text-sky-600 ring-sky-500/10",
    badge: "text-sky-700 bg-sky-50/80 border-sky-200",
  },
  amber: {
    iconBg: "bg-amber-50 text-amber-600 ring-amber-500/10",
    badge: "text-amber-700 bg-amber-50/80 border-amber-200",
  },
};

interface StatCardsProps {
  summary?: {
    totalDoctors: number;
    totalPatients: number;
    averagePatientsPerDoctor: number;
    recentDoctorsLast30Days: number;
    recentPatientsLast30Days: number;
  };
  isLoading?: boolean;
}

export function StatCards({ summary, isLoading }: StatCardsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {[1, 2, 3, 4].map((i) => (
          <Card
            key={i}
            className="p-5 border-slate-200/90 shadow-xs bg-white animate-pulse"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="h-4 w-24 bg-slate-200 rounded" />
              <div className="h-10 w-10 bg-slate-200 rounded-xl" />
            </div>
            <div className="h-8 w-20 bg-slate-200 rounded mb-2" />
            <div className="h-3 w-32 bg-slate-100 rounded" />
          </Card>
        ))}
      </div>
    );
  }

  const metrics: StatMetric[] = [
    {
      id: "stat-total-doctors",
      title: "Total Doctors",
      value: (summary?.totalDoctors ?? 0).toLocaleString(),
      changeRate: `+${summary?.recentDoctorsLast30Days ?? 0} new`,
      trend: "up",
      caption: "Active credentialed physicians in network",
      icon: "Stethoscope",
      colorScheme: "teal",
    },
    {
      id: "stat-total-patients",
      title: "Total Patients",
      value: (summary?.totalPatients ?? 0).toLocaleString(),
      changeRate: `+${summary?.recentPatientsLast30Days ?? 0} new`,
      trend: "up",
      caption: "Registered medical records across all departments",
      icon: "Users",
      colorScheme: "emerald",
    },
    {
      id: "stat-patients-per-doctor",
      title: "Patients Per Doctor",
      value: `${summary?.averagePatientsPerDoctor ?? 0}`,
      changeRate: "Calculated",
      trend: "up",
      caption: "Calculated patient ratio across all doctors",
      icon: "BarChart3",
      colorScheme: "sky",
    },
    {
      id: "stat-new-registrations",
      title: "30-Day Registrations",
      value: (summary?.recentPatientsLast30Days ?? 0).toLocaleString(),
      changeRate: "Active",
      trend: "up",
      caption: "Total patient intakes in the trailing 30 days",
      icon: "CalendarCheck",
      colorScheme: "amber",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {metrics.map((metric: StatMetric) => {
        const IconComponent =
          iconMap[metric.icon as keyof typeof iconMap] || TrendingUp;
        const style = themeStyles[metric.colorScheme] || themeStyles.teal;

        return (
          <Card
            key={metric.id}
            className="relative overflow-hidden border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 bg-white"
          >
            <div
              className={cn(
                "absolute inset-x-0 top-0 h-1 bg-gradient-to-r",
                metric.colorScheme === "teal" && "from-teal-500 to-teal-400",
                metric.colorScheme === "emerald" &&
                  "from-emerald-500 to-emerald-400",
                metric.colorScheme === "sky" && "from-sky-500 to-sky-400",
                metric.colorScheme === "amber" && "from-amber-500 to-amber-400"
              )}
            />

            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
                  {metric.title}
                </span>
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl ring-4 transition-transform",
                    style.iconBg
                  )}
                >
                  <IconComponent className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-2.5 flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {metric.value}
                </span>
                <span
                  className={cn(
                    "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-semibold border",
                    style.badge
                  )}
                >
                  {metric.changeRate}
                </span>
              </div>

              <p className="mt-2 text-xs text-slate-500 line-clamp-1">
                {metric.caption}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
