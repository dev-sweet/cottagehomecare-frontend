"use client";

import * as React from "react";
import { TrendingUp, Calendar, ArrowUpRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { MOCK_REGISTRATION_TRENDS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function RegistrationTrendsChart() {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [selectedRange, setSelectedRange] = React.useState<"6M" | "Q3" | "YTD">("6M");

  const data = MOCK_REGISTRATION_TRENDS;
  const maxRegistrations = 400; // scale reference
  const maxConsultations = 800; // scale reference

  // Chart SVG Dimensions
  const width = 600;
  const height = 220;
  const paddingX = 40;
  const paddingY = 30;

  const points = data.map((d, i) => {
    const x = paddingX + (i * (width - paddingX * 2)) / (data.length - 1);
    // scale registrations to chart height
    const yReg =
      height -
      paddingY -
      (d.registrations / maxRegistrations) * (height - paddingY * 2);
    // scale consultations
    const yCons =
      height -
      paddingY -
      (d.consultations / maxConsultations) * (height - paddingY * 2);

    return { x, yReg, yCons, ...d };
  });

  // Construct SVG paths
  const regPath = points.reduce(
    (acc, p, i) => `${acc} ${i === 0 ? "M" : "L"} ${p.x} ${p.yReg}`,
    ""
  );
  const regArea = `${regPath} L ${points[points.length - 1].x} ${
    height - paddingY
  } L ${points[0].x} ${height - paddingY} Z`;

  const consPath = points.reduce(
    (acc, p, i) => `${acc} ${i === 0 ? "M" : "L"} ${p.x} ${p.yCons}`,
    ""
  );

  return (
    <Card className="border-slate-200/90 shadow-xs flex flex-col h-full">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-slate-900">
                Patient Registration Trends
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Monthly intake vs inpatient & outpatient clinical consultations
              </CardDescription>
            </div>
          </div>

          {/* Time range pills */}
          <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1 self-start sm:self-auto">
            {(["6M", "Q3", "YTD"] as const).map((range) => (
              <button
                key={range}
                onClick={() => setSelectedRange(range)}
                className={cn(
                  "px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer",
                  selectedRange === range
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                )}
              >
                {range === "6M" ? "Last 6 Mo" : range === "Q3" ? "Q3 - Q4" : "Year to Date"}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-2 flex-1 flex flex-col justify-between">
        {/* Metric Badges */}
        <div className="flex items-center gap-6 text-xs mb-2">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-teal-500" />
            <span className="text-slate-500">New Registrations</span>
            <span className="font-bold text-slate-800">+78.9%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
            <span className="text-slate-500">Total Consultations</span>
            <span className="font-bold text-slate-800">+69.0%</span>
          </div>
        </div>

        {/* SVG Interactive Chart */}
        <div className="relative w-full aspect-[21/9] min-h-[190px]">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-full overflow-visible"
          >
            <defs>
              <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0d9488" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#0d9488" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            {[0.25, 0.5, 0.75, 1].map((ratio) => {
              const y = paddingY + ratio * (height - paddingY * 2);
              return (
                <line
                  key={ratio}
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
              );
            })}

            {/* Registration Area & Line */}
            <path d={regArea} fill="url(#tealGrad)" />
            <path
              d={regPath}
              fill="none"
              stroke="#0d9488"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Consultations Line */}
            <path
              d={consPath}
              fill="none"
              stroke="#6366f1"
              strokeWidth="2"
              strokeDasharray="5 3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data Points */}
            {points.map((p, i) => {
              const isHovered = hoveredIndex === i;
              return (
                <g key={p.month}>
                  {/* Vertical guide when hovered */}
                  {isHovered && (
                    <line
                      x1={p.x}
                      y1={paddingY}
                      x2={p.x}
                      y2={height - paddingY}
                      stroke="#94a3b8"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                    />
                  )}

                  {/* Consultation point */}
                  <circle
                    cx={p.x}
                    cy={p.yCons}
                    r={isHovered ? 5 : 3.5}
                    fill="#6366f1"
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="transition-all"
                  />

                  {/* Registration point */}
                  <circle
                    cx={p.x}
                    cy={p.yReg}
                    r={isHovered ? 6 : 4}
                    fill="#0d9488"
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="transition-all cursor-pointer"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />

                  {/* X Axis label */}
                  <text
                    x={p.x}
                    y={height - 8}
                    textAnchor="middle"
                    className="text-[11px] fill-slate-400 font-medium select-none"
                  >
                    {p.month}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Hover Tooltip Overlay */}
          {hoveredIndex !== null && (
            <div
              className="absolute z-10 pointer-events-none -translate-x-1/2 rounded-lg bg-slate-900 text-white px-3 py-2 text-xs shadow-xl transition-all"
              style={{
                left: `${(points[hoveredIndex].x / width) * 100}%`,
                top: "10%",
              }}
            >
              <p className="font-semibold text-slate-200 border-b border-slate-700 pb-1 mb-1">
                {points[hoveredIndex].month} 2026
              </p>
              <div className="flex items-center justify-between gap-3 text-[11px]">
                <span className="text-teal-400 font-medium">New Patients:</span>
                <span className="font-bold">{points[hoveredIndex].registrations}</span>
              </div>
              <div className="flex items-center justify-between gap-3 text-[11px]">
                <span className="text-indigo-300 font-medium">Consultations:</span>
                <span className="font-bold">{points[hoveredIndex].consultations}</span>
              </div>
            </div>
          )}
        </div>

        {/* Chart Footer Insight */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <span>Highest intake volume recorded in October & November</span>
          </div>
          <div className="flex items-center gap-1 text-emerald-700 font-medium">
            <ArrowUpRight className="h-3.5 w-3.5" />
            <span>+14.8% Monthly Average</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

