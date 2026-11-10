import { LayoutDashboard, Stethoscope, Users } from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "success";
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Doctors",
    href: "/dashboard/doctors",
    icon: Stethoscope,
    badge: "48",
    badgeVariant: "secondary",
  },
  {
    title: "Patients",
    href: "/dashboard/patients",
    icon: Users,
    badge: "2,845",
    badgeVariant: "secondary",
  },
];
