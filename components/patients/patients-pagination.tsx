"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PatientsPaginationProps {
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  itemsPerPage?: number;
}

export function PatientsPagination({
  currentPage = 1,
  totalPages = 285,
  totalItems = 2845,
  itemsPerPage = 10,
}: PatientsPaginationProps) {
  const [activePage, setActivePage] = React.useState(currentPage);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-3 px-2 text-xs text-slate-500">
      <div className="flex items-center gap-2">
        <span>
          Showing{" "}
          <strong className="font-semibold text-slate-800">
            {(activePage - 1) * itemsPerPage + 1}
          </strong>{" "}
          to{" "}
          <strong className="font-semibold text-slate-800">
            {Math.min(activePage * itemsPerPage, totalItems)}
          </strong>{" "}
          of{" "}
          <strong className="font-semibold text-slate-800">
            {totalItems.toLocaleString()}
          </strong>{" "}
          patients
        </span>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <Button
          variant="outline"
          size="sm"
          className="h-8 px-2.5 text-xs text-slate-600 gap-1"
          disabled={activePage === 1}
          onClick={() => setActivePage((p) => Math.max(1, p - 1))}
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Previous</span>
        </Button>

        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              onClick={() => setActivePage(page)}
              className={cn(
                "h-8 w-8 rounded-lg text-xs font-semibold transition-colors cursor-pointer",
                activePage === page
                  ? "bg-teal-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-100"
              )}
            >
              {page}
            </button>
          ))}
          <span className="px-1 text-slate-400">...</span>
          <button
            onClick={() => setActivePage(totalPages)}
            className={cn(
              "h-8 px-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer",
              activePage === totalPages
                ? "bg-teal-600 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            {totalPages}
          </button>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="h-8 px-2.5 text-xs text-slate-600 gap-1"
          disabled={activePage === totalPages}
          onClick={() => setActivePage((p) => Math.min(totalPages, p + 1))}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}

