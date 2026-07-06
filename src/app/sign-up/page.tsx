"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button"; // Changed to named import { Button }
import Input from "@/components/ui/input";
import Card from "@/components/ui/card";
import DarkModeToggle from "@/components/ui/darkmodetoggle";
import { useState } from "react";
import { User, Mail, School, GraduationCap, Lock } from "lucide-react";

export default function RegisterPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (value: string) => {
    if (value.length < 8) { setPasswordError("Password harus minimal 8 karakter"); return false; }
    if (!/(?=.*[a-z])/.test(value)) { setPasswordError("Password harus mengandung huruf kecil"); return false; }
    if (!/(?=.*[A-Z])/.test(value)) { setPasswordError("Password harus mengandung huruf kapital"); return false; }
    if (!/(?=.*\d)/.test(value)) { setPasswordError("Password harus mengandung angka"); return false; }
    setPasswordError("");
    return true;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (confirmPassword) validatePassword(value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value !== password) { setPasswordError("Password tidak cocok"); } 
    else { validatePassword(password); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-pixel-pattern relative">
        <div className="absolute inset-0 bg-background/80 backdrop-blur-[1px] pointer-events-none"></div>

      <div className="absolute top-4 right-4 z-20">
        <DarkModeToggle />
      </div>

      <Card className="w-full max-w-lg animate-in fade-in slide-in-from-bottom-4 duration-500 z-10" padding="lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-secondary/20 text-secondary-foreground mb-4">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h1 className="text-3xl font-bold font-heading text-foreground mb-2">
            Gabung NusaSkillz
          </h1>
          <p className="text-muted-foreground">
            Buat akun dan mulai naik level dalam belajarmu!
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <Input label="Nama Lengkap" type="text" placeholder="Budi Santoso" required leftIcon={<User className="w-4 h-4" />} />
          <Input label="Email" type="email" placeholder="nama@sekolah.sch.id" required leftIcon={<Mail className="w-4 h-4" />} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Asal Sekolah" type="text" placeholder="SMA 1 Jakarta" required leftIcon={<School className="w-4 h-4" />} />
            <Input label="Kelas" type="text" placeholder="Kelas 12" required leftIcon={<GraduationCap className="w-4 h-4" />} />
          </div>
          
          <Input
            label="Password"
            type="password"
            placeholder="Minimal 8 karakter"
            value={password}
            onChange={handlePasswordChange}
            error={passwordError}
            helperText="Minimal 8 karakter, 1 huruf kapital, 1 angka"
            required
            leftIcon={<Lock className="w-4 h-4" />}
          />

          <Input
            label="Konfirmasi Password"
            type="password"
            placeholder="Ulangi password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            error={confirmPassword && confirmPassword !== password ? "Password tidak cocok" : ""}
            required
            leftIcon={<Lock className="w-4 h-4" />}
          />

          <div className="flex items-start gap-3 p-4 bg-muted rounded-lg border border-border">
            <input type="checkbox" id="terms" required className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-ring cursor-pointer" />
            <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
              Saya setuju dengan <Link href="#" className="text-primary font-semibold hover:underline">Syarat & Ketentuan</Link> dan <Link href="#" className="text-primary font-semibold hover:underline">Kebijakan Privasi</Link> NusaSkillz
            </label>
          </div>

          <Button type="submit" variant="primary" className="w-full" size="lg">
            Daftar Sekarang 
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border"></div></div>
            <div className="relative flex justify-center text-sm"><span className="px-4 bg-card text-muted-foreground">atau</span></div>
          </div>

          <Button type="button" variant="outline" className="w-full">
            {/* Replaced img tag with inline SVG so it works without external files */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Lanjutkan dengan Google 
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          Sudah punya akun?{" "}
          {/* Changed href to /sign-in to match your renamed folder */}
          <Link href="/sign-in" className="text-primary font-semibold hover:underline">
            Masuk di sini
          </Link>
        </div>
      </Card>
    </div>
  );
}