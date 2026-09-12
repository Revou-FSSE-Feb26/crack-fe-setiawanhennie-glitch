"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/UI/button";
import Input from "@/components/UI/input";
import Card from "@/components/UI/card";
import DarkModeToggle from "@/components/UI/darkmodetoggle";
import { Mail, CircleArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { forgotPassword } from "@/lib/auth-client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await forgotPassword(email);
      setSent(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-pixel-pattern relative">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-[1px] z-0 pointer-events-none"></div>
      <div className="absolute top-4 right-4 z-50 pointer-events-auto">
        <DarkModeToggle />
      </div>
      <Link
        href="/sign-in"
        className="absolute top-4 left-4 z-50 flex items-center gap-2 rounded-full bg-card/80 px-4 py-2 text-sm font-semibold text-foreground shadow-sm ring-1 ring-border backdrop-blur transition-colors hover:bg-primary hover:text-primary-foreground"
      >
        <CircleArrowLeft className="h-4 w-4" />
        Kembali
      </Link>

      <Card className="w-full max-w-md relative z-10" padding="lg">
        {sent ? (
          <div className="text-center py-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-emerald-500/10 text-emerald-600 mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold font-heading mb-2">Cek Emailmu! 📬</h1>
            <p className="text-muted-foreground text-sm">
              Jika akun dengan email <b>{email}</b> terdaftar, tautan reset sudah dikirim.
              Berlaku 1 jam.
            </p>
            <Button asChild className="mt-6 w-full" variant="outline">
              <Link href="/sign-in">Kembali ke Masuk</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-4">
                <Mail className="w-7 h-7" />
              </div>
              <h1 className="text-2xl font-bold font-heading mb-2">Lupa Password?</h1>
              <p className="text-muted-foreground text-sm">
                Masukkan email akunmu dan kami kirimkan tautan reset.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" className="w-full" size="lg" isLoading={loading}>
                Kirim Tautan Reset
              </Button>
            </form>
          </>
        )}
      </Card>
    </div>
  );
}