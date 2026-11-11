import client from "@/lib/axios";
import {
  AddPatientToDoctorPayload,
  ApiResponse,
  BackendDoctorRecord,
  BackendPatientRecord,
  CreateDoctorPayload,
  DoctorQueryParams,
  DoctorsListResponseData,
  PaginationMeta,
  UpdateDoctorPayload,
} from "@/lib/types";

export const getDoctors = async (
  params?: DoctorQueryParams
): Promise<ApiResponse<DoctorsListResponseData>> => {
  const response = await client.get("/api/doctors", { params });
  return response.data;
};

export const getDoctorById = async (
  doctorId: string
): Promise<ApiResponse<{ doctor: BackendDoctorRecord }>> => {
  const response = await client.get(`/api/doctors/${doctorId}`);
  return response.data;
};

export const createDoctor = async (
  data: CreateDoctorPayload
): Promise<ApiResponse<{ doctor: BackendDoctorRecord }>> => {
  const response = await client.post("/api/doctors", data);
  return response.data;
};

export const updateDoctor = async ({
  doctorId,
  data,
}: {
  doctorId: string;
  data: UpdateDoctorPayload;
}): Promise<ApiResponse<{ doctor: BackendDoctorRecord }>> => {
  const response = await client.put(`/api/doctors/${doctorId}`, data);
  return response.data;
};

export const deleteDoctor = async (
  doctorId: string
): Promise<ApiResponse<null>> => {
  const response = await client.delete(`/api/doctors/${doctorId}`);
  return response.data;
};

export const getDoctorPatients = async (
  doctorId: string,
  params?: {
    page?: number;
    limit?: number;
    search?: string;
    condition?: string;
    status?: string;
  }
): Promise<
  ApiResponse<{
    patients: BackendPatientRecord[];
    pagination: PaginationMeta;
    doctor: BackendDoctorRecord;
  }>
> => {
  const response = await client.get(`/api/doctors/${doctorId}/patients`, {
    params,
  });
  return response.data;
};

export const addPatientToDoctor = async ({
  doctorId,
  data,
}: {
  doctorId: string;
  data: AddPatientToDoctorPayload;
}): Promise<ApiResponse<{ patient: BackendPatientRecord }>> => {
  const response = await client.post(`/api/doctors/${doctorId}/patients`, data);
  return response.data;
};

export const deletePatientFromDoctor = async ({
  doctorId,
  patientId,
}: {
  doctorId: string;
  patientId: string;
}): Promise<ApiResponse<null>> => {
  const response = await client.delete(
    `/api/doctors/${doctorId}/patients/${patientId}`
  );
  return response.data;
};
