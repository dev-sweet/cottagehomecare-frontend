export interface DoctorPatientSummary {
  id: string;
  name: string;
  condition: string;
  registeredDate: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  hospital: string;
  phone: string;
  email: string;
  registeredDate: string;
  patientsCount: number;
  avatarUrl: string;
  initials: string;
  patients: DoctorPatientSummary[];
}

export interface Patient {
  id: string;
  name: string;
  patientCondition: string;
  conditionCategory: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialization: string;
  hospital: string;
  registeredDate: string;
  phone: string;
  email: string;
}

export interface StatMetric {
  id: string;
  title: string;
  value: string;
  changeRate: string;
  trend: "up" | "down" | "neutral";
  caption: string;
  icon: string;
  colorScheme: "teal" | "emerald" | "sky" | "amber";
}

export interface DoctorWorkload {
  id: string;
  doctorName: string;
  specialization: string;
  hospital: string;
  patientCount: number;
  capacityLimit: number;
  utilizationPercent: number;
}

export interface RegistrationTrendPoint {
  date: string;
  newRegistrations: number;
  totalCumulative: number;
}

// -------------------------------------------------------------
// Backend API Interfaces & Payloads
// -------------------------------------------------------------

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
  errors?: unknown;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface UserProfile {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  role: string;
  hospital?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponseData {
  user: UserProfile;
  accessToken: string;
  refreshToken?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  hospital?: string;
  role?: string;
}

export interface CreateDoctorPayload {
  name: string;
  specialization: string;
  hospital: string;
  phone: string;
  email: string;
}

export interface UpdateDoctorPayload {
  name?: string;
  specialization?: string;
  hospital?: string;
  phone?: string;
  email?: string;
}

export interface DoctorQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  specialization?: string;
  hospital?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: "createdAt" | "name" | "specialization" | "hospital";
  sortOrder?: "asc" | "desc";
}

export interface BackendDoctorRecord {
  _id: string;
  name: string;
  specialization: string;
  hospital: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt?: string;
  patientCount?: number;
  patients?: Array<{
    _id: string;
    name: string;
    phone: string;
    condition: string;
    createdAt: string;
  }>;
}

export interface DoctorsListResponseData {
  doctors: BackendDoctorRecord[];
  pagination: PaginationMeta;
}

export interface AddPatientToDoctorPayload {
  name: string;
  phone: string;
  condition: string;
  email?: string;
  age?: number;
}

export interface CreatePatientPayload {
  name: string;
  phone: string;
  condition: string;
  doctor: string; // Mongo ID of doctor
  email?: string;
  age?: number;
  gender?: "male" | "female" | "other";
  status?: "active" | "discharged" | "critical" | "recovered";
  notes?: string;
}

export interface UpdatePatientPayload {
  name?: string;
  phone?: string;
  condition?: string;
  doctor?: string;
  email?: string;
  age?: number;
  gender?: "male" | "female" | "other";
  status?: "active" | "discharged" | "critical" | "recovered";
  notes?: string;
}

export interface PatientQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  condition?: string;
  status?: string;
  gender?: string;
  doctorId?: string;
  doctor?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: "createdAt" | "name" | "condition" | "status" | "age" | "admissionDate";
  sortOrder?: "asc" | "desc";
}

export interface BackendPatientRecord {
  _id: string;
  name: string;
  phone: string;
  condition: string;
  email?: string;
  age?: number;
  gender?: string;
  status: string;
  notes?: string;
  admissionDate?: string;
  createdAt: string;
  updatedAt?: string;
  doctor: {
    _id: string;
    name: string;
    specialization: string;
    hospital: string;
    phone: string;
    email: string;
  } | null;
}

export interface PatientsListResponseData {
  patients: BackendPatientRecord[];
  pagination: PaginationMeta;
}

export interface DashboardQueryParams {
  startDate?: string;
  endDate?: string;
  interval?: "day" | "month";
}

export interface DashboardAnalyticsData {
  summary: {
    totalDoctors: number;
    totalPatients: number;
    averagePatientsPerDoctor: number;
    recentDoctorsLast30Days: number;
    recentPatientsLast30Days: number;
  };
  patientsPerDoctor: Array<{
    doctorId: string;
    name: string;
    specialization: string;
    hospital: string;
    patientCount: number;
  }>;
  distributions: {
    doctorsBySpecialization: Array<{ specialization: string; count: number }>;
    doctorsByHospital: Array<{ hospital: string; count: number }>;
    patientsByCondition: Array<{ condition: string; count: number }>;
    patientsByStatus: Array<{ status: string; count: number }>;
  };
  dateBasedStatistics: {
    interval: "day" | "month";
    doctorsTrend: Array<{ date: string; count: number }>;
    patientsTrend: Array<{ date: string; count: number }>;
  };
  charts: {
    patientsPerDoctorBarChart: {
      labels: string[];
      data: number[];
    };
    patientsByConditionPieChart: {
      labels: string[];
      data: number[];
    };
    doctorsBySpecializationPieChart: {
      labels: string[];
      data: number[];
    };
    patientsRegistrationLineChart: {
      labels: string[];
      data: number[];
    };
  };
}
