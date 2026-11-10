"use client";

import * as React from "react";
import {
  Mail,
  Phone,
  Star,
  MoreVertical,
  ExternalLink,
  Building,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Doctor, DoctorStatus } from "@/lib/types";

interface DoctorsTableProps {
  doctors: Doctor[];
}

const statusConfig: Record<
  DoctorStatus,
  { label: string; variant: "success" | "warning" | "secondary" | "destructive" }
> = {
  available: { label: "On Duty", variant: "success" },
  in_surgery: { label: "In Surgery", variant: "warning" },
  off_duty: { label: "Off Duty", variant: "secondary" },
  on_leave: { label: "On Leave", variant: "destructive" },
};

export function DoctorsTable({ doctors }: DoctorsTableProps) {
  return (
    <div className="rounded-xl border border-slate-200/90 bg-white shadow-xs overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/75">
            <TableHead className="w-[300px]">Physician Details</TableHead>
            <TableHead>Specialty & Department</TableHead>
            <TableHead>Contact Information</TableHead>
            <TableHead className="text-center">Active Caseload</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {doctors.map((doctor) => {
            const status = statusConfig[doctor.status];

            return (
              <TableRow key={doctor.id} className="group hover:bg-slate-50/60">
                {/* Physician Details */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={doctor.avatarUrl}
                      fallback={doctor.initials}
                      size="lg"
                      className="border-2 border-teal-500/10"
                    />
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-slate-900 group-hover:text-teal-700 transition-colors">
                          {doctor.name}
                        </span>
                        <div className="flex items-center gap-0.5 text-amber-500 text-[11px] font-bold">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          <span>{doctor.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      <span className="text-xs text-slate-500 truncate">
                        {doctor.title}
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Building className="h-3 w-3" />
                        {doctor.officeRoom}
                      </span>
                    </div>
                  </div>
                </TableCell>

                {/* Specialty & Department */}
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-800 text-xs sm:text-sm">
                      {doctor.specialty}
                    </span>
                    <span className="text-xs text-slate-400 truncate max-w-[200px]">
                      {doctor.department}
                    </span>
                    <span className="text-[10px] text-teal-600 font-medium mt-0.5">
                      {doctor.experienceYears} yrs experience
                    </span>
                  </div>
                </TableCell>

                {/* Contact Information */}
                <TableCell>
                  <div className="flex flex-col gap-1 text-xs text-slate-600">
                    <a
                      href={`mailto:${doctor.email}`}
                      className="flex items-center gap-1.5 hover:text-teal-600 truncate transition-colors"
                    >
                      <Mail className="h-3.5 w-3.5 text-slate-400" />
                      <span className="truncate max-w-[180px]">{doctor.email}</span>
                    </a>
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <Phone className="h-3.5 w-3.5 text-slate-400" />
                      <span>{doctor.phone}</span>
                    </span>
                  </div>
                </TableCell>

                {/* Active Caseload */}
                <TableCell className="text-center">
                  <div className="inline-flex flex-col items-center">
                    <span className="text-sm font-bold text-slate-900">
                      {doctor.patientsCount}
                    </span>
                    <span className="text-[10px] text-slate-400">Patients</span>
                  </div>
                </TableCell>

                {/* Duty Status */}
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <Badge variant={status.variant} className="w-fit">
                      {status.label}
                    </Badge>
                    <span className="text-[10px] text-slate-400 truncate max-w-[140px]">
                      {doctor.shiftHours}
                    </span>
                  </div>
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-8 px-2.5 hidden sm:inline-flex"
                      onClick={() => alert(`Doctor Profile: ${doctor.name}`)}
                    >
                      <ExternalLink className="h-3.5 w-3.5 mr-1" />
                      Profile
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-400 hover:text-slate-700"
                      onClick={() => alert(`Quick Actions for ${doctor.name}`)}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
