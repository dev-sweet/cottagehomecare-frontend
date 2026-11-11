"use client";

import * as React from "react";
import {
  Calendar,
  Building2,
  Edit2,
  Trash2,
  X,
  CheckCircle2,
  Phone,
  Mail,
  Stethoscope,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Patient } from "@/lib/types";

interface PatientsTableProps {
  patients: Patient[];
  onEditPatient?: (updatedPatient: Patient) => void;
  onDeletePatient?: (patientId: string) => void;
}

export function PatientsTable({
  patients,
  onEditPatient,
  onDeletePatient,
}: PatientsTableProps) {
  const [editingPatient, setEditingPatient] = React.useState<Patient | null>(
    null
  );
  const [editName, setEditName] = React.useState("");
  const [editCondition, setEditCondition] = React.useState("");
  const [editPhone, setEditPhone] = React.useState("");
  const [editEmail, setEditEmail] = React.useState("");
  const [actionNotice, setActionNotice] = React.useState<string | null>(null);

  const handleStartEdit = (patient: Patient) => {
    setEditingPatient(patient);
    setEditName(patient.name);
    setEditCondition(patient.patientCondition);
    setEditPhone(patient.phone);
    setEditEmail(patient.email);
    setActionNotice(null);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPatient) return;

    const updated = {
      ...editingPatient,
      name: editName.trim(),
      patientCondition: editCondition.trim(),
      phone: editPhone.trim(),
      email: editEmail.trim(),
    };

    onEditPatient?.(updated);
    setActionNotice(`Updated information for ${editName}.`);
    setEditingPatient(null);
  };

  const handleDeletePatient = (patientId: string, patientName: string) => {
    onDeletePatient?.(patientId);
    setActionNotice(`Patient ${patientName} deleted successfully.`);
  };

  return (
    <>
      {actionNotice && (
        <div className="mb-4 flex items-center gap-2 rounded-xl bg-teal-50 border border-teal-200 p-3 text-xs text-teal-800 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0" />
          <span>{actionNotice}</span>
          <button
            onClick={() => setActionNotice(null)}
            className="ml-auto text-teal-700 hover:text-teal-900"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <div className="rounded-xl border border-slate-200/90 bg-white shadow-xs overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/75">
              <TableHead className="w-[240px]">Patient Name</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Assigned Doctor</TableHead>
              <TableHead>Hospital</TableHead>
              <TableHead>Registered Date</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {patients.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-36 text-center text-slate-500"
                >
                  <div className="flex flex-col items-center justify-center gap-1.5 py-6">
                    <p className="text-sm font-semibold text-slate-700">
                      No Patients Found
                    </p>
                    <p className="text-xs text-slate-400">
                      Try adjusting your search criteria or filter options.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              patients.map((patient) => {
              return (
                <TableRow key={patient.id} className="group hover:bg-slate-50/60">
                  {/* Patient Name */}
                  <TableCell>
                    <span className="font-semibold text-slate-900 group-hover:text-teal-700 transition-colors">
                      {patient.name}
                    </span>
                  </TableCell>

                  {/* Patient Condition */}
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs sm:text-sm font-medium text-slate-800">
                        {patient.patientCondition}
                      </span>
                      <Badge
                        variant="outline"
                        className="w-fit text-[10px] text-teal-700 border-teal-200 bg-teal-50/40"
                      >
                        {patient.conditionCategory}
                      </Badge>
                    </div>
                  </TableCell>

                  {/* Assigned Doctor */}
                  <TableCell>
                    <div className="flex flex-col text-xs text-slate-700">
                      <span className="font-semibold text-slate-800 flex items-center gap-1">
                        <Stethoscope className="h-3 w-3 text-teal-600" />
                        {patient.doctorName}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {patient.doctorSpecialization}
                      </span>
                    </div>
                  </TableCell>

                  {/* Hospital */}
                  <TableCell>
                    <div className="flex items-center gap-1 text-xs text-slate-600">
                      <Building2 className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span className="truncate max-w-[160px]">
                        {patient.hospital}
                      </span>
                    </div>
                  </TableCell>

                  {/* Registered Date */}
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Calendar className="h-3 w-3 text-slate-400" />
                      <span>{patient.registeredDate}</span>
                    </div>
                  </TableCell>

                  {/* Contact */}
                  <TableCell>
                    <div className="flex flex-col gap-0.5 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3 text-slate-400" />
                        {patient.phone}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Mail className="h-3 w-3 text-slate-400" />
                        {patient.email}
                      </span>
                    </div>
                  </TableCell>

                  {/* Actions: Edit & Delete (Spec 2.3) */}
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStartEdit(patient)}
                        className="h-8 px-2.5 text-xs gap-1"
                        title="Edit patient information"
                      >
                        <Edit2 className="h-3 w-3 text-slate-600" />
                        <span className="hidden sm:inline">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleDeletePatient(patient.id, patient.name)
                        }
                        className="h-8 px-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                        title="Delete patient"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
        </Table>
      </div>

      {/* Edit Patient Modal (Spec 2.3: "Edit patient information") */}
      {editingPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
            onClick={() => setEditingPatient(null)}
          />

          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 z-10 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">
                Edit Patient Information
              </h3>
              <button
                onClick={() => setEditingPatient(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Patient Full Name
                </label>
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Medical Condition
                </label>
                <Input
                  value={editCondition}
                  onChange={(e) => setEditCondition(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <Input
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="pt-2 text-slate-500 text-[11px]">
                Assigned Doctor:{" "}
                <span className="font-semibold text-slate-700">
                  {editingPatient.doctorName}
                </span>{" "}
                &bull; {editingPatient.hospital}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingPatient(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
