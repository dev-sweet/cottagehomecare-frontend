"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  totalItems: number;
  itemsPerPage?: number;
  itemLabel?: string;
  onPageChange?: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage = 1,
  totalPages,
  totalItems,
  itemsPerPage = 10,
  itemLabel = "items",
  onPageChange,
  className,
}: PaginationProps) {
  const [activePage, setActivePage] = React.useState(currentPage);

  const calculatedTotalPages =
    totalPages || Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const handlePageChange = (page: number) => {
    setActivePage(page);
    onPageChange?.(page);
  };

  const startItem = totalItems === 0 ? 0 : (activePage - 1) * itemsPerPage + 1;
  const endItem = Math.min(activePage * itemsPerPage, totalItems);

  // Generate accessible page items with ellipses when there are many pages
  const getPageNumbers = () => {
    if (calculatedTotalPages <= 7) {
      return Array.from({ length: calculatedTotalPages }, (_, i) => i + 1);
    }
    if (activePage <= 4) {
      return [1, 2, 3, 4, 5, "...", calculatedTotalPages];
    }
    if (activePage >= calculatedTotalPages - 3) {
      return [
        1,
        "...",
        calculatedTotalPages - 4,
        calculatedTotalPages - 3,
        calculatedTotalPages - 2,
        calculatedTotalPages - 1,
        calculatedTotalPages,
      ];
    }
    return [
      1,
      "...",
      activePage - 1,
      activePage,
      activePage + 1,
      "...",
      calculatedTotalPages,
    ];
  };

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-center justify-between gap-4 py-3 px-2 text-xs text-slate-500",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <span>
          Showing{" "}
          <strong className="font-semibold text-slate-800">
            {startItem}
          </strong>{" "}
          to{" "}
          <strong className="font-semibold text-slate-800">
            {endItem}
          </strong>{" "}
          of{" "}
          <strong className="font-semibold text-slate-800">
            {totalItems.toLocaleString()}
          </strong>{" "}
          {itemLabel}
        </span>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <Button
          variant="outline"
          size="sm"
          className="h-8 px-2.5 text-xs text-slate-600 gap-1 cursor-pointer"
          disabled={activePage <= 1}
          onClick={() => handlePageChange(Math.max(1, activePage - 1))}
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Previous</span>
        </Button>

        <div className="flex items-center gap-1">
          {getPageNumbers().map((pageItem, index) => {
            if (pageItem === "...") {
              return (
                <span key={`ellipsis-${index}`} className="px-1 text-slate-400">
                  ...
                </span>
              );
            }
            const pageNum = pageItem as number;
            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={cn(
                  "h-8 min-w-[32px] px-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer",
                  activePage === pageNum
                    ? "bg-teal-600 text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100"
                )}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <Button
          variant="outline"
          size="sm"
          className="h-8 px-2.5 text-xs text-slate-600 gap-1 cursor-pointer"
          disabled={activePage >= calculatedTotalPages}
          onClick={() =>
            handlePageChange(Math.min(calculatedTotalPages, activePage + 1))
          }
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}

