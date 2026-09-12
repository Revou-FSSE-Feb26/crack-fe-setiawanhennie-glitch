"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/UI/button";
import {
  GraduationCap,
  Flame,
  Zap,
  BookOpen,
  LogOut,
  TrendingUp,
  Star,
  ArrowRight,
  Award,
  BookOpenCheck,
  type LucideIcon,
} from "lucide-react";
import { fetchStudentStats, logout } from "@/lib/auth-client";

type StatTone = "primary" | "accent" | "success";

function StatCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  tone: StatTone;
}) {
  const toneClasses: Record<StatTone, string> = {
    primary: "bg-primary/10 text-primary",
    accent: "bg-orange-500/10 text-orange-600",
    success: "bg-yellow-500/10 text-yellow-600",
  };

  return (
    <div className="flex flex-col items-center gap-1.5 rounded-2xl bg-card p-4 text-center ring-1 ring-border">
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${toneClasses[tone]}`}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="font-heading text-xl font-extrabold leading-none">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetchStudentStats().then(setStats).catch(console.error);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const user = stats?.user;
  const continueTarget = stats?.courses?.find((c: any) => c.nextLessonId);

  return (
    <main className="min-h-svh bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col gap-6">
        {!stats ? (
          <p className="text-muted-foreground">Memuat...</p>
        ) : (
          <>
            {/* Welcome */}
            <div>
              <h1 className="font-heading text-3xl font-extrabold">
                Halo, {user.name.split(" ")[0]}!
              </h1>
              <p className="text-muted-foreground mt-1">
                Siap untuk melanjutkan petualangan belajarmu hari ini?
              </p>
            </div>

            {/* Level & XP Card */}
            <div className="rounded-3xl bg-card p-6 shadow-sm ring-1 ring-border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Zap className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-heading">{user.xp} XP</h3>
                    <p className="text-sm text-muted-foreground">
                      {Math.max(0, stats.xpToNext - user.xp)} XP lagi ke Level {user.level + 1}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-bold bg-primary/10 text-primary px-3 py-1.5 rounded-full">
                  Level {user.level}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary">
                <div
                  className="h-2 rounded-full bg-primary transition-all"
                  style={{ width: `${Math.min(100, (user.xp / stats.xpToNext) * 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Stat row */}
            <div className="grid grid-cols-3 gap-3">
              <StatCard icon={Flame} label="Streak Harian" value={`${user.streak} Hari`} tone="accent" />
              <StatCard icon={BookOpenCheck} label="Pelajaran Selesai" value={`${stats.completedLessons}/${stats.totalLessons}`} tone="primary" />
              <StatCard icon={Award} label="Lencana" value={stats.badges.length} tone="success" />
            </div>

            {/* Continue Learning */}
            {continueTarget && (
              <div className="rounded-3xl bg-card p-5 ring-1 ring-border shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wide text-primary">Lanjutkan Belajar</p>
                    <h3 className="mt-1 font-heading text-lg font-bold truncate">{continueTarget.nextLesson}</h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {continueTarget.title} • {continueTarget.done} dari {continueTarget.total} pelajaran
                    </p>
                  </div>
                  <Button asChild className="shrink-0 font-heading">
                    <Link href={`/lesson?id=${continueTarget.nextLessonId}`}>
                      Mulai
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            )}

            {/* Main Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                {/* My Courses */}
                <div className="rounded-3xl bg-card p-6 shadow-sm ring-1 ring-border">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-heading text-xl font-bold flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      Kursusmu
                    </h2>
                    <Button asChild variant="ghost" size="sm" className="text-sm">
                      <Link href="/courses">Lihat Semua</Link>
                    </Button>
                  </div>
                  <div className="space-y-5">
                    {stats.courses.map((course: any) => (
                      <div key={course.id} className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-2xl">
                          {course.emoji}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="font-semibold font-heading">{course.title}</span>
                            <span className="text-sm text-muted-foreground">{course.done}/{course.total}</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-secondary">
                            <div
                              className="h-2 rounded-full bg-primary transition-all"
                              style={{ width: `${course.total ? Math.round((course.done / course.total) * 100) : 0}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Badges */}
                <div className="rounded-3xl bg-card p-6 shadow-sm ring-1 ring-border">
                  <h2 className="font-heading text-xl font-bold flex items-center gap-2 mb-6">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Pencapaian Terbaru
                  </h2>
                  {stats.badges.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      Belum ada lencana. Selesaikan pelajaran dan kuis untuk mendapatkannya!
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {stats.badges.slice(0, 8).map((b: any) => (
                        <div key={b.name} className="flex flex-col items-center text-center p-4 rounded-2xl bg-secondary/50 border border-border">
                          <div className="h-10 w-10 rounded-full bg-yellow-500/20 text-yellow-600 flex items-center justify-center mb-2 text-xl">
                            {b.icon}
                          </div>
                          <span className="text-xs font-bold font-heading leading-tight">{b.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Leaderboard */}
              <div className="space-y-6">
                <div className="rounded-3xl bg-card p-6 shadow-sm ring-1 ring-border h-full">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-heading text-xl font-bold flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Papan Peringkat
                    </h2>
                    <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                      Sekolahmu
                    </span>
                  </div>
                  <div className="space-y-3">
                    {stats.leaderboard.map((player: any) => (
                      <div
                        key={player.rank}
                        className={`flex items-center gap-3 p-3 rounded-2xl transition-colors ${
                          player.isUser ? "bg-primary/10 border border-primary/20" : "hover:bg-secondary/50"
                        }`}
                      >
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full font-bold text-sm ${
                            player.rank === 1 ? "bg-yellow-500 text-white" :
                            player.rank === 2 ? "bg-gray-400 text-white" :
                            player.rank === 3 ? "bg-orange-600 text-white" :
                            "bg-secondary text-muted-foreground"
                          }`}
                        >
                          {player.rank}
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-primary font-bold text-xs">
                          {player.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-bold truncate ${player.isUser ? "text-primary" : "text-foreground"}`}>
                            {player.name} {player.isUser && "(Kamu)"}
                          </p>
                          <p className="text-xs text-muted-foreground">{player.xp} XP</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}