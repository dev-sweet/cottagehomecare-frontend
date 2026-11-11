import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { API_BASE_URL } from "./api-url";

interface ApiErrorData {
  success?: boolean;
  message?: string;
  errors?: string[] | Array<{ message?: string; msg?: string }> | string;
}

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach Bearer token to outgoing requests
client.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("doctor_tracker_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Centralized Response & Error Handling
client.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorData>) => {
    const status = error.response?.status;
    const data = error.response?.data;

    // 1. Session expiration / Unauthorized
    if (status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("doctor_tracker_token");
      localStorage.removeItem("doctor_tracker_user");

      const isAuthPage =
        window.location.pathname.startsWith("/auth/login") ||
        window.location.pathname.startsWith("/auth/register");

      if (!isAuthPage) {
        toast.error("Session expired. Please log in again.");
        window.location.href = "/auth/login";
      }
      return Promise.reject(error);
    }

    // 2. Extract error message from API response or network
    let message = data?.message;

    if (Array.isArray(data?.errors) && data.errors.length > 0) {
      const first = data.errors[0];
      message = typeof first === "string" ? first : first.msg || first.message || message;
    }

    if (!error.response) {
      message = "Network error: Unable to connect to the server.";
    }

    // 3. Display user-friendly notification
    if (typeof window !== "undefined") {
      toast.error(message || "An unexpected error occurred. Please try again.");
    }

    return Promise.reject(error);
  }
);

export default client;
