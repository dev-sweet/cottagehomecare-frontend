import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createPatient,
  deletePatient,
  getPatientById,
  getPatients,
  updatePatient,
} from "@/services/patient.services";
import {
  CreatePatientPayload,
  PatientQueryParams,
  UpdatePatientPayload,
} from "@/lib/types";

export const useGetPatients = (
  params?: PatientQueryParams,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ["patients", params],
    queryFn: () => getPatients(params),
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

export const useGetPatientById = (id: string) => {
  return useQuery({
    queryKey: ["patient", id],
    queryFn: () => getPatientById(id),
    enabled: !!id,
    select: (data) => data?.data?.patient,
  });
};

export const useCreatePatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePatientPayload) => createPatient(data),
    onSuccess: (response) => {
      toast.success(response?.message || "Patient registered successfully!");
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-analytics"] });
    },
  });
};

export const useUpdatePatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePatientPayload }) =>
      updatePatient({ id, data }),
    onSuccess: (response, variables) => {
      toast.success(response?.message || "Patient updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      queryClient.invalidateQueries({ queryKey: ["patient", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-analytics"] });
    },
  });
};

export const useDeletePatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePatient(id),
    onSuccess: (response) => {
      toast.success(response?.message || "Patient deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-analytics"] });
    },
  });
};

