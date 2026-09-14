"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  GraduationCap,
  LayoutDashboard,
  School,
  LogOut,
  Crown,
} from "lucide-react";
import { logout } from "@/lib/auth-client";
import DarkModeToggle from "@/components/UI/darkmodetoggle";

export default function SuperLayout({ children }: { children: React.ReactNode }) {
  const [owner, setOwner] = useState({ name: "Owner", email: "" });
  const [accountOpen, setAccountOpen] = useState(false);
  const accountTimer = useRef<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const u = JSON.parse(stored);
      setOwner({ name: u.name || "Owner", email: u.email || "" });
    }
  }, []);

  const enterAccount = () => {
    clearTimeout(accountTimer.current);
    setAccountOpen(true);
  };
  const leaveAccount = () => {
    accountTimer.current = setTimeout(() => setAccountOpen(false), 200);
  };

  const nav = [
    { href: "/super/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/super/schools", icon: School, label: "Sekolah & Admin" },
  ];

  return (
    <div className="flex min-h-svh bg-background">
      {/* --- SIDEBAR --- */}
      <aside className="hidden w-64 flex-col border-r border-border bg-card p-6 md:flex">
        <div className="flex items-center gap-2 mb-8">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-600 text-primary-foreground">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <span className="font-heading text-xl font-extrabold">NusaSkillz</span>
            <p className="text-[10px] font-bold uppercase tracking-wider text-purple-600">Konsol Platform</p>
          </div>
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
      </aside>

      {/* --- MAIN --- */}
      <div className="flex-1 flex flex-col">
        <header className="flex h-16 items-center justify-between border-b border-border bg-card/50 px-6 backdrop-blur-sm sticky top-0 z-40">

          <div className="ml-auto flex items-center gap-1.5">
            <DarkModeToggle />
            <div className="mx-1.5 h-6 w-px bg-border" aria-hidden />
            <div className="relative" onMouseEnter={enterAccount} onMouseLeave={leaveAccount}>
              <button
                onClick={() => setAccountOpen((v) => !v)}
                className="flex items-center gap-2.5 rounded-full py-1 pl-2.5 pr-1.5 transition-colors hover:bg-secondary"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold font-heading">{owner.name}</p>
                  <p className="text-xs text-muted-foreground">Platform Owner</p>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-purple-600 text-white font-bold text-sm">
                  {owner.name.split(" ").map((w) => w[0].toUpperCase()).join("").slice(0, 2)}
                </div>
              </button>

              {accountOpen && (
                <div className="absolute right-0 top-full z-50 pt-2">
                  <div className="w-64 rounded-xl bg-card p-2 shadow-xl ring-1 ring-border">
                    <div className="border-b border-border px-3 py-3">
                      <p className="text-sm font-bold font-heading">{owner.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{owner.email}</p>
                      <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-purple-500/10 px-2.5 py-0.5 text-xs font-bold text-purple-600">
                        <Crown className="h-3 w-3" />
                        Super Admin
                      </span>
                    </div>
                    <div className="mt-1 space-y-0.5">
                      <Link
                        href="/super/dashboard"
                        onClick={() => setAccountOpen(false)}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-muted/50"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          clearTimeout(accountTimer.current);
                          logout();
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-500/10"
                      >
                        <LogOut className="h-4 w-4" />
                        Keluar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}