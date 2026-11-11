import client from "@/lib/axios";
import { ApiResponse, DashboardAnalyticsData, DashboardQueryParams } from "@/lib/types";

export const getDashboardAnalytics = async (
  params?: DashboardQueryParams
): Promise<ApiResponse<DashboardAnalyticsData>> => {
  const response = await client.get("/api/dashboard/analytics", { params });
  return response.data;
};

