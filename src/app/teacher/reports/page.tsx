"use client";

import { useEffect, useState } from "react";
import { BarChart3, Users, BookOpen, TrendingUp } from "lucide-react";
import { fetchTeacherReports } from "@/lib/auth-client";

function avgColor(score: number | null) {
  if (score == null) return "bg-slate-400";
  if (score >= 80) return "bg-emerald-500";
  if (score >= 60) return "bg-amber-500";
  return "bg-red-500";
}

export default function TeacherReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeacherReports()
      .then(setReports)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totals = reports.reduce(
    (acc, r) => ({
      students: acc.students + r.students,
      completions: acc.completions + r.completions,
    }),
    { students: 0, completions: 0 }
  );

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-extrabold">Laporan</h1>
        <p className="text-muted-foreground mt-1">Ringkasan performa setiap kelas</p>
      </div>

      {/* Summary cards */}
      <div className="mb-6 grid gap-5 sm:grid-cols-3">
        {[
          { icon: BarChart3, value: reports.length, label: "Total Kelas", color: "bg-blue-500/10 text-blue-600" },
          { icon: Users, value: totals.students, label: "Total Murid", color: "bg-emerald-500/10 text-emerald-600" },
          { icon: BookOpen, value: totals.completions, label: "Pelajaran Diselesaikan", color: "bg-purple-500/10 text-purple-600" },
        ].map((card) => (
          <div key={card.label} className="flex items-center justify-between rounded-xl bg-card p-6 shadow-sm ring-1 ring-border">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full ${card.color}`}>
              <card.icon className="h-5 w-5" />
            </div>
            <div className="text-right">
              <p className="font-heading text-2xl font-extrabold">{card.value}</p>
              <p className="text-sm text-muted-foreground">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Per-class cards */}
      {loading ? (
        <p className="text-sm text-muted-foreground">Memuat...</p>
      ) : reports.length === 0 ? (
        <div className="rounded-xl bg-card p-12 text-center ring-1 ring-border">
          <BarChart3 className="mx-auto h-10 w-10 text-muted-foreground/50" />
          <p className="mt-3 text-sm text-muted-foreground">Belum ada data laporan.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {reports.map((r) => (
            <div key={r.className} className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-heading text-lg font-bold">Kelas {r.className}</h3>
                <span className="text-xs text-muted-foreground">{r.students} murid</span>
              </div>

              <div className="mb-4 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Pelajaran selesai</span>
                <span className="font-bold">{r.completions}</span>
              </div>

              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  Rata-rata nilai
                </span>
                <span className="font-bold">{r.avgScore ?? "-"}</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted">
                <div
                  className={`h-1.5 rounded-full ${avgColor(r.avgScore)}`}
                  style={{ width: `${r.avgScore ?? 0}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}