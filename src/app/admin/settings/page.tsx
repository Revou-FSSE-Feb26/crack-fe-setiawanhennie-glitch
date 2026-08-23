"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  AlertTriangle,
  Database,
  Shield,
  Settings,
  Save,
  CheckCircle2,
  School,
  CalendarDays,
  UserPlus,
  Bell,
} from "lucide-react";

const defaultSettings = {
  schoolName: "SMA 1 Jakarta",
  npsn: "20100345",
  address: "Jl. Pendidikan No. 12, Jakarta",
  principal: "Drs. Ahmad Sudirman",
  contactEmail: "admin@sma1jakarta.sch.id",
  academicYear: "2025/2026",
  semester: "ganjil",
  classList: "10, 11, 12",
  allowStudentJoin: true,
  requireStudentApproval: false,
  autoApproveTeachers: true,
  weeklyReport: true,
  notifyTeacherJoin: true,
  notifyStudentSuspended: true,
};

type SettingsType = typeof defaultSettings;

/* ---------- Small building blocks ---------- */

function Toggle({
  checked,
  onChange,
  label,
  desc,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  desc: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? "bg-primary" : "bg-muted"
        }`}
      >
        <span
          className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : ""
          }`}
        />
      </button>
    </div>
  );
}

function SectionCard({
  icon: Icon,
  title,
  desc,
  children,
}: {
  icon: any;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <h3 className="font-heading text-lg font-bold">{title}</h3>
          <p className="text-xs text-muted-foreground">{desc}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mb-4 last:mb-0">
      <label className="mb-1.5 block text-sm font-semibold">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
      />
    </div>
  );
}

/* ---------- Page ---------- */

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SettingsType>(defaultSettings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("admin_settings");
      if (stored) setSettings({ ...defaultSettings, ...JSON.parse(stored) });
    } catch {
      // ignore corrupted storage
    }
  }, []);

  const update = <K extends keyof SettingsType>(key: K, value: SettingsType[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem("admin_settings", JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

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
          <Link href="/admin/users" className="flex items-center gap-3 rounded-xl px-4 py-3 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <Users className="h-5 w-5" />
            Manajemen Pengguna
          </Link>
          <Link href="/admin/reports" className="flex items-center gap-3 rounded-xl px-4 py-3 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <AlertTriangle className="h-5 w-5" />
            Laporan & Moderasi
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 rounded-xl bg-primary/10 px-4 py-3 text-primary font-bold transition-colors">
            <Settings className="h-5 w-5" />
            Pengaturan Sistem
          </Link>
        </nav>

        <div className="mt-auto">
          <div className="rounded-xl bg-secondary/50 p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <School className="h-4 w-4 text-primary" />
              <span className="text-xs font-bold font-heading">Mode Admin Sekolah</span>
            </div>
            <p className="text-xs text-muted-foreground">Kelola pengaturan sekolah Anda di NusaSkillz.</p>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col">
        <header className="flex h-16 items-center justify-between border-b border-border bg-card/50 px-6 backdrop-blur-sm sticky top-0 z-40">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2 rounded-full bg-card/80 px-4 py-2 text-sm font-semibold text-foreground shadow-sm ring-1 ring-border backdrop-blur transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <p className="text-sm font-bold font-heading">Pengaturan Sekolah</p>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Settings className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="font-heading text-2xl font-extrabold">Pengaturan Sekolah</h1>
                  <p className="text-sm text-muted-foreground">Konfigurasi sekolah Anda di platform NusaSkillz</p>
                </div>
              </div>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Save className="h-4 w-4" />
                Simpan Perubahan
              </button>
            </div>

            {saved && (
              <div className="mb-6 flex items-center gap-2 rounded-lg bg-emerald-500/10 p-3 text-sm font-semibold text-emerald-600">
                <CheckCircle2 className="h-4 w-4" />
                Pengaturan sekolah berhasil disimpan!
              </div>
            )}

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Profil Sekolah */}
              <SectionCard icon={School} title="Profil Sekolah" desc="Identitas sekolah yang tampil di platform">
                <TextField label="Nama Sekolah" value={settings.schoolName} onChange={(v) => update("schoolName", v)} />
                <TextField label="NPSN / ID Sekolah" value={settings.npsn} onChange={(v) => update("npsn", v)} />
                <TextField label="Alamat" value={settings.address} onChange={(v) => update("address", v)} />
                <TextField label="Kepala Sekolah" value={settings.principal} onChange={(v) => update("principal", v)} />
                <TextField label="Email Kontak Sekolah" value={settings.contactEmail} onChange={(v) => update("contactEmail", v)} />
              </SectionCard>

              {/* Tahun Ajaran */}
              <SectionCard icon={CalendarDays} title="Tahun Ajaran & Kelas" desc="Periode akademik yang sedang berjalan">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold">Tahun Ajaran</label>
                    <select
                      value={settings.academicYear}
                      onChange={(e) => update("academicYear", e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="2024/2025">2024/2025</option>
                      <option value="2025/2026">2025/2026</option>
                      <option value="2026/2027">2026/2027</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold">Semester Aktif</label>
                    <select
                      value={settings.semester}
                      onChange={(e) => update("semester", e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="ganjil">Ganjil</option>
                      <option value="genap">Genap</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <TextField
                    label="Daftar Kelas (pisahkan dengan koma)"
                    value={settings.classList}
                    onChange={(v) => update("classList", v)}
                  />
                  <p className="text-xs text-muted-foreground">Contoh: 10, 11, 12 atau 7, 8, 9</p>
                </div>
              </SectionCard>

              {/* Pendaftaran & Akses */}
              <SectionCard icon={UserPlus} title="Pendaftaran & Akses" desc="Aturan bergabung ke sekolah Anda">
                <div className="divide-y divide-border">
                  <Toggle
                    checked={settings.allowStudentJoin}
                    onChange={(v) => update("allowStudentJoin", v)}
                    label="Izinkan murid bergabung"
                    desc="Murid baru dapat mendaftar ke sekolah ini"
                  />
                  <Toggle
                    checked={settings.requireStudentApproval}
                    onChange={(v) => update("requireStudentApproval", v)}
                    label="Persetujuan manual untuk murid"
                    desc="Murid baru harus disetujui admin sebelum aktif"
                  />
                  <Toggle
                    checked={settings.autoApproveTeachers}
                    onChange={(v) => update("autoApproveTeachers", v)}
                    label="Otomatis setujui guru"
                    desc="Guru dengan email sekolah langsung aktif"
                  />
                </div>
              </SectionCard>

              {/* Notifikasi */}
              <SectionCard icon={Bell} title="Notifikasi" desc="Kabar yang dikirim ke admin sekolah">
                <div className="divide-y divide-border">
                  <Toggle
                    checked={settings.weeklyReport}
                    onChange={(v) => update("weeklyReport", v)}
                    label="Laporan progres mingguan"
                    desc="Ringkasan aktivitas murid & guru setiap Senin"
                  />
                  <Toggle
                    checked={settings.notifyTeacherJoin}
                    onChange={(v) => update("notifyTeacherJoin", v)}
                    label="Guru baru bergabung"
                    desc="Email saat ada guru mendaftar ke sekolah"
                  />
                  <Toggle
                    checked={settings.notifyStudentSuspended}
                    onChange={(v) => update("notifyStudentSuspended", v)}
                    label="Murid ditangguhkan"
                    desc="Email saat ada murid yang ditangguhkan"
                  />
                </div>
              </SectionCard>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}