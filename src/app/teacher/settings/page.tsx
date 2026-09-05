"use client";

import { useEffect, useState } from "react";
import { Settings, Save, CheckCircle2, UserCircle, Bell } from "lucide-react";

const defaultSettings = {
  nip: "-",
  subject: "Matematika",
  notifyQuiz: true,
  notifyJoin: true,
  weeklyReport: true,
};

type SettingsType = typeof defaultSettings;

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

export default function TeacherSettingsPage() {
  const [teacher, setTeacher] = useState({ name: "", email: "", school: "" });
  const [settings, setSettings] = useState<SettingsType>(defaultSettings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const u = JSON.parse(storedUser);
      setTeacher({ name: u.name || "", email: u.email || "", school: u.school || "" });
    }
    try {
      const stored = localStorage.getItem("teacher_settings");
      if (stored) setSettings({ ...defaultSettings, ...JSON.parse(stored) });
    } catch {}
  }, []);

  const update = <K extends keyof SettingsType>(key: K, value: SettingsType[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem("teacher_settings", JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Settings className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-heading text-2xl font-extrabold">Pengaturan</h1>
            <p className="text-sm text-muted-foreground">Profil dan preferensi akun guru Anda</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Save className="h-4 w-4" />
          Simpan
        </button>
      </div>

      {saved && (
        <div className="mb-6 flex items-center gap-2 rounded-lg bg-emerald-500/10 p-3 text-sm font-semibold text-emerald-600">
          <CheckCircle2 className="h-4 w-4" />
          Pengaturan berhasil disimpan!
        </div>
      )}

      <div className="space-y-6">
        {/* Profil Guru */}
        <div className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <UserCircle className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold">Profil Guru</h3>
              <p className="text-xs text-muted-foreground">Informasi akun Anda</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold">Nama</label>
              <input
                type="text"
                value={teacher.name}
                disabled
                className="w-full rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm text-muted-foreground"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold">Email</label>
              <input
                type="text"
                value={teacher.email}
                disabled
                className="w-full rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm text-muted-foreground"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold">NIP / ID Guru</label>
              <input
                type="text"
                value={settings.nip}
                onChange={(e) => update("nip", e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold">Mata Pelajaran</label>
              <input
                type="text"
                value={settings.subject}
                onChange={(e) => update("subject", e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
        </div>

        {/* Notifikasi */}
        <div className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border">
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Bell className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold">Notifikasi</h3>
              <p className="text-xs text-muted-foreground">Kabar yang ingin Anda terima</p>
            </div>
          </div>

          <div className="divide-y divide-border">
            <Toggle
              checked={settings.notifyQuiz}
              onChange={(v) => update("notifyQuiz", v)}
              label="Murid menyelesaikan kuis"
              desc="Notifikasi saat ada kuis baru yang dinilai otomatis"
            />
            <Toggle
              checked={settings.notifyJoin}
              onChange={(v) => update("notifyJoin", v)}
              label="Murid baru bergabung"
              desc="Notifikasi saat murid baru masuk ke sekolah Anda"
            />
            <Toggle
              checked={settings.weeklyReport}
              onChange={(v) => update("weeklyReport", v)}
              label="Laporan mingguan"
              desc="Ringkasan performa kelas setiap Senin"
            />
          </div>
        </div>
      </div>
    </div>
  );
}