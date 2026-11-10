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
