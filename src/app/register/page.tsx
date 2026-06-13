"use client";

import Link from "next/link";
import Button from "@/components/UI/button";
import Input from "@/components/UI/input";
import Card from "@/components/UI/card";
import { useState } from "react";
import { User, Mail, School, GraduationCap, Lock, CheckCircle2 } from "lucide-react";

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
    <div className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden">
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-secondary/20 via-background to-background"></div>

      <Card className="w-full max-w-lg animate-in fade-in slide-in-from-bottom-4 duration-500" padding="lg">
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
            Lanjutkan dengan Google
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-primary font-semibold hover:underline">
            Masuk di sini
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-xs text-center text-muted-foreground mb-4 font-medium">✨ Manfaat bergabung:</p>
          <div className="grid grid-cols-2 gap-3 text-xs">
            {["Belajar sambil bermain", "Dapatkan XP & Level", "Diskusi dengan teman", "Gratis selamanya"].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-foreground">
                <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}