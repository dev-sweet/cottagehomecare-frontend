import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  addPatientToDoctor,
  createDoctor,
  deleteDoctor,
  deletePatientFromDoctor,
  getDoctorById,
  getDoctorPatients,
  getDoctors,
  updateDoctor,
} from "@/services/doctor.services";
import {
  AddPatientToDoctorPayload,
  CreateDoctorPayload,
  DoctorQueryParams,
  UpdateDoctorPayload,
} from "@/lib/types";

export const useGetDoctors = (
  params?: DoctorQueryParams,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ["doctors", params],
    queryFn: () => getDoctors(params),
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

export const useGetDoctorById = (doctorId: string) => {
  return useQuery({
    queryKey: ["doctor", doctorId],
    queryFn: () => getDoctorById(doctorId),
    enabled: !!doctorId,
    select: (data) => data?.data?.doctor,
  });
};

export const useCreateDoctor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateDoctorPayload) => createDoctor(data),
    onSuccess: (response) => {
      toast.success(response?.message || "Doctor created successfully!");
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-analytics"] });
    },
  });
};

export const useUpdateDoctor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      doctorId,
      data,
    }: {
      doctorId: string;
      data: UpdateDoctorPayload;
    }) => updateDoctor({ doctorId, data }),
    onSuccess: (response, variables) => {
      toast.success(response?.message || "Doctor updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      queryClient.invalidateQueries({ queryKey: ["doctor", variables.doctorId] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-analytics"] });
    },
  });
};

export const useDeleteDoctor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (doctorId: string) => deleteDoctor(doctorId),
    onSuccess: (response) => {
      toast.success(response?.message || "Doctor deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-analytics"] });
    },
  });
};

export const useGetDoctorPatients = (
  doctorId: string,
  params?: {
    page?: number;
    limit?: number;
    search?: string;
    condition?: string;
    status?: string;
  }
) => {
  return useQuery({
    queryKey: ["doctor-patients", doctorId, params],
    queryFn: () => getDoctorPatients(doctorId, params),
    enabled: !!doctorId,
    select: (data) => data?.data,
  });
};

export const useAddPatientToDoctor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      doctorId,
      data,
    }: {
      doctorId: string;
      data: AddPatientToDoctorPayload;
    }) => addPatientToDoctor({ doctorId, data }),
    onSuccess: (response, variables) => {
      toast.success(response?.message || "Patient added to doctor successfully!");
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      queryClient.invalidateQueries({
        queryKey: ["doctor-patients", variables.doctorId],
      });
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-analytics"] });
    },
  });
};

export const useDeletePatientFromDoctor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      doctorId,
      patientId,
    }: {
      doctorId: string;
      patientId: string;
    }) => deletePatientFromDoctor({ doctorId, patientId }),
    onSuccess: (response, variables) => {
      toast.success(
        response?.message || "Patient removed from doctor successfully!"
      );
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      queryClient.invalidateQueries({
        queryKey: ["doctor-patients", variables.doctorId],
      });
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-analytics"] });
    },
  });
};

