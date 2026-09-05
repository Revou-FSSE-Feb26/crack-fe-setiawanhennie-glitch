"use client";

import { useEffect, useState } from "react";
import { ClipboardCheck, FileCheck, TrendingUp, Award } from "lucide-react";
import { fetchTeacherGrading } from "@/lib/auth-client";

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

function scoreBadge(score: number | null) {
  if (score == null) return "bg-slate-500/10 text-slate-600";
  if (score >= 80) return "bg-emerald-500/10 text-emerald-600";
  if (score >= 60) return "bg-amber-500/10 text-amber-600";
  return "bg-red-500/10 text-red-600";
}

export default function TeacherGradingPage() {
  const [grading, setGrading] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeacherGrading()
      .then(setGrading)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const scored = grading.filter((g) => g.score != null);
  const avg = scored.length
    ? Math.round(scored.reduce((a, b) => a + b.score, 0) / scored.length)
    : null;
  const best = scored.length ? Math.max(...scored.map((g) => g.score)) : null;

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-extrabold">Penilaian</h1>
        <p className="text-muted-foreground mt-1">Hasil kuis dan pelajaran yang diselesaikan murid</p>
      </div>

      {/* Summary cards */}
      <div className="mb-6 grid gap-5 sm:grid-cols-3">
        {[
          { icon: FileCheck, value: grading.length, label: "Total Penilaian", color: "bg-blue-500/10 text-blue-600" },
          { icon: TrendingUp, value: avg ?? "—", label: "Rata-rata Nilai", color: "bg-purple-500/10 text-purple-600" },
          { icon: Award, value: best ?? "—", label: "Nilai Tertinggi", color: "bg-emerald-500/10 text-emerald-600" },
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

      {/* Table */}
      <div className="overflow-hidden rounded-xl bg-card shadow-sm ring-1 ring-border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/20 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-6 py-3 text-left">Murid</th>
                <th className="px-6 py-3 text-left">Kelas</th>
                <th className="px-6 py-3 text-left">Pelajaran</th>
                <th className="px-6 py-3 text-left">Nilai</th>
                <th className="px-6 py-3 text-left">Waktu</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">Memuat...</td>
                </tr>
              ) : grading.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    <ClipboardCheck className="mx-auto mb-2 h-8 w-8 text-muted-foreground/50" />
                    Belum ada penilaian.
                  </td>
                </tr>
              ) : (
                grading.map((g) => (
                  <tr key={g.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="px-6 py-4 font-medium">{g.user.name}</td>
                    <td className="px-6 py-4 text-muted-foreground">{g.user.className || "-"}</td>
                    <td className="px-6 py-4">{g.lesson.title}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${scoreBadge(g.score)}`}>
                        {g.score != null ? `${g.score}/100` : "-"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-muted-foreground">
                      {g.completedAt ? timeAgo(g.completedAt) : "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}