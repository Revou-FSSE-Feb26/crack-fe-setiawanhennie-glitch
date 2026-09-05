"use client";

import { useEffect, useState } from "react";
import { Users, ChevronDown, ChevronUp, Ban } from "lucide-react";
import { fetchTeacherClasses } from "@/lib/auth-client";

export default function TeacherClassesPage() {
  const [classes, setClasses] = useState<any[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetchTeacherClasses().then(setClasses).catch(console.error);
  }, []);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-extrabold">Kelas Saya</h1>
        <p className="text-muted-foreground mt-1">Pantau murid di setiap kelas yang Anda ajar</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {classes.map((c) => (
          <div key={c.className} className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Users className="h-5 w-5" />
              </div>
              <button
                onClick={() => setExpanded(expanded === c.className ? null : c.className)}
                className="text-muted-foreground hover:text-foreground"
              >
                {expanded === c.className ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>

            <p className="mt-3 font-heading text-xl font-extrabold">Kelas {c.className}</p>
            <p className="text-sm text-muted-foreground">
              {c.count} murid • rata-rata {c.avgXp} XP
            </p>

            {expanded === c.className && (
              <div className="mt-4 space-y-2 border-t border-border pt-3">
                {c.students.map((s: any) => (
                  <div key={s.id} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1.5 font-medium">
                      {s.name}
                      {s.isSuspended && <Ban className="h-3 w-3 text-red-500" />}
                    </span>
                    <span className="text-xs text-muted-foreground">Lv {s.level} • {s.xp} XP</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}