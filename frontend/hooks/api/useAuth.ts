import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "@/services/auth.services";
import { LoginPayload, RegisterPayload } from "@/lib/types";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginPayload) => loginUser(payload),
    onSuccess: (response) => {
      if (response?.data?.accessToken && typeof window !== "undefined") {
        localStorage.setItem("doctor_tracker_token", response.data.accessToken);
        localStorage.setItem(
          "doctor_tracker_user",
          JSON.stringify(response.data.user)
        );
      }
      toast.success(response?.message || "Login successful!");
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
    onError: (error: unknown) => {
      console.error("Login failed:", error);
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => registerUser(payload),
    onSuccess: (response) => {
      if (response?.data?.accessToken && typeof window !== "undefined") {
        localStorage.setItem("doctor_tracker_token", response.data.accessToken);
        localStorage.setItem(
          "doctor_tracker_user",
          JSON.stringify(response.data.user)
        );
      }
      toast.success(response?.message || "Registration successful!");
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
    onError: (error: unknown) => {
      console.error("Registration failed:", error);
    },
  });
};

export const useCurrentUser = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
    select: (data) => data?.data?.user,
    enabled:
      typeof window !== "undefined"
        ? !!localStorage.getItem("doctor_tracker_token") &&
          (options?.enabled ?? true)
        : (options?.enabled ?? false),
    retry: false,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => logoutUser(),
    onSettled: () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("doctor_tracker_token");
        localStorage.removeItem("doctor_tracker_user");
      }
      queryClient.clear();
      toast.success("Logged out successfully");
      if (typeof window !== "undefined") {
        window.location.assign("/auth/login");
      }
    },
  });
};
