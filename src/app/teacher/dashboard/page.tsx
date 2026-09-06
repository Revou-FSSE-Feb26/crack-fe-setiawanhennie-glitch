"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Users,
  BookOpen,
  TrendingUp,
  School,
  Clock,
  Trophy,
  Plus,
  UserPlus,
} from "lucide-react";
import { fetchTeacherStats } from "@/lib/auth-client";

function timeAgo(dateString: string) {
  const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
  if (seconds < 60) return "Baru saja";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} menit lalu`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.floor(hours / 24);
  return `${days} hari lalu`;
}

function greeting() {
  const h = new Date().getHours();
  if (h < 11) return "Selamat Pagi";
  if (h < 15) return "Selamat Siang";
  if (h < 19) return "Selamat Sore";
  return "Selamat Malam";
}

const rankColors = ["bg-amber-500", "bg-slate-400", "bg-orange-700"];

export default function TeacherDashboardPage() {
  const [teacher, setTeacher] = useState({ name: "Guru", school: "" });
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const u = JSON.parse(stored);
      setTeacher({ name: u.name || "Guru", school: u.school || "" });
    }
  }, []);

  useEffect(() => {
    fetchTeacherStats()
      .then(setStats)
      .catch((e) => console.error("Failed to load teacher stats:", e));
  }, []);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-extrabold">
          {greeting()}, {teacher.name}!
        </h1>
        <p className="text-muted-foreground mt-1">Berikut adalah ringkasan kelas Anda hari ini.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Users, value: stats?.totalStudents ?? "—", label: "Total Murid", color: "bg-blue-500/10 text-blue-600" },
          { icon: School, value: stats?.activeClasses ?? "—", label: "Kelas Aktif", color: "bg-emerald-500/10 text-emerald-600" },
          { icon: BookOpen, value: stats?.totalCourses ?? "—", label: "Kursus Aktif", color: "bg-orange-500/10 text-orange-600" },
          { icon: TrendingUp, value: stats?.averageScore ?? "—", label: "Rata-rata Nilai", color: "bg-purple-500/10 text-purple-600" },
        ].map((card) => (
          <div key={card.label} className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border">
            <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-full ${card.color}`}>
              <card.icon className="h-5 w-5" />
            </div>
            <p className="font-heading text-2xl font-extrabold">{card.value}</p>
            <p className="text-sm text-muted-foreground">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Left: Recent Activity */}
        <div className="lg:col-span-2">
          <div className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-heading text-lg font-bold">
                <Clock className="h-5 w-5 text-primary" />
                Aktivitas Murid Terbaru
              </h3>
              <Link href="/teacher/reports" className="text-sm font-semibold text-muted-foreground hover:text-foreground">
                Lihat Semua
              </Link>
            </div>

            <div className="space-y-4">
              {stats?.recentActivity?.length === 0 && (
                <p className="text-sm text-muted-foreground">Belum ada aktivitas murid.</p>
              )}
              {stats?.recentActivity?.map((a: any) => (
                <div key={a.id} className="flex items-center gap-3 border-b border-border pb-3 last:border-0 last:pb-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {a.userName.split(" ").map((w: string) => w[0].toUpperCase()).join("").slice(0, 2)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{a.userName}</p>
                    <p className="truncate text-xs text-muted-foreground">menyelesaikan {a.lessonTitle}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-bold">{a.score != null ? `${a.score}/100` : "-"}</p>
                    <p className="text-xs text-muted-foreground">{timeAgo(a.completedAt)}</p>
                  </div>
                </div>
              )) ?? <p className="text-sm text-muted-foreground">Memuat...</p>}
            </div>
          </div>
        </div>

        {/* Right: Top Students + Quick Actions */}
        <div className="space-y-6">
          <div className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border">
            <h3 className="mb-4 flex items-center gap-2 font-heading text-lg font-bold">
              <Trophy className="h-5 w-5 text-amber-500" />
              Murid Teraktif Minggu Ini
            </h3>
            <div className="space-y-4">
              {stats?.topStudents?.map((s: any, i: number) => (
                <div key={s.id} className="flex items-center gap-3">
                  <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${rankColors[i]}`}>
                    {i + 1}
                  </span>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {s.name.split(" ").map((w: string) => w[0].toUpperCase()).join("").slice(0, 2)}
                  </div>
                  <p className="min-w-0 flex-1 truncate text-sm font-bold">{s.name}</p>
                  <span className="shrink-0 text-xs font-bold text-primary">{s.xp} XP</span>
                </div>
              )) ?? <p className="text-sm text-muted-foreground">Memuat...</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}