"use client";

import Link from "next/link";
import Button from "@/components/UI/button";
import Input from "@/components/UI/input";
import Card from "@/components/UI/card";
import { Mail, Lock, Gamepad2 } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden">
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
      
      <Card className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500" padding="lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-4">
            <Gamepad2 className="w-7 h-7" />
          </div>
          <h1 className="text-3xl font-bold font-heading text-foreground mb-2">
            Selamat Datang!
          </h1>
          <p className="text-muted-foreground">
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
            leftIcon={<Mail className="w-4 h-4" />}
          />
          
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            required
            leftIcon={<Lock className="w-4 h-4" />}
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

          <Button type="submit" variant="primary" className="w-full" size="lg">
            Masuk 
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          Belum punya akun?{" "}
          <Link href="/register" className="text-primary font-semibold hover:underline">
            Daftar gratis
          </Link>
        </div>
      </Card>
    </div>
  );
}