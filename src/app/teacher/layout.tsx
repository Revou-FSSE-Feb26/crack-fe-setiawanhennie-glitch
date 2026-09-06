"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  LogOut,
} from "lucide-react";
import { fetchTeacherStats, logout } from "@/lib/auth-client";

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

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const [teacher, setTeacher] = useState({ name: "Guru", email: "", school: "" });
  const [activity, setActivity] = useState<any[]>([]);
  const [hasNew, setHasNew] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const u = JSON.parse(stored);
      setTeacher({ name: u.name || "Guru", email: u.email || "", school: u.school || "" });
    }
    fetchTeacherStats()
      .then((stats) => {
        const acts = stats.recentActivity ?? [];
        setActivity(acts);
        const lastSeen = Number(localStorage.getItem("notif_last_seen") || 0);
        setHasNew(acts.some((a: any) => new Date(a.completedAt).getTime() > lastSeen));
      })
      .catch(console.error);
  }, []);

  const toggleNotif = () => {
    if (!notifOpen) {
      localStorage.setItem("notif_last_seen", String(Date.now()));
      setHasNew(false);
    }
    setNotifOpen(!notifOpen);
    setAccountOpen(false);
  };

  const nav = [
    { href: "/teacher/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/teacher/classes", icon: Users, label: "Kelas Saya" },
    { href: "/teacher/materials", icon: BookOpen, label: "Materi & Kuis" },
    { href: "/teacher/grading", icon: ClipboardCheck, label: "Penilaian" },
    { href: "/teacher/reports", icon: BarChart3, label: "Laporan" },
  ];

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
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-colors ${
                pathname.startsWith(item.href)
                  ? "bg-primary/10 text-primary font-bold"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto">
          <Link
            href="/teacher/settings"
            className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-colors ${
              pathname.startsWith("/teacher/settings")
                ? "bg-primary/10 text-primary font-bold"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <Settings className="h-5 w-5" />
            Pengaturan
          </Link>
        </div>
      </aside>

      {/* --- MAIN --- */}
      <div className="flex-1 flex flex-col">
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
            {/* 🔔 Notification bell */}
            <div className="relative">
              <button onClick={toggleNotif} className="relative text-muted-foreground hover:text-foreground">
                <Bell className="h-5 w-5" />
                {hasNew && (
                  <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-rose-500 border-2 border-background"></span>
                )}
              </button>

              {notifOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                  <div className="absolute right-0 z-50 mt-3 w-80 rounded-xl bg-card p-2 shadow-xl ring-1 ring-border">
                    <p className="px-3 py-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                      Notifikasi
                    </p>
                    <div className="max-h-80 overflow-y-auto">
                      {activity.length === 0 ? (
                        <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                          Tidak ada notifikasi.
                        </p>
                      ) : (
                        activity.map((a) => (
                          <div key={a.id} className="flex items-start gap-3 rounded-lg px-3 py-2.5 hover:bg-muted/50">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                              {a.userName.split(" ").map((w: string) => w[0].toUpperCase()).join("").slice(0, 2)}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm">
                                <span className="font-bold">{a.userName}</span> menyelesaikan{" "}
                                <span className="font-semibold">{a.lessonTitle}</span>
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {timeAgo(a.completedAt)}
                                {a.score != null && ` • nilai ${a.score}`}
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* 👤 Account dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setAccountOpen(!accountOpen);
                  setNotifOpen(false);
                }}
                className="flex items-center gap-3 pl-4 border-l border-border"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold font-heading">{teacher.name}</p>
                  <p className="text-xs text-muted-foreground">Guru • {teacher.school || "-"}</p>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                  {teacher.name.split(" ").map((w) => w[0].toUpperCase()).join("").slice(0, 2)}
                </div>
              </button>

              {accountOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setAccountOpen(false)} />
                  <div className="absolute right-0 z-50 mt-3 w-64 rounded-xl bg-card p-2 shadow-xl ring-1 ring-border">
                    <div className="border-b border-border px-3 py-3">
                      <p className="text-sm font-bold font-heading">{teacher.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{teacher.email}</p>
                      <span className="mt-2 inline-flex rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-600">
                        Guru • {teacher.school || "-"}
                      </span>
                    </div>
                    <div className="mt-1 space-y-0.5">
                      <Link
                        href="/teacher/dashboard"
                        onClick={() => setAccountOpen(false)}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-muted/50"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Link>
                      <Link
                        href="/teacher/settings"
                        onClick={() => setAccountOpen(false)}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-muted/50"
                      >
                        <Settings className="h-4 w-4" />
                        Pengaturan
                      </Link>
                      <button
                        onClick={logout}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-500/10"
                      >
                        <LogOut className="h-4 w-4" />
                        Keluar
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}