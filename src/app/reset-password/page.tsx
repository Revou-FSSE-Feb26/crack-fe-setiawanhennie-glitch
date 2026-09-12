"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/UI/button";
import Card from "@/components/UI/card";
import DarkModeToggle from "@/components/UI/darkmodetoggle";
import { Lock, Eye, EyeOff, CircleArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { resetPassword } from "@/lib/auth-client";

export default function ResetPasswordPage() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setToken(new URLSearchParams(window.location.search).get("token") || "");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Konfirmasi password tidak sama");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await resetPassword(token, password);
      setDone(true);
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
        {done ? (
          <div className="text-center py-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-emerald-500/10 text-emerald-600 mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold font-heading mb-2">Password Diubah! 🎉</h1>
            <p className="text-muted-foreground text-sm">Silakan masuk dengan password barumu.</p>
            <Button asChild className="mt-6 w-full">
              <Link href="/sign-in">Masuk Sekarang</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-4">
                <Lock className="w-7 h-7" />
              </div>
              <h1 className="text-2xl font-bold font-heading mb-2">Password Baru</h1>
              <p className="text-muted-foreground text-sm">Minimal 8 karakter.</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 text-red-600 text-sm font-medium">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-sm font-medium">
                  Password Baru <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type={show ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-border bg-secondary/40 py-2.5 pl-9 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">
                  Konfirmasi Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type={show ? "text" : "password"}
                    required
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className="w-full rounded-lg border border-border bg-secondary/40 py-2.5 pl-9 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" isLoading={loading}>
                Simpan Password Baru
              </Button>
            </form>
          </>
        )}
      </Card>
    </div>
  );
}