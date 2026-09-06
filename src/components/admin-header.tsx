"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Bell,
  Search,
  LogOut,
  LayoutDashboard,
  Settings,
  AlertTriangle,
  UserPlus,
  ShieldCheck,
} from "lucide-react";
import { fetchAdminStats, fetchOpenReports, logout } from "@/lib/auth-client";

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

export default function AdminHeader() {
  const [admin, setAdmin] = useState({ name: "Admin", email: "", school: "" });
  const [notifications, setNotifications] = useState<any[]>([]);
  const [hasNew, setHasNew] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const u = JSON.parse(stored);
      setAdmin({ name: u.name || "Admin", email: u.email || "", school: u.school || "" });
    }

    Promise.all([fetchOpenReports().catch(() => []), fetchAdminStats().catch(() => null)]).then(
      ([reports, stats]) => {
        const items: any[] = [];
        (reports || []).forEach((r: any) =>
          items.push({
            id: `report-${r.id}`,
            kind: "report",
            title: `Laporan baru: ${r.reason}`,
            detail: `${r.targetName} • oleh ${r.reporterName}`,
            at: r.createdAt,
          })
        );
        (stats?.recentUsers || []).forEach((u: any) =>
          items.push({
            id: `user-${u.id}`,
            kind: "user",
            title: `Pengguna baru: ${u.name}`,
            detail: u.role === "TEACHER" ? "Guru" : u.role === "ADMIN" ? "Admin Sekolah" : "Murid",
            at: u.createdAt,
          })
        );
        items.sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime());
        const top = items.slice(0, 8);
        setNotifications(top);
        const lastSeen = Number(localStorage.getItem("admin_notif_seen") || 0);
        setHasNew(top.some((n) => new Date(n.at).getTime() > lastSeen));
      }
    );
  }, []);

  const toggleNotif = () => {
    if (!notifOpen) {
      localStorage.setItem("admin_notif_seen", String(Date.now()));
      setHasNew(false);
    }
    setNotifOpen(!notifOpen);
    setAccountOpen(false);
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card/50 px-6 backdrop-blur-sm sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari pengguna, kursus, atau laporan..."
            className="w-full h-9 pl-9 pr-4 rounded-lg bg-secondary border-none text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* 🔔 Notifications */}
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
                  {notifications.length === 0 ? (
                    <p className="px-3 py-6 text-center text-sm text-muted-foreground">Tidak ada notifikasi.</p>
                  ) : (
                    notifications.map((n) => (
                      <div key={n.id} className="flex items-start gap-3 rounded-lg px-3 py-2.5 hover:bg-muted/50">
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                            n.kind === "report" ? "bg-red-500/10 text-red-600" : "bg-blue-500/10 text-blue-600"
                          }`}
                        >
                          {n.kind === "report" ? <AlertTriangle className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-bold">{n.title}</p>
                          <p className="truncate text-xs text-muted-foreground">
                            {n.detail} • {timeAgo(n.at)}
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

        {/* 👤 Account */}
        <div className="relative">
          <button
            onClick={() => {
              setAccountOpen(!accountOpen);
              setNotifOpen(false);
            }}
            className="flex items-center gap-3 pl-4 border-l border-border"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold font-heading">{admin.name}</p>
              <p className="text-xs text-muted-foreground">Admin Sekolah</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
              {admin.name.split(" ").map((w) => w[0].toUpperCase()).join("").slice(0, 2)}
            </div>
          </button>

          {accountOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setAccountOpen(false)} />
              <div className="absolute right-0 z-50 mt-3 w-64 rounded-xl bg-card p-2 shadow-xl ring-1 ring-border">
                <div className="border-b border-border px-3 py-3">
                  <p className="text-sm font-bold font-heading">{admin.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{admin.email}</p>
                  <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-purple-500/10 px-2.5 py-0.5 text-xs font-bold text-purple-600">
                    <ShieldCheck className="h-3 w-3" />
                    Admin • {admin.school || "-"}
                  </span>
                </div>
                <div className="mt-1 space-y-0.5">
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setAccountOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-muted/50"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <Link
                    href="/admin/settings"
                    onClick={() => setAccountOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-muted/50"
                  >
                    <Settings className="h-4 w-4" />
                    Pengaturan Sistem
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
  );
}