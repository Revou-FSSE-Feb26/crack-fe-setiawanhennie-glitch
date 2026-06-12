"use client";

import Link from "next/link";
import Button from "@/components/UI/button";
import Input from "@/components/UI/input";
import Card from "@/components/UI/card";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 gradient-mesh">
      <div className="card w-full max-w-md animate-slide-up">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary mb-4 shadow-lg">
            <span className="text-3xl">🎮</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Selamat Datang!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Masuk dan lanjutkan petualangan belajarmu
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <Input
            label="Email"
            type="email"
            placeholder="nama@sekolah.sch.id"
            required
          />
          
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            required
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600 dark:text-gray-400 cursor-pointer">
              <input 
                type="checkbox" 
                className="rounded border-gray-300 text-primary-500 focus:ring-primary-500" 
              />
              Ingat saya
            </label>
            <Link href="#" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
              Lupa password?
            </Link>
          </div>

          <Button type="submit" variant="primary" className="w-full">
            Masuk 🚀
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          Belum punya akun?{" "}
          <Link href="/register" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">
            Daftar gratis
          </Link>
        </div>
      </div>
    </div>
  );
}