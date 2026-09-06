"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  AlertTriangle,
  Database,
  Shield,
} from "lucide-react";
import AdminHeader from "@/components/admin-header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const nav = [
    { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/users", icon: Users, label: "Manajemen Pengguna" },
    { href: "/admin/reports", icon: AlertTriangle, label: "Laporan & Moderasi" },
    { href: "/admin/settings", icon: Database, label: "Pengaturan Sistem" },
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
          <div className="rounded-xl bg-secondary/50 p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-xs font-bold font-heading">Mode Admin Sekolah</span>
            </div>
            <p className="text-xs text-muted-foreground">Kelola murid, guru, dan pengaturan sekolah Anda.</p>
          </div>
        </div>
      </aside>

      {/* --- MAIN --- */}
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}