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
} from "lucide-react";

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const [teacher, setTeacher] = useState({ name: "Guru", school: "" });
  const pathname = usePathname();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const u = JSON.parse(stored);
      setTeacher({ name: u.name || "Guru", school: u.school || "" });
    }
  }, []);

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

        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}