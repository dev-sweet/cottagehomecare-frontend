import client from "@/lib/axios";
import {
  ApiResponse,
  BackendPatientRecord,
  CreatePatientPayload,
  PatientQueryParams,
  PatientsListResponseData,
  UpdatePatientPayload,
} from "@/lib/types";

export const getPatients = async (
  params?: PatientQueryParams
): Promise<ApiResponse<PatientsListResponseData>> => {
  const response = await client.get("/api/patients", { params });
  return response.data;
};

export const getPatientById = async (
  id: string
): Promise<ApiResponse<{ patient: BackendPatientRecord }>> => {
  const response = await client.get(`/api/patients/${id}`);
  return response.data;
};

export const createPatient = async (
  data: CreatePatientPayload
): Promise<ApiResponse<{ patient: BackendPatientRecord }>> => {
  const response = await client.post("/api/patients", data);
  return response.data;
};

export const updatePatient = async ({
  id,
  data,
}: {
  id: string;
  data: UpdatePatientPayload;
}): Promise<ApiResponse<{ patient: BackendPatientRecord }>> => {
  const response = await client.put(`/api/patients/${id}`, data);
  return response.data;
};

export const deletePatient = async (
  id: string
): Promise<ApiResponse<null>> => {
  const response = await client.delete(`/api/patients/${id}`);
  return response.data;
};
