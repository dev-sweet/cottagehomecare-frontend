export type DoctorStatus = "available" | "in_surgery" | "off_duty" | "on_leave";

export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  department: string;
  email: string;
  phone: string;
  patientsCount: number;
  experienceYears: number;
  status: DoctorStatus;
  rating: number;
  avatarUrl: string;
  initials: string;
  officeRoom: string;
  shiftHours: string;
}

export type PatientStatus = "admitted" | "outpatient" | "in_treatment" | "discharged";
export type PatientSeverity = "low" | "moderate" | "high" | "critical";
export type MedicalConditionCategory =
  | "Cardiology"
  | "Neurology"
  | "Orthopedics"
  | "Pediatrics"
  | "Oncology"
  | "Endocrinology"
  | "General Medicine";

export interface Patient {
  id: string;
  recordNumber: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  condition: string;
  conditionCategory: MedicalConditionCategory;
  assignedDoctor: {
    id: string;
    name: string;
    specialty: string;
    avatarUrl: string;
    initials: string;
  };
  admissionDate: string;
  roomNumber: string;
  status: PatientStatus;
  severity: PatientSeverity;
  contactNumber: string;
  bloodType: string;
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
  specialty: string;
  activePatients: number;
  capacityLimit: number;
  utilizationPercent: number;
}

export interface RegistrationTrendPoint {
  month: string;
  registrations: number;
  consultations: number;
}

