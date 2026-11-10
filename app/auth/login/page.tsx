"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  KeyRound,
  CheckCircle2,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("admin@doctortracker.health");
  const [password, setPassword] = React.useState("admin123");
  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock client-only authentication flow without calling API
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 600);
    }, 500);
  };

  return (
    <Card className="border-slate-200/90 shadow-md">
      <CardHeader className="space-y-1 text-center pb-4">
        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 ring-8 ring-teal-50/50">
          <KeyRound className="h-6 w-6" />
        </div>
        <CardTitle className="text-xl font-bold tracking-tight text-slate-900">
          Admin Sign In
        </CardTitle>
        <CardDescription className="text-xs text-slate-500">
          Enter your authorized administrator credentials to access Doctor Tracker
        </CardDescription>
      </CardHeader>

      <CardContent>
        {success ? (
          <div className="py-6 flex flex-col items-center justify-center text-center space-y-2">
            <CheckCircle2 className="h-10 w-10 text-emerald-500 animate-in zoom-in duration-300" />
            <h4 className="font-bold text-slate-900 text-sm">
              Authentication Successful
            </h4>
            <p className="text-xs text-slate-500">
              Redirecting to administrator dashboard...
            </p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block font-medium text-slate-700">
                Official Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@doctortracker.health"
                  className="pl-9"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block font-medium text-slate-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() =>
                    alert("Password reset simulated: Contact hospital IT administrator.")
                  }
                  className="text-[11px] text-teal-600 hover:text-teal-700 font-medium cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-9 pr-9"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-teal-600 focus:ring-teal-500 h-4 w-4"
                />
                <span>Keep me signed in</span>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full gap-2 mt-2 bg-teal-600 hover:bg-teal-700 cursor-pointer shadow-xs"
            >
              <LogIn className="h-4 w-4" />
              <span>{isLoading ? "Signing in..." : "Sign In to Portal"}</span>
            </Button>

            {/* Demo Helper Box */}
            <div className="rounded-lg bg-slate-50 border border-slate-200/80 p-2.5 text-[11px] text-slate-500">
              <span className="font-semibold text-slate-700">Pre-filled Demo:</span>{" "}
              <span>admin@doctortracker.health / admin123</span>
            </div>
          </form>
        )}
      </CardContent>

      <CardFooter className="pt-0 justify-center text-xs text-slate-500">
        <span>Need an administrative account?</span>{" "}
        <Link
          href="/auth/register"
          className="ml-1 font-semibold text-teal-600 hover:text-teal-700 underline-offset-4 hover:underline"
        >
          Register here
        </Link>
      </CardFooter>
    </Card>
  );
}

