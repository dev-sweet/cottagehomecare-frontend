import * as React from "react";
import {
  Stethoscope,
  Users,
  BarChart3,
  CalendarCheck,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { MOCK_STAT_METRICS } from "@/lib/mock-data";
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

export function StatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {MOCK_STAT_METRICS.map((metric: StatMetric) => {
        const IconComponent =
          iconMap[metric.icon as keyof typeof iconMap] || TrendingUp;
        const style = themeStyles[metric.colorScheme] || themeStyles.teal;

        return (
          <Card
            key={metric.id}
            className="relative overflow-hidden border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200"
          >
            <div
              className={cn(
                "absolute inset-x-0 top-0 h-1 bg-gradient-to-r",
                metric.colorScheme === "teal" && "from-teal-500 to-teal-400",
                metric.colorScheme === "emerald" && "from-emerald-500 to-emerald-400",
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

              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold tracking-tight text-slate-900">
                  {metric.value}
                </span>
                <span
                  className={cn(
                    "inline-flex items-center gap-0.5 rounded-full border px-2 py-0.5 text-xs font-medium",
                    style.badge
                  )}
                >
                  {metric.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : metric.trend === "down" ? (
                    <ArrowDownRight className="h-3 w-3" />
                  ) : null}
                  {metric.changeRate}
                </span>
              </div>

              <p className="mt-2 text-xs text-slate-500 truncate">
                {metric.caption}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
