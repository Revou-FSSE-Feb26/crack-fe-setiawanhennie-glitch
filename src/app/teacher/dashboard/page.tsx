"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  BookOpen,
  ClipboardCheck,
  BarChart3,
  Settings,
  Search,
  Bell,
  Clock,
  Trophy,
  TrendingUp,
  School,
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
    <div className="flex min-h-svh bg-background">
      {/* --- SIDEBAR --- */}
      <aside className="hidden w-64 flex-col border-r border-border bg-card p-6 md:flex">
        <div className="flex items-center gap-2 mb-8">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="font-heading text-xl font-extrabold">NusaSkillz</span>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          <Link href="/teacher/dashboard" className="flex items-center gap-3 rounded-xl bg-primary/10 px-4 py-3 text-primary font-bold transition-colors">
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link href="/teacher/classes" className="flex items-center gap-3 rounded-xl px-4 py-3 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <Users className="h-5 w-5" />
            Kelas Saya
          </Link>
          <Link href="/teacher/materials" className="flex items-center gap-3 rounded-xl px-4 py-3 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <BookOpen className="h-5 w-5" />
            Materi & Kuis
          </Link>
          <Link href="/teacher/grading" className="flex items-center gap-3 rounded-xl px-4 py-3 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <ClipboardCheck className="h-5 w-5" />
            Penilaian
          </Link>
          <Link href="/teacher/reports" className="flex items-center gap-3 rounded-xl px-4 py-3 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <BarChart3 className="h-5 w-5" />
            Laporan
          </Link>
        </nav>

        <div className="mt-auto">
          <Link href="/teacher/settings" className="flex items-center gap-3 rounded-xl px-4 py-3 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <Settings className="h-5 w-5" />
            Pengaturan
          </Link>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="flex h-16 items-center justify-between border-b border-border bg-card/50 px-6 backdrop-blur-sm sticky top-0 z-40">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari murid atau kelas..."
                className="w-full h-9 pl-9 pr-4 rounded-lg bg-secondary border-none text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative text-muted-foreground hover:text-foreground">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-rose-500 border-2 border-background"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-border">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold font-heading">{teacher.name}</p>
                <p className="text-xs text-muted-foreground">Guru • {teacher.school || "-"}</p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                {teacher.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
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
                        {a.userName.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase()}
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
                        {s.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase()}
                      </div>
                      <p className="min-w-0 flex-1 truncate text-sm font-bold">{s.name}</p>
                      <span className="shrink-0 text-xs font-bold text-primary">{s.xp} XP</span>
                    </div>
                  )) ?? <p className="text-sm text-muted-foreground">Memuat...</p>}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="rounded-xl bg-gradient-to-br from-primary to-purple-600 p-6 text-white shadow-sm">
                <h3 className="font-heading text-lg font-bold">Aksi Cepat</h3>
                <p className="mt-1 text-sm text-white/80">Buat materi baru atau undang murid.</p>
                <button className="mt-4 w-full rounded-lg bg-white/20 px-4 py-2.5 text-sm font-bold transition-colors hover:bg-white/30">
                  + Buat Kuis Baru
                </button>
                <button className="mt-2 w-full rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-primary transition-colors hover:bg-white/90">
                  + Tambah Murid
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}