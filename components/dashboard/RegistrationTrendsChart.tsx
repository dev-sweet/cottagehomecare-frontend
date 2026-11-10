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
import { MOCK_REGISTRATION_TRENDS } from "@/lib/mock-data";

export function RegistrationTrendsChart() {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  const data = MOCK_REGISTRATION_TRENDS;
  const maxRegistrations = 400;

  const width = 600;
  const height = 220;
  const paddingX = 40;
  const paddingY = 30;

  const points = data.map((d, i) => {
    const x = paddingX + (i * (width - paddingX * 2)) / (data.length - 1);
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
  const regArea = `${regPath} L ${points[points.length - 1].x} ${
    height - paddingY
  } L ${points[0].x} ${height - paddingY} Z`;

  return (
    <Card className="border-slate-200/90 shadow-xs flex flex-col h-full">
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
                Monthly patient registration volume over time
              </CardDescription>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <span className="h-2.5 w-2.5 rounded-full bg-teal-600 inline-block" />
            <span>Monthly Registrations</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-2 flex-1 flex flex-col justify-between">
        {/* SVG Chart */}
        <div className="relative w-full aspect-[21/9] min-h-[190px]">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-full overflow-visible"
          >
            <defs>
              <linearGradient id="regGrad" x1="0" y1="0" x2="0" y2="1">
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

            {/* Area & Line */}
            <path d={regArea} fill="url(#regGrad)" />
            <path
              d={regPath}
              fill="none"
              stroke="#0d9488"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data Points */}
            {points.map((p, i) => {
              const isHovered = hoveredIndex === i;
              return (
                <g key={p.date}>
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

                  <text
                    x={p.x}
                    y={height - 8}
                    textAnchor="middle"
                    className="text-[11px] fill-slate-400 font-medium select-none"
                  >
                    {p.date.split(" ")[0]}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Tooltip */}
          {hoveredIndex !== null && (
            <div
              className="absolute z-10 pointer-events-none -translate-x-1/2 rounded-lg bg-slate-900 text-white px-3 py-2 text-xs shadow-xl transition-all"
              style={{
                left: `${(points[hoveredIndex].x / width) * 100}%`,
                top: "10%",
              }}
            >
              <p className="font-semibold text-slate-200 border-b border-slate-700 pb-1 mb-1">
                {points[hoveredIndex].date}
              </p>
              <div className="flex items-center justify-between gap-3 text-[11px]">
                <span className="text-teal-400 font-medium">New Registrations:</span>
                <span className="font-bold">{points[hoveredIndex].newRegistrations}</span>
              </div>
              <div className="flex items-center justify-between gap-3 text-[11px]">
                <span className="text-slate-400 font-medium">Cumulative Total:</span>
                <span className="font-bold">{points[hoveredIndex].totalCumulative}</span>
              </div>
            </div>
          )}
        </div>

        {/* Chart Footer Insight */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <span>Consistent upward trend in monthly intake</span>
          </div>
          <div className="flex items-center gap-1 text-emerald-700 font-medium">
            <ArrowUpRight className="h-3.5 w-3.5" />
            <span>+14.2% Growth Rate</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
