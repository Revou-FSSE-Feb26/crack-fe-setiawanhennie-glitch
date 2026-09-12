"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { GraduationCap, LogOut } from "lucide-react";
import { Button } from "@/components/UI/button";
import { logout } from "@/lib/auth-client";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState("Murid");
  const pathname = usePathname();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setName(JSON.parse(stored).name || "Murid");
  }, []);

  // Quiz/lesson player is fullscreen — no navbar there
  if (pathname.startsWith("/student/lesson")) return <>{children}</>;

  return (
    <main className="min-h-svh bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/student/dashboard" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="font-heading text-xl font-extrabold">NusaSkillz</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm font-medium">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                {name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
              </div>
              <span>{name}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Keluar
            </Button>
          </div>
        </div>
      </header>
      {children}
    </main>
  );
}