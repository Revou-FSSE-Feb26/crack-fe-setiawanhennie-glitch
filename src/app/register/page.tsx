"use client";

import Link from "next/link";
import Button from "@/components/UI/button";
import Input from "@/components/UI/input";
import Card from "@/components/UI/card";
import { useState } from "react";

export default function RegisterPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (value: string) => {
    if (value.length < 8) {
      setPasswordError("Password harus minimal 8 karakter");
      return false;
    }
    if (!/(?=.*[a-z])/.test(value)) {
      setPasswordError("Password harus mengandung huruf kecil");
      return false;
    }
    if (!/(?=.*[A-Z])/.test(value)) {
      setPasswordError("Password harus mengandung huruf kapital");
      return false;
    }
    if (!/(?=.*\d)/.test(value)) {
      setPasswordError("Password harus mengandung angka");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (confirmPassword) {
      validatePassword(value);
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value !== password) {
      setPasswordError("Password tidak cocok");
    } else {
      validatePassword(password);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 gradient-mesh">
      <div className="card w-full max-w-lg animate-slide-up">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-secondary mb-4 shadow-lg">
            <span className="text-3xl">🌟</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Gabung NusaSkillz
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Buat akun dan mulai naik level dalam belajarmu!
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {/* Name */}
          <Input
            label="Nama Lengkap"
            type="text"
            placeholder="Budi Santoso"
            required
          />
          
          {/* Email */}
          <Input
            label="Email"
            type="email"
            placeholder="nama@sekolah.sch.id"
            required
          />

          {/* School & Grade */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Asal Sekolah"
              type="text"
              placeholder="SMA 1 Jakarta"
              required
            />
            <Input
              label="Kelas"
              type="text"
              placeholder="Kelas 12"
              required
            />
          </div>
          
          {/* Password */}
          <Input
            label="Password"
            type="password"
            placeholder="Minimal 8 karakter"
            value={password}
            onChange={handlePasswordChange}
            error={passwordError}
            helperText="Minimal 8 karakter, 1 huruf kapital, 1 angka"
            required
          />

          {/* Confirm Password */}
          <Input
            label="Konfirmasi Password"
            type="password"
            placeholder="Ulangi password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            error={confirmPassword && confirmPassword !== password ? "Password tidak cocok" : ""}
            required
          />

          {/* Terms & Conditions */}
          <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <input 
              type="checkbox" 
              id="terms"
              required
              className="mt-1 w-4 h-4 rounded border-blue-300 text-primary-500 focus:ring-primary-500 cursor-pointer" 
            />
            <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
              Saya setuju dengan{" "}
              <Link href="#" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">
                Syarat & Ketentuan
              </Link>
              {" "}dan{" "}
              <Link href="#" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">
                Kebijakan Privasi
              </Link>
              {" "}NusaSkillz
            </label>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            variant="secondary" 
            className="w-full"
            size="lg"
          >
            Daftar Sekarang 
          </Button>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-gray-800 text-gray-500">atau</span>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">
            Masuk di sini
          </Link>
        </div>

        {/* Benefits Section */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mb-4 font-medium">
            ✨ Manfaat bergabung:
          </p>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <span className="text-green-500">✓</span>
              <span>Belajar sambil bermain</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <span className="text-green-500">✓</span>
              <span>Dapatkan XP & Level</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <span className="text-green-500">✓</span>
              <span>Diskusi dengan teman</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <span className="text-green-500">✓</span>
              <span>Gratis selamanya</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}