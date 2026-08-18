"use client";

import Link from "next/link";
import { Button } from "@/components/UI/button";
import Input from "@/components/UI/input";
import Card from "@/components/UI/card";
import DarkModeToggle from "@/components/UI/darkmodetoggle";
import { useState } from "react";
import { User, Mail, School, GraduationCap, Lock, AlertCircle, CheckCircle, CircleArrowLeft } from "lucide-react";
import { register } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { verifyEmail } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<'register' | 'verify'>('register');
  const [role, setRole] = useState<"STUDENT" | "TEACHER">("STUDENT");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    school: "",
    className: "",
    password: "",
    confirmPassword: "",
  });

  const [otp, setOtp] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    setFormData({ ...formData, password: value });
    if (formData.confirmPassword && value !== formData.confirmPassword) {
      setPasswordError("Password tidak cocok");
    } else {
      validatePassword(value);
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, confirmPassword: value });
    if (value !== formData.password) {
      setPasswordError("Password tidak cocok");
    } else {
      validatePassword(formData.password);
    }
  };

    const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    if (passwordError || formData.password !== formData.confirmPassword) {
      setApiError("Mohon perbaiki error pada password terlebih dahulu.");
      return;
    }

    setIsLoading(true);
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        school: formData.school,
        className: formData.className,
        role,
      });
      setStep('verify');
    } catch (err: any) {
      setApiError(err.message || "Terjadi kesalahan saat mendaftar.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");
    setIsLoading(true);

    try {
      await verifyEmail({
        email: formData.email,
        otp: otp,
      });
      router.push("/sign-in?verified=true");
    } catch (err: any) {
      setApiError(err.message || "Kode OTP salah atau kedaluwarsa.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-pixel-pattern relative">
        <div className="absolute inset-0 bg-background/80 backdrop-blur-[1px] pointer-events-none"></div>

      <div className="absolute top-4 right-4 z-20">
        <DarkModeToggle />
      </div>

      {/* Back to Home */}
      <Link
        href="/"
        className="absolute top-4 left-4 z-50 flex items-center gap-2 rounded-full bg-card/80 px-4 py-2 text-sm font-semibold text-foreground shadow-sm ring-1 ring-border backdrop-blur transition-colors hover:bg-primary hover:hover:text-primary-foreground"
      >
        <CircleArrowLeft className="h-4 w-4" />
        Beranda
      </Link>

      <Card className="w-full max-w-lg animate-in fade-in slide-in-from-bottom-4 duration-500 z-10" padding="lg">
        {step === 'register' && (
          <>
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

            {/* Role Toggle */}
            <div className="mb-6 grid grid-cols-2 gap-1 rounded-xl bg-muted p-1">
              <button
                type="button"
                onClick={() => setRole("STUDENT")}
                className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-heading text-sm font-bold transition-all ${
                  role === "STUDENT"
                    ? "bg-card text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Murid
              </button>
              <button
                type="button"
                onClick={() => setRole("TEACHER")}
                className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-heading text-sm font-bold transition-all ${
                  role === "TEACHER"
                    ? "bg-card text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Guru
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleRegister}>
              <Input 
                label="Nama Lengkap" 
                type="text" 
                placeholder="Budi Santoso" 
                required 
                leftIcon={<User className="w-4 h-4" />}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <Input 
                label="Email" 
                type="email" 
                placeholder="nama@sekolah.sch.id" 
                required 
                leftIcon={<Mail className="w-4 h-4" />}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                  label="Asal Sekolah" 
                  type="text" 
                  placeholder="SMA 1 Jakarta" 
                  required 
                  leftIcon={<School className="w-4 h-4" />}
                  value={formData.school}
                  onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                />
                {role === "STUDENT" && (
                <Input 
                  label="Kelas" 
                  type="text" 
                  placeholder="Kelas 12" 
                  required 
                  leftIcon={<GraduationCap className="w-4 h-4" />}
                  value={formData.className}
                  onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                />
                )}
              </div>
              
              <Input
                label="Password"
                type="password"
                placeholder="Minimal 8 karakter"
                required
                leftIcon={<Lock className="w-4 h-4" />}
                value={formData.password}
                onChange={handlePasswordChange}
                error={passwordError}
                helperText="Minimal 8 karakter, 1 huruf kapital, 1 angka"
              />

              <Input
                label="Konfirmasi Password"
                type="password"
                placeholder="Ulangi password"
                required
                leftIcon={<Lock className="w-4 h-4" />}
                value={formData.confirmPassword}
                onChange={handleConfirmPasswordChange}
                error={formData.confirmPassword && formData.confirmPassword !== formData.password ? "Password tidak cocok" : ""}
              />

              {apiError && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 text-red-600 text-sm font-medium">
                  <AlertCircle className="w-4 h-4" />
                  {apiError}
                </div>
              )}

              <div className="flex items-start gap-3 p-4 bg-muted rounded-lg border border-border">
                <input type="checkbox" id="terms" required className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-ring cursor-pointer" />
                <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                  Saya setuju dengan <Link href="#" className="text-primary font-semibold hover:underline">Syarat & Ketentuan</Link> dan <Link href="#" className="text-primary font-semibold hover:underline">Kebijakan Privasi</Link> NusaSkillz
                </label>
              </div>

              <Button type="submit" variant="primary" className="w-full" size="lg" isLoading={isLoading}>
                Daftar Sekarang 
              </Button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border"></div></div>
                <div className="relative flex justify-center text-sm"><span className="px-4 bg-card text-muted-foreground">atau</span></div>
              </div>

              <Button type="button" variant="outline" className="w-full" disabled={isLoading}>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Lanjutkan dengan Google 
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Sudah punya akun?{" "}
              <Link href="/sign-in" className="text-primary font-semibold hover:underline">
                Masuk di sini
              </Link>
            </div>
          </>
        )}

        {/* --- STEP 2: OTP VERIFICATION FORM --- */}
        {step === 'verify' && (
          <>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-green-500/10 text-green-600 mb-4">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h1 className="text-3xl font-bold font-heading text-foreground mb-2">
                Verifikasi Email
              </h1>
              <p className="text-muted-foreground">
                Masukkan kode 6 digit yang telah kami kirim ke <br />
                <span className="font-semibold text-foreground">{formData.email}</span>
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleVerify}>
              <Input
                label="Kode OTP"
                type="text"
                placeholder="123456"
                required
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} // Only allow numbers
                className="text-center text-2xl tracking-widest font-bold"
              />

              {apiError && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 text-red-600 text-sm font-medium">
                  <AlertCircle className="w-4 h-4" />
                  {apiError}
                </div>
              )}

              <Button type="submit" variant="primary" className="w-full" size="lg" isLoading={isLoading}>
                Verifikasi Akun
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Tidak menerima email?{" "}
              <button 
                onClick={() => setStep('register')} 
                className="text-primary font-semibold hover:underline"
              >
                Kembali dan coba email lain
              </button>
            </div>
          </>
        )}

      </Card>
    </div>
  );
}