"use client";

import * as React from "react";
import { Plus, X, Stethoscope, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AddDoctorButton() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsOpen(false);
    }, 1500);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="gap-1.5 shadow-xs cursor-pointer"
      >
        <Plus className="h-4 w-4" />
        <span>Add Doctor</span>
      </Button>

      {/* Phase 1 Modal Dialog */}
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
                  <Stethoscope className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Onboard New Physician
                  </h3>
                  <p className="text-xs text-slate-500">
                    Phase 1 Frontend Prototype Modal
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {isSubmitted ? (
              <div className="py-8 flex flex-col items-center justify-center text-center space-y-2">
                <CheckCircle2 className="h-10 w-10 text-emerald-500 animate-in zoom-in duration-300" />
                <h4 className="font-bold text-slate-900">Physician Saved (Mock)</h4>
                <p className="text-xs text-slate-500 max-w-xs">
                  Validation passed. Database persistence will be connected in Phase 2.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Full Name & Title
                  </label>
                  <Input
                    placeholder="e.g. Dr. Rebecca Vance, MD"
                    defaultValue="Dr. Rebecca Vance, MD"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Specialty
                    </label>
                    <select
                      className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      defaultValue="Cardiology"
                    >
                      <option value="Cardiology">Cardiology</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="Oncology">Oncology</option>
                      <option value="General Medicine">General Medicine</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Department
                    </label>
                    <Input
                      placeholder="e.g. Cardiovascular Ward"
                      defaultValue="Cardiovascular Wing B"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Official Email
                    </label>
                    <Input
                      type="email"
                      placeholder="physician@hospital.org"
                      defaultValue="rebecca.vance@doctortracker.health"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Office / Room
                    </label>
                    <Input placeholder="Wing C - Room 310" defaultValue="Wing C - Room 310" />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" size="sm" className="bg-teal-600 hover:bg-teal-700">
                    Save Physician Record
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

