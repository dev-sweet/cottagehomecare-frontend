import { useQuery } from "@tanstack/react-query";
import { getDashboardAnalytics } from "@/services/dashboard.services";
import { DashboardQueryParams } from "@/lib/types";

export const useDashboardAnalytics = (
  params?: DashboardQueryParams,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ["dashboard-analytics", params],
    queryFn: () => getDashboardAnalytics(params),
    placeholderData: (prev) => prev,
    select: (data) => data?.data,
    enabled:
      typeof window !== "undefined"
        ? !!localStorage.getItem("doctor_tracker_token") &&
          (options?.enabled ?? true)
        : (options?.enabled ?? false),
    retry: 1,
  });
};
