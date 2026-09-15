"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  School as SchoolIcon,
  GraduationCap,
  Users,
  ShieldCheck,
  ArrowRight,
  Copy,
} from "lucide-react";
import { fetchSuperStats, fetchSuperSchools } from "@/lib/auth-client";

export default function SuperDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [schools, setSchools] = useState<any[]>([]);

  useEffect(() => {
    fetchSuperStats().then(setStats).catch(console.error);
    fetchSuperSchools().then(setSchools).catch(console.error);
  }, []);

  const cards = [
    { icon: SchoolIcon, label: "Total Sekolah", value: stats?.schools ?? "—", color: "bg-blue-500/10 text-blue-600" },
    { icon: GraduationCap, label: "Total Murid", value: stats?.students ?? "—", color: "bg-emerald-500/10 text-emerald-600" },
    { icon: Users, label: "Total Guru", value: stats?.teachers ?? "—", color: "bg-orange-500/10 text-orange-600" },
    { icon: ShieldCheck, label: "Admin Sekolah", value: stats?.admins ?? "—", color: "bg-purple-500/10 text-purple-600" },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-extrabold">Dashboard Platform</h1>
          <p className="text-muted-foreground mt-1">Denyut nadi NusaSkillz lintas sekolah</p>
        </div>
        <Link
          href="/super/schools"
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-purple-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:opacity-90"
        >
          Kelola Sekolah
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((c) => (
          <div key={c.label} className="rounded-xl bg-card p-5 shadow-sm ring-1 ring-border">
            <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-full ${c.color}`}>
              <c.icon className="h-5 w-5" />
            </div>
            <p className="font-heading text-2xl font-extrabold">{c.value}</p>
            <p className="text-xs text-muted-foreground">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Recent schools */}
      <div className="mt-8 rounded-xl bg-card shadow-sm ring-1 ring-border">
        <div className="border-b border-border px-6 py-4">
          <h2 className="font-heading text-lg font-bold">Sekolah Terbaru</h2>
        </div>
        <div className="divide-y divide-border">
          {schools.slice(0, 5).map((s) => (
            <div key={s.id} className="flex items-center gap-4 px-6 py-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
                <SchoolIcon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-heading font-bold">{s.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {s.principal || "—"} • bergabung {new Date(s.createdAt).toLocaleDateString("id-ID")}
                </p>
              </div>
              <code className="hidden sm:block rounded-lg bg-primary/10 px-3 py-1 font-mono text-xs font-bold text-primary">
                {s.code}
              </code>
              <div className="hidden md:flex items-center gap-3 text-xs font-semibold text-muted-foreground">
                <span>{s.students} murid</span>
                <span>{s.teachers} guru</span>
                <span>{s.admins} admin</span>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(s.code)}
                title="Salin kode"
                className="text-muted-foreground hover:text-foreground"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          ))}
          {schools.length === 0 && (
            <p className="px-6 py-8 text-center text-sm text-muted-foreground">Belum ada sekolah terdaftar.</p>
          )}
        </div>
      </div>
    </div>
  );
}