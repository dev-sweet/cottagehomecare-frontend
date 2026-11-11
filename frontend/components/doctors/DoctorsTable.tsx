"use client";

import * as React from "react";
import {
  Mail,
  Phone,
  Building2,
  Users,
  Plus,
  Trash2,
  X,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Doctor } from "@/lib/types";

interface DoctorsTableProps {
  doctors: Doctor[];
  onAddPatient?: (
    doctorId: string,
    patientName: string,
    patientCondition: string,
    patientPhone?: string
  ) => void;
  onDeletePatient?: (doctorId: string, patientId: string) => void;
}

export function DoctorsTable({
  doctors,
  onAddPatient,
  onDeletePatient,
}: DoctorsTableProps) {
  const [selectedDoctorId, setSelectedDoctorId] = React.useState<string | null>(
    null
  );
  const [isAddingPatient, setIsAddingPatient] = React.useState(false);
  const [newPatientName, setNewPatientName] = React.useState("");
  const [newPatientCondition, setNewPatientCondition] = React.useState("");
  const [newPatientPhone, setNewPatientPhone] = React.useState("");
  const [actionNotice, setActionNotice] = React.useState<string | null>(null);

  const selectedDoctor = React.useMemo(() => {
    return doctors.find((doc) => doc.id === selectedDoctorId) || null;
  }, [doctors, selectedDoctorId]);

  const handleOpenPatients = (doctorId: string) => {
    setSelectedDoctorId(doctorId);
    setIsAddingPatient(false);
    setActionNotice(null);
  };

  const handleAddPatientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatientName.trim() || !newPatientCondition.trim() || !selectedDoctorId)
      return;

    onAddPatient?.(
      selectedDoctorId,
      newPatientName.trim(),
      newPatientCondition.trim(),
      newPatientPhone.trim() || "+1 (555) 000-0000"
    );
    setActionNotice(`Added ${newPatientName} under ${selectedDoctor?.name}.`);
    setNewPatientName("");
    setNewPatientCondition("");
    setNewPatientPhone("");
    setIsAddingPatient(false);
  };

  const handleDeletePatient = (patientId: string, patientName: string) => {
    if (!selectedDoctorId) return;

    onDeletePatient?.(selectedDoctorId, patientId);
    setActionNotice(
      `Removed ${patientName} from ${selectedDoctor?.name}'s list.`
    );
  };

  return (
    <>
      <div className="rounded-xl border border-slate-200/90 bg-white shadow-xs overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/75">
              <TableHead className="w-[260px]">Doctor Name</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead>Hospital</TableHead>
              <TableHead>Contact (Phone & Email)</TableHead>
              <TableHead>Registered</TableHead>
              <TableHead className="text-center">Patients</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {doctors.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-36 text-center text-slate-500"
                >
                  <div className="flex flex-col items-center justify-center gap-1.5 py-6">
                    <p className="text-sm font-semibold text-slate-700">
                      No Doctors Found
                    </p>
                    <p className="text-xs text-slate-400">
                      Try adjusting your filters or click Create Doctor to add a record.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              doctors.map((doctor) => {
              return (
                <TableRow key={doctor.id} className="group hover:bg-slate-50/60">
                  {/* Name */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={doctor.avatarUrl}
                        fallback={doctor.initials}
                        size="md"
                        className="border border-teal-500/20"
                      />
                      <span className="font-semibold text-slate-900 group-hover:text-teal-700 transition-colors">
                        {doctor.name}
                      </span>
                    </div>
                  </TableCell>

                  {/* Specialization */}
                  <TableCell>
                    <span className="font-medium text-slate-800 text-xs sm:text-sm">
                      {doctor.specialization}
                    </span>
                  </TableCell>

                  {/* Hospital */}
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <Building2 className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span className="truncate max-w-[200px]">
                        {doctor.hospital}
                      </span>
                    </div>
                  </TableCell>

                  {/* Contact */}
                  <TableCell>
                    <div className="flex flex-col gap-0.5 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Phone className="h-3 w-3 text-slate-400" />
                        <span>{doctor.phone}</span>
                      </div>
                      <a
                        href={`mailto:${doctor.email}`}
                        className="flex items-center gap-1.5 hover:text-teal-600 truncate transition-colors text-slate-500"
                      >
                        <Mail className="h-3 w-3 text-slate-400" />
                        <span className="truncate max-w-[170px]">
                          {doctor.email}
                        </span>
                      </a>
                    </div>
                  </TableCell>

                  {/* Registered Date */}
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Calendar className="h-3 w-3 text-slate-400" />
                      <span>{doctor.registeredDate}</span>
                    </div>
                  </TableCell>

                  {/* Total Patients */}
                  <TableCell className="text-center">
                    <span className="inline-flex items-center rounded-full bg-teal-50 px-2 py-0.5 text-xs font-semibold text-teal-700 border border-teal-200">
                      {doctor.patientsCount}
                    </span>
                  </TableCell>

                  {/* Actions: View corresponding patients */}
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenPatients(doctor.id)}
                      className="text-xs h-8 px-2.5 gap-1.5"
                    >
                      <Users className="h-3.5 w-3.5 text-teal-600" />
                      <span>View Patients</span>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
        </Table>
      </div>

      {/* View Corresponding Patients Modal (Spec 2.2) */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
            onClick={() => setSelectedDoctorId(null)}
          />

          <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 z-10 animate-in zoom-in-95 duration-200 max-h-[85vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <Avatar
                  src={selectedDoctor.avatarUrl}
                  fallback={selectedDoctor.initials}
                  size="md"
                />
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {selectedDoctor.name}&apos;s Patients
                  </h3>
                  <p className="text-xs text-slate-500">
                    {selectedDoctor.specialization} &bull;{" "}
                    {selectedDoctor.hospital}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={() => setIsAddingPatient(!isAddingPatient)}
                  className="gap-1 text-xs"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Patient</span>
                </Button>
                <button
                  onClick={() => setSelectedDoctorId(null)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Notification alert */}
            {actionNotice && (
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-teal-50 border border-teal-200 p-2.5 text-xs text-teal-800">
                <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0" />
                <span>{actionNotice}</span>
              </div>
            )}

            {/* Add new patient under doctor form */}
            {isAddingPatient && (
              <form
                onSubmit={handleAddPatientSubmit}
                className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs"
              >
                <div className="font-semibold text-slate-800">
                  Add New Patient Under {selectedDoctor.name}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <Input
                    placeholder="Patient Name *"
                    value={newPatientName}
                    onChange={(e) => setNewPatientName(e.target.value)}
                    required
                  />
                  <Input
                    placeholder="Medical Condition *"
                    value={newPatientCondition}
                    onChange={(e) => setNewPatientCondition(e.target.value)}
                    required
                  />
                  <Input
                    placeholder="Phone (optional)"
                    type="tel"
                    value={newPatientPhone}
                    onChange={(e) => setNewPatientPhone(e.target.value)}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsAddingPatient(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    Confirm Add
                  </Button>
                </div>
              </form>
            )}

            {/* Patient list under doctor */}
            <div className="mt-4 flex-1 overflow-y-auto">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Assigned Patients ({selectedDoctor.patients.length})
              </div>

              {selectedDoctor.patients.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400">
                  No corresponding patients currently assigned to this doctor.
                </div>
              ) : (
                <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
                  {selectedDoctor.patients.map((p) => (
                    <div
                      key={p.id}
                      className="p-3 flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors text-xs"
                    >
                      <div>
                        <div className="font-semibold text-slate-900">
                          {p.name}
                        </div>
                        <div className="text-slate-500 text-[11px] mt-0.5">
                          Condition:{" "}
                          <span className="text-slate-700 font-medium">
                            {p.condition}
                          </span>{" "}
                          &bull; Intake: {p.registeredDate}
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeletePatient(p.id, p.name)}
                        className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 h-8 px-2"
                        title="Delete patient from doctor's list"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline text-xs ml-1">
                          Delete
                        </span>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedDoctorId(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
