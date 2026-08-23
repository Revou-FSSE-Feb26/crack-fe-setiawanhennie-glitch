"use client"

import Link from "next/link"
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  Shield,
  Database,
  AlertTriangle,
  Search,
  Bell,
  School,
} from "lucide-react"
import { useEffect, useState } from "react"
import { fetchAdminStats } from "@/lib/auth-client"

function timeAgo(dateString: string) {
  const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000)
  if (seconds < 60) return "Baru saja"
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} menit lalu`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} jam lalu`
  const days = Math.floor(hours / 24)
  return `${days} hari lalu`
}

export default function AdminDashboardPage() {
  const [admin, setAdmin] = useState({ name: "Admin", role: "Admin Sekolah", school: "" })
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    const stored = localStorage.getItem("user")
    if (stored) {
      const u = JSON.parse(stored)
      setAdmin({ name: u.name || "Admin", role: "Admin Sekolah", school: u.school || "" })
    }
  }, [])

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchAdminStats()
        setStats(data)
      } catch (error) {
        console.error("Failed to fetch admin stats:", error)
      }
    }
    loadStats()
  }, [])

  const classDistribution = stats?.classDistribution ?? []
  const maxClassCount = classDistribution.length
    ? Math.max(...classDistribution.map((c: any) => c._count._all))
    : 1

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
          <Link href="/admin/dashboard" className="flex items-center gap-3 rounded-xl bg-primary/10 px-4 py-3 text-primary font-bold transition-colors">
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 rounded-xl px-4 py-3 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <Users className="h-5 w-5" />
            Manajemen Pengguna
          </Link>
          <Link href="/admin/reports" className="flex items-center gap-3 rounded-xl px-4 py-3 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <AlertTriangle className="h-5 w-5" />
            Laporan & Moderasi
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 rounded-xl px-4 py-3 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <Database className="h-5 w-5" />
            Pengaturan Sistem
          </Link>
        </nav>

        <div className="mt-auto">
          <div className="rounded-xl bg-secondary/50 p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-xs font-bold font-heading">Mode Admin Sekolah</span>
            </div>
            <p className="text-xs text-muted-foreground">Kelola murid, guru, dan pengaturan sekolah Anda.</p>
          </div>
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
                placeholder="Cari murid, guru, atau kelas..."
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
                <p className="text-sm font-bold font-heading">{admin.name}</p>
                <p className="text-xs text-muted-foreground">{admin.role}</p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                {admin.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="mb-8">
            <h1 className="font-heading text-3xl font-extrabold">Pusat Kontrol Sekolah</h1>
            <p className="text-muted-foreground mt-1">
              Pantau aktivitas {admin.school || "sekolah Anda"} di NusaSkillz
            </p>
          </div>

          {/* School Stats Grid */}
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              { icon: Users, value: stats?.totalStudents ?? "—", label: "Total Murid", color: "bg-blue-500/10 text-blue-600" },
              { icon: GraduationCap, value: stats?.totalTeachers ?? "—", label: "Total Guru", color: "bg-emerald-500/10 text-emerald-600" },
              { icon: School, value: classDistribution.length || "—", label: "Total Kelas", color: "bg-purple-500/10 text-purple-600" },
            ].map((card) => (
              <div key={card.label} className="flex items-center justify-between rounded-xl bg-card p-6 shadow-sm ring-1 ring-border">
                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${card.color}`}>
                  <card.icon className="h-6 w-6" />
                </div>
                <div className="text-right">
                  <p className="font-heading text-2xl font-extrabold">{card.value}</p>
                  <p className="text-sm text-muted-foreground">{card.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Two Column Layout */}
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {/* Left Column: Class Distribution */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border">
                <h3 className="mb-4 flex items-center gap-2 font-heading text-lg font-bold">
                  <School className="h-5 w-5 text-primary" />
                  Distribusi Kelas
                </h3>

                {classDistribution.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Belum ada murid yang terdata di kelas manapun.</p>
                ) : (
                  classDistribution.map((c: any) => {
                    const count = c._count._all
                    const pct = Math.round((count / maxClassCount) * 100)
                    return (
                      <div key={c.className} className="mb-4 last:mb-0">
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span className="font-semibold">Kelas {c.className}</span>
                          <span className="text-xs text-muted-foreground">{count} murid</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-muted">
                          <div
                            className="h-1.5 rounded-full bg-primary transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>

            {/* Right Column: Recent Signups (school-scoped) */}
            <div className="space-y-6">
              <div className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border">
                <h3 className="mb-4 flex items-center gap-2 font-heading text-lg font-bold">
                  <Users className="h-5 w-5 text-primary" />
                  Pendaftaran Terbaru
                </h3>
                <div className="space-y-4">
                  {stats?.recentUsers?.map((u: any) => (
                    <div key={u.id} className="flex items-center gap-3 border-b border-border pb-3 last:border-0 last:pb-0">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                        {u.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold">{u.name}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {u.role === "TEACHER" ? "Guru" : u.role === "ADMIN" ? "Admin" : "Murid"} • {u.school || "-"}
                        </p>
                      </div>
                      <span className="shrink-0 text-xs text-muted-foreground">{timeAgo(u.createdAt)}</span>
                    </div>
                  )) ?? <p className="text-sm text-muted-foreground">Memuat...</p>}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}