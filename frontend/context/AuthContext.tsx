"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Activity } from "lucide-react";
import { toast } from "sonner";
import { UserProfile } from "@/lib/types";
import { getCurrentUser, logoutUser } from "@/services/auth.services";

export interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user?: UserProfile) => void;
  logout: () => Promise<void>;
  refetchUser: () => Promise<UserProfile | null>;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = React.useState<UserProfile | null>(null);
  const [token, setToken] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const isAuthRoute = pathname.startsWith("/auth");

  // Fetch real-time user profile from backend (/api/auth/me)
  const refetchUser = React.useCallback(async (): Promise<UserProfile | null> => {
    try {
      const activeToken =
        typeof window !== "undefined"
          ? localStorage.getItem("doctor_tracker_token")
          : null;

      if (!activeToken) {
        setUser(null);
        setToken(null);
        return null;
      }

      const response = await getCurrentUser();
      if (response?.data?.user) {
        const freshUser = response.data.user;
        setUser(freshUser);
        if (typeof window !== "undefined") {
          localStorage.setItem("doctor_tracker_user", JSON.stringify(freshUser));
        }
        return freshUser;
      }
      return null;
    } catch (error) {
      console.warn("Could not refetch real-time user:", error);
      return null;
    }
  }, []);

  // Hydrate from localStorage on initial load and verify real-time user
  React.useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken =
          typeof window !== "undefined"
            ? localStorage.getItem("doctor_tracker_token")
            : null;
        const storedUserJson =
          typeof window !== "undefined"
            ? localStorage.getItem("doctor_tracker_user")
            : null;

        if (storedToken) {
          setToken(storedToken);
          if (storedUserJson) {
            try {
              const parsedUser = JSON.parse(storedUserJson);
              setUser(parsedUser);
            } catch {
              setUser({
                name: "Admin User",
                email: "admin@doctortracker.health",
                role: "admin",
              });
            }
          } else {
            setUser({
              name: "Admin User",
              email: "admin@doctortracker.health",
              role: "admin",
            });
          }

          // Fetch real-time updated profile in background
          try {
            const response = await getCurrentUser();
            if (response?.data?.user) {
              setUser(response.data.user);
              if (typeof window !== "undefined") {
                localStorage.setItem(
                  "doctor_tracker_user",
                  JSON.stringify(response.data.user)
                );
              }
            }
          } catch {
            // Keep cached user if offline / server booting
          }
        } else {
          setToken(null);
          setUser(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Cross-tab real-time synchronization
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "doctor_tracker_token" || e.key === "doctor_tracker_user") {
        const freshToken = localStorage.getItem("doctor_tracker_token");
        const freshUserJson = localStorage.getItem("doctor_tracker_user");
        setToken(freshToken);
        if (freshUserJson) {
          try {
            setUser(JSON.parse(freshUserJson));
          } catch {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Route Protection & Forceful Redirection
  React.useEffect(() => {
    if (isLoading) return;

    const hasToken = !!token;

    if (!hasToken && !isAuthRoute) {
      // Forcefully redirect unauthenticated user to login page
      router.replace("/auth/login");
    } else if (hasToken && isAuthRoute) {
      // Once logged in, direct access is granted to dashboard
      router.replace("/dashboard");
    }
  }, [isLoading, token, isAuthRoute, router]);

  // Login action to set user and token in real-time
  const login = React.useCallback(
    (newToken: string, newUser?: UserProfile) => {
      const resolvedUser: UserProfile = newUser || {
        name: "Admin User",
        email: "admin@doctortracker.health",
        role: "admin",
      };
      setToken(newToken);
      setUser(resolvedUser);
      if (typeof window !== "undefined") {
        localStorage.setItem("doctor_tracker_token", newToken);
        localStorage.setItem(
          "doctor_tracker_user",
          JSON.stringify(resolvedUser)
        );
      }
      router.replace("/dashboard");
    },
    [router]
  );

  // Logout action to revoke credentials and forcefully redirect to login
  const logout = React.useCallback(async () => {
    try {
      await logoutUser();
    } catch {
      // Proceed even if network request fails
    } finally {
      setToken(null);
      setUser(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("doctor_tracker_token");
        localStorage.removeItem("doctor_tracker_user");
      }
      toast.success("Logged out successfully");
      router.replace("/auth/login");
    }
  }, [router]);

  const isAuthenticated = !!token;

  // Prevent flashing protected dashboard content while checking authentication
  if (isLoading && !isAuthRoute) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 ring-8 ring-teal-50/50">
            <Activity className="h-6 w-6 animate-pulse" />
          </div>
          <div className="text-center space-y-1">
            <p className="text-xs font-bold text-slate-800 tracking-tight">
              Verifying Authorization
            </p>
            <p className="text-[11px] text-slate-400">
              Securing access to Doctor Tracker portal...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Block rendering protected dashboard if not authenticated
  if (!isAuthenticated && !isAuthRoute && !isLoading) {
    return null;
  }

  // Block rendering auth forms if already authenticated
  if (isAuthenticated && isAuthRoute) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isLoading,
        login,
        logout,
        refetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
