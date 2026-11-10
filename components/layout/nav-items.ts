import {
  LayoutDashboard,
  UserCheck,
  Users,
  Calendar,
  Building2,
  ActivitySquare,
  Settings,
  HelpCircle,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "success" | "warning";
  isPrimary?: boolean;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    isPrimary: true,
  },
  {
    title: "Doctors",
    href: "/doctors",
    icon: UserCheck,
    badge: "48",
    badgeVariant: "secondary",
    isPrimary: true,
  },
  {
    title: "Patients",
    href: "/patients",
    icon: Users,
    badge: "142 New",
    badgeVariant: "success",
    isPrimary: true,
  },
];

export const SECONDARY_NAV_ITEMS: NavItem[] = [
  {
    title: "Appointments",
    href: "#",
    icon: Calendar,
    badge: "36",
    badgeVariant: "warning",
    isPrimary: false,
  },
  {
    title: "Departments",
    href: "#",
    icon: Building2,
    isPrimary: false,
  },
  {
    title: "Clinical Analytics",
    href: "#",
    icon: ActivitySquare,
    isPrimary: false,
  },
  {
    title: "Settings",
    href: "#",
    icon: Settings,
    isPrimary: false,
  },
  {
    title: "Help & Protocols",
    href: "#",
    icon: HelpCircle,
    isPrimary: false,
  },
];

