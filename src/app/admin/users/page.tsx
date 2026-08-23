"use client";

import { useEffect, useState } from "react";
import {
  fetchUsers,
  updateUserRole,
  toggleUserSuspend,
} from "@/lib/auth-client";
import {
  Users as UsersIcon,
  Shield,
  School,
  GraduationCap,
  AlertCircle,
  Ban,
  CheckCircle2,
  CircleArrowLeft,
  Search,
  LayoutDashboard,
  Database,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

type User = {
  id: string;
  name: string;
  email: string;
  role: "STUDENT" | "TEACHER" | "ADMIN";
  school?: string;
  className?: string;
  isSuspended: boolean;
  isVerified: boolean;
  createdAt: string;
};

const roleConfig = {
  STUDENT: { icon: GraduationCap, color: "bg-blue-500/10 text-blue-600", label: "Murid" },
  TEACHER: { icon: School, color: "bg-emerald-500/10 text-emerald-600", label: "Guru" },
  ADMIN: { icon: Shield, color: "bg-purple-500/10 text-purple-600", label: "Admin Sekolah" },
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"ALL" | "STUDENT" | "TEACHER" | "ADMIN">("ALL");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "ACTIVE" | "SUSPENDED">("ALL");

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchUsers();
      setUsers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRoleChange = async (userId: string, role: "STUDENT" | "TEACHER" | "ADMIN") => {
    try {
      await updateUserRole(userId, role);
      await loadUsers();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleToggleSuspend = async (userId: string, suspend: boolean) => {
    try {
      await toggleUserSuspend(userId, suspend);
      await loadUsers();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const filteredUsers = users.filter((user) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      user.name.toLowerCase().includes(q) ||
      user.email.toLowerCase().includes(q);

    const matchesRole = roleFilter === "ALL" || user.role === roleFilter;

    const matchesStatus =
      statusFilter === "ALL" ||
      (statusFilter === "SUSPENDED" ? user.isSuspended : !user.isSuspended);

    return matchesSearch && matchesRole && matchesStatus;
  });

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
          <Link href="/admin/dashboard" className="flex items-center gap-3 rounded-xl px-4 py-3 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 rounded-xl bg-primary/10 px-4 py-3 text-primary font-bold transition-colors">
            <UsersIcon className="h-5 w-5" />
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
              <span className="text-xs font-bold font-heading">Mode Admin</span>
            </div>
            <p className="text-xs text-muted-foreground">Kelola murid, guru, dan pengaturan sekolah Anda.</p>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="flex h-16 items-center justify-between border-b border-border bg-card/50 px-6 backdrop-blur-sm sticky top-0 z-40">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2 rounded-full bg-card/80 px-4 py-2 text-sm font-semibold text-foreground shadow-sm ring-1 ring-border backdrop-blur transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <CircleArrowLeft className="h-4 w-4" />
            Dashboard
          </Link>
          <p className="text-sm font-bold font-heading">Manajemen Pengguna</p>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <UsersIcon className="h-6 w-6" />
              </div>
              <div>
                <h1 className="font-heading text-2xl font-extrabold">Manajemen Pengguna</h1>
                <p className="text-sm text-muted-foreground">Kelola murid, guru, dan pengaturan sekolah Anda.</p>
              </div>
            </div>

            {error && (
              <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-500/10 p-3 text-sm text-red-600">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            {/* Filter & Search Bar */}
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Cari nama atau email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as any)}
                className="rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="ALL">Semua Role</option>
                <option value="STUDENT">Murid</option>
                <option value="TEACHER">Guru</option>
                <option value="ADMIN">Admin</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="ALL">Semua Status</option>
                <option value="ACTIVE">Aktif</option>
                <option value="SUSPENDED">Ditangguhkan</option>
              </select>
            </div>

            <div className="overflow-hidden rounded-xl bg-card shadow-sm ring-1 ring-border">
              <div className="border-b border-border bg-muted/30 px-6 py-3 text-xs font-semibold tracking-wide text-muted-foreground">
                Menampilkan {filteredUsers.length} dari {users.length} pengguna
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border bg-muted/20 text-xs uppercase text-muted-foreground">
                    <tr>
                      <th className="px-6 py-3 text-left">Nama</th>
                      <th className="px-6 py-3 text-left">Email</th>
                      <th className="px-6 py-3 text-left">Role</th>
                      <th className="px-6 py-3 text-left">Kelas</th>
                      <th className="px-6 py-3 text-left">Status</th>
                      <th className="px-6 py-3 text-left">Bergabung</th>
                      <th className="px-6 py-3 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-8 text-center text-muted-foreground">
                          Memuat...
                        </td>
                      </tr>
                    ) : filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-8 text-center text-muted-foreground">
                          Tidak ditemukan pengguna yang sesuai
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((user) => {
                        const RoleIcon = roleConfig[user.role].icon;
                        return (
                          <tr key={user.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                            <td className="px-6 py-4 font-medium">{user.name}</td>
                            <td className="px-6 py-4 text-muted-foreground">{user.email}</td>
                            <td className="px-6 py-4">
                              <div className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${roleConfig[user.role].color}`}>
                                <RoleIcon className="h-3 w-3" />
                                {roleConfig[user.role].label}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-muted-foreground">
                              {user.className ? `Kelas ${user.className}` : "-"}
                            </td>
                            <td className="px-6 py-4">
                              {user.isSuspended ? (
                                <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-bold text-red-600">
                                  <Ban className="h-3 w-3" /> Ditangguhkan
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-600">
                                  <CheckCircle2 className="h-3 w-3" /> Aktif
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-xs text-muted-foreground">
                              {new Date(user.createdAt).toLocaleDateString("id-ID")}
                            </td>
                            <td className="px-6 py-4">
                              {user.role === "ADMIN" ? (
                                <span className="text-xs text-muted-foreground">—</span>
                              ) : (
                                <div className="flex items-center justify-center gap-2">
                                  <select
                                    value={user.role}
                                    onChange={(e) => handleRoleChange(user.id, e.target.value as any)}
                                    className="rounded-md border border-border bg-background px-2 py-1 text-xs"
                                  >
                                    <option value="STUDENT">Murid</option>
                                    <option value="TEACHER">Guru</option>
                                  </select>
                                  <button
                                    onClick={() => handleToggleSuspend(user.id, !user.isSuspended)}
                                    className={`rounded-md px-3 py-1 text-xs font-semibold transition-colors ${
                                      user.isSuspended
                                        ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"
                                        : "bg-red-500/10 text-red-600 hover:bg-red-500/20"
                                    }`}
                                  >
                                    {user.isSuspended ? "Aktifkan" : "Tangguhkan"}
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}