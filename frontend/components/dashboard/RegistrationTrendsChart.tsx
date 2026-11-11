"use client";

import * as React from "react";
import { TrendingUp, Calendar, ArrowUpRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { RegistrationTrendPoint } from "@/lib/types";

interface RegistrationTrendsChartProps {
  trends?: Array<{ date: string; count: number }>;
  isLoading?: boolean;
}

export function RegistrationTrendsChart({
  trends,
  isLoading,
}: RegistrationTrendsChartProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  const data: RegistrationTrendPoint[] = React.useMemo(() => {
    if (trends && trends.length > 0) {
      let cumulative = 0;
      return trends.map((t) => {
        cumulative += t.count;
        return {
          date: t.date,
          newRegistrations: t.count,
          totalCumulative: cumulative,
        };
      });
    }
    return [];
  }, [trends]);

  const maxRegistrations = React.useMemo(() => {
    if (data.length === 0) return 10;
    const maxVal = Math.max(...data.map((d) => d.newRegistrations), 5);
    return Math.ceil(maxVal * 1.25);
  }, [data]);

  const width = 600;
  const height = 220;
  const paddingX = 40;
  const paddingY = 30;

  const points = data.map((d, i) => {
    const x =
      data.length > 1
        ? paddingX + (i * (width - paddingX * 2)) / (data.length - 1)
        : width / 2;
    const yReg =
      height -
      paddingY -
      (d.newRegistrations / maxRegistrations) * (height - paddingY * 2);

    return { x, yReg, ...d };
  });

  const regPath = points.reduce(
    (acc, p, i) => `${acc} ${i === 0 ? "M" : "L"} ${p.x} ${p.yReg}`,
    ""
  );
  const regArea =
    points.length > 1
      ? `${regPath} L ${points[points.length - 1].x} ${
          height - paddingY
        } L ${points[0].x} ${height - paddingY} Z`
      : "";

  const activePoint =
    hoveredIndex !== null && points[hoveredIndex]
      ? points[hoveredIndex]
      : points.length > 0
      ? points[points.length - 1]
      : null;

  const totalRegistered = data.reduce((sum, d) => sum + d.newRegistrations, 0);

  return (
    <Card className="border-slate-200/90 shadow-xs flex flex-col h-full bg-white">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-slate-900">
                Date-Based Patient Trends
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Patient registration volume over time from database
              </CardDescription>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <span className="h-2.5 w-2.5 rounded-full bg-teal-600 inline-block" />
            <span>Registrations</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-2 flex-1 flex flex-col justify-between">
        {isLoading ? (
          <div className="h-[220px] w-full flex items-center justify-center bg-slate-50/50 rounded-xl animate-pulse">
            <div className="h-4 w-32 bg-slate-200 rounded" />
          </div>
        ) : points.length === 0 ? (
          <div className="h-[220px] w-full flex flex-col items-center justify-center text-center p-6 my-auto">
            <Calendar className="h-10 w-10 text-slate-300 mb-2" />
            <p className="text-sm font-medium text-slate-700">
              No Registration Records Found
            </p>
            <p className="text-xs text-slate-400 max-w-xs mt-1">
              Add patients or record admissions to view the date-based activity timeline.
            </p>
          </div>
        ) : (
          <>
            {/* Hover Tooltip / Stats Banner */}
            <div className="flex items-center justify-between bg-slate-50/80 px-3 py-1.5 rounded-lg border border-slate-100 text-xs mb-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                <span className="font-medium text-slate-600">
                  {activePoint ? activePoint.date : "Overview"}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-slate-400">Intakes: </span>
                  <span className="font-bold text-teal-700">
                    {activePoint ? activePoint.newRegistrations : 0}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400">Cumulative: </span>
                  <span className="font-bold text-slate-800">
                    {activePoint ? activePoint.totalCumulative : totalRegistered}
                  </span>
                </div>
              </div>
            </div>

            {/* SVG Interactive Chart */}
            <div className="relative w-full overflow-hidden">
              <svg
                viewBox={`0 0 ${width} ${height}`}
                className="w-full h-auto overflow-visible"
              >
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0d9488" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#0d9488" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Grid lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
                  const y = paddingY + pct * (height - paddingY * 2);
                  const labelVal = Math.round(maxRegistrations * (1 - pct));
                  return (
                    <g key={i}>
                      <line
                        x1={paddingX}
                        y1={y}
                        x2={width - paddingX}
                        y2={y}
                        stroke="#f1f5f9"
                        strokeDasharray="4 4"
                        strokeWidth="1"
                      />
                      <text
                        x={paddingX - 8}
                        y={y + 3}
                        textAnchor="end"
                        fontSize="9"
                        fill="#94a3b8"
                      >
                        {labelVal}
                      </text>
                    </g>
                  );
                })}

                {/* Area Gradient */}
                {regArea && <path d={regArea} fill="url(#areaGrad)" />}

                {/* Solid Line */}
                {regPath && (
                  <path
                    d={regPath}
                    fill="none"
                    stroke="#0d9488"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}

                {/* Data Points */}
                {points.map((p, i) => (
                  <g
                    key={i}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <circle
                      cx={p.x}
                      cy={p.yReg}
                      r={hoveredIndex === i ? 6 : 4}
                      fill="#ffffff"
                      stroke="#0d9488"
                      strokeWidth={hoveredIndex === i ? 3 : 2}
                      className="transition-all duration-150"
                    />
                    <text
                      x={p.x}
                      y={height - 8}
                      textAnchor="middle"
                      fontSize="9"
                      fill={hoveredIndex === i ? "#0f172a" : "#64748b"}
                      fontWeight={hoveredIndex === i ? "600" : "400"}
                    >
                      {p.date.length > 7 ? p.date.slice(5) : p.date}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </>
        )}

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Real Database Analytics</span>
          <span className="font-medium text-slate-600">
            {totalRegistered} total intakes registered
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
