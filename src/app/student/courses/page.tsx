"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/UI/button";
import { Search, Flame, Lock, ChevronRight, Sparkles } from "lucide-react";
import { fetchStudentStats } from "@/lib/auth-client";

export default function StudentCoursesPage() {
  const [stats, setStats] = useState<any>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchStudentStats().then(setStats).catch(console.error);
  }, []);

  const allCourses = stats?.courses ?? [];
  const courses = allCourses.filter((c: any) =>
    c.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Header + Daily Mission */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-extrabold">Jelajah Kursus</h1>
        <p className="text-muted-foreground mt-1">Pilih petualangan belajarmu selanjutnya.</p>
        <div className="mt-6 relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-purple-600 p-6 text-primary-foreground shadow-lg">
          <div className="relative z-10 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <Flame className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide opacity-80">Misi Harian</p>
              <h3 className="font-heading text-lg font-bold">
                Selesaikan 1 pelajaran hari ini untuk menjaga streak {stats?.user?.streak ?? 0} hari-mu!
              </h3>
            </div>
          </div>
          <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 bg-white/10 rounded-full blur-2xl"></div>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Cari kursus atau topik..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-12 pl-12 pr-4 rounded-2xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
      </div>

      {/* Grid */}
      <div className="grid gap-5 sm:grid-cols-2">
        {courses.map((course: any) => {
          const progress = course.total ? Math.round((course.done / course.total) * 100) : 0;
          const targetId = course.nextLessonId || course.firstLessonId;
          return (
            <div
              key={course.id}
              className={`group relative rounded-3xl bg-card p-6 ring-1 ring-border transition-all hover:shadow-lg hover:-translate-y-1 ${
                course.isLocked ? "opacity-70" : ""
              }`}
            >
              {course.isLocked && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-muted px-3 py-1 rounded-full text-xs font-bold text-muted-foreground">
                  <Lock className="h-3 w-3" />
                  Terkunci
                </div>
              )}
              <div className="flex items-start gap-4">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-3xl ${course.color}`}>
                  {course.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading text-xl font-bold truncate">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{course.description}</p>
                </div>
              </div>

              <div className="mt-5">
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-muted-foreground">
                    {course.done} dari {course.total} pelajaran
                  </span>
                  <span className="text-primary">{progress}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                  <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }}></div>
                </div>
              </div>

              <div className="mt-5">
                {course.isLocked ? (
                  <Button disabled className="w-full" variant="outline">
                    <Lock className="h-4 w-4 mr-2" />
                    Terkunci
                  </Button>
                ) : course.done === course.total && course.total > 0 ? (
                  <Button asChild className="w-full font-heading" variant="secondary">
                    <Link href={`/student/lesson?id=${course.firstLessonId}`}>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Ulangi Kursus
                    </Link>
                  </Button>
                ) : course.done === 0 ? (
                  <Button asChild className="w-full font-heading">
                    <Link href={`/student/lesson?id=${course.firstLessonId}`}>
                      Mulai Belajar
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                ) : (
                  <Button asChild className="w-full font-heading">
                    <Link href={`/student/lesson?id=${course.nextLessonId}`}>
                      Lanjutkan
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}