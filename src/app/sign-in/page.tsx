"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/UI/button";
import Input from "@/components/UI/input";
import Card from "@/components/UI/card";
import DarkModeToggle from "@/components/UI/darkmodetoggle";
import { Mail, Lock, GraduationCap, AlertCircle, CircleArrowLeft } from "lucide-react";
import { login } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await login({
        email: formData.email,
        password: formData.password,
      });

      if (result.user.role === "TEACHER") {
        router.push("/teacher/dashboard");
      } else if (result.user.role === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Gagal masuk. Periksa email dan password Anda.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-pixel-pattern relative">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-[1px] z-0 pointer-events-none"></div>

      {/* Dark Mode Toggle */}
      <div className="absolute top-4 right-4 z-50 pointer-events-auto">
        <DarkModeToggle />
      </div>

      {/* Back to Home */}
      <Link
        href="/"
        className="absolute top-4 left-4 z-50 flex items-center gap-2 rounded-full bg-card/80 px-4 py-2 text-sm font-semibold text-foreground shadow-sm ring-1 ring-border backdrop-blur transition-colors hover:bg-primary hover:text-primary-foreground"
      >
        <CircleArrowLeft className="h-4 w-4" />
        Beranda
      </Link>

      {/* Main Card */}
      <Card className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10" padding="lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-4">
            <GraduationCap className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold font-heading text-foreground mb-2">
            Selamat Datang!
          </h1>
          <p className="text-muted-foreground">
            Masuk dan lanjutkan petualangan belajarmu
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          
          {/* API Error Alert */}
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 text-red-600 text-sm font-medium">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <Input
            label="Email"
            type="email"
            placeholder="nama@sekolah.sch.id"
            required
            leftIcon={<Mail className="w-4 h-4" />}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            required
            leftIcon={<Lock className="w-4 h-4" />}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-muted-foreground cursor-pointer">
              <input type="checkbox" className="h-4 w-4 rounded border-border text-primary focus:ring-ring" />
              Ingat saya
            </label>
            <Link href="#" className="text-primary font-medium hover:underline">
              Lupa password?
            </Link>
          </div>

          <Button type="submit" variant="primary" className="w-full" size="lg" isLoading={isLoading}>
            Masuk 
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          Belum punya akun?{" "}
          <Link href="/sign-up" className="text-primary font-semibold hover:underline">
            Daftar disini
          </Link>
        </div>
      </Card>
    </div>
  );
}