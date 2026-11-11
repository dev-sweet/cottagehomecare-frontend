"use client";

import * as React from "react";
import { Plus, X, HeartPulse, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useCreatePatient } from "@/hooks/api/usePatients";
import { useGetDoctors } from "@/hooks/api/useDoctors";

export function AddPatientButton() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const [name, setName] = React.useState("");
  const [condition, setCondition] = React.useState("");
  const [doctorId, setDoctorId] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"Outpatient" | "Admitted" | "Discharged" | "Critical" | "Stable">("Outpatient");

  const createPatientMutation = useCreatePatient();
  const { data: doctorsData } = useGetDoctors({ limit: 100 });

  const doctorsList = doctorsData?.doctors || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctorId) return;

    createPatientMutation.mutate(
      {
        name,
        condition,
        doctor: doctorId,
        phone,
        email: email || undefined,
        status: status.toLowerCase() as "active" | "discharged" | "critical" | "recovered",
      },
      {
        onSuccess: () => {
          setIsSubmitted(true);
          setName("");
          setCondition("");
          setDoctorId("");
          setPhone("");
          setEmail("");
          setTimeout(() => {
            setIsSubmitted(false);
            setIsOpen(false);
          }, 1200);
        },
      }
    );
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="gap-1.5 shadow-xs cursor-pointer bg-teal-600 hover:bg-teal-700 text-white"
      >
        <Plus className="h-4 w-4" />
        <span>Add Patient</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 z-10 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                  <HeartPulse className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Register New Patient
                  </h3>
                  <p className="text-xs text-slate-500">
                    Create patient record and assign directly to a physician
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {isSubmitted ? (
              <div className="py-8 flex flex-col items-center justify-center text-center space-y-2">
                <CheckCircle2 className="h-10 w-10 text-emerald-500 animate-in zoom-in duration-300" />
                <h4 className="font-bold text-slate-900">
                  Patient Registered Successfully
                </h4>
                <p className="text-xs text-slate-500 max-w-xs">
                  The record is synced with the backend and assigned to the selected physician.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
                {/* 1. Name & Condition */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Patient Name <span className="text-rose-500">*</span>
                    </label>
                    <Input
                      placeholder="e.g. John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Condition <span className="text-rose-500">*</span>
                    </label>
                    <Input
                      placeholder="e.g. Hypertension"
                      value={condition}
                      onChange={(e) => setCondition(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* 2. Assigned Doctor */}
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Assigned Doctor <span className="text-rose-500">*</span>
                  </label>
                  <select
                    className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 focus:ring-2 focus:ring-teal-500 focus:outline-none cursor-pointer"
                    value={doctorId}
                    onChange={(e) => setDoctorId(e.target.value)}
                    required
                  >
                    <option value="">Select a Doctor</option>
                    {doctorsList.map((doc) => (
                      <option key={doc._id} value={doc._id}>
                        {doc.name} ({doc.specialization} &bull; {doc.hospital})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <Input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <Input
                      type="email"
                      placeholder="patient@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    disabled={createPatientMutation.isPending}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    className="bg-teal-600 hover:bg-teal-700"
                    disabled={createPatientMutation.isPending}
                  >
                    {createPatientMutation.isPending && (
                      <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" />
                    )}
                    Save Patient
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

