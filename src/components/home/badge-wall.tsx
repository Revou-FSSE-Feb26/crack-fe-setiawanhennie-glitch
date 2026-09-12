"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const BADGES = [
  { emoji: "🌱", name: "Langkah Pertama" },
  { emoji: "🔥", name: "Setia 3 Hari" },
  { emoji: "💯", name: "Kuis Sempurna" },
  { emoji: "⚡", name: "Combo x5" },
  { emoji: "🚀", name: "Level 5" },
  { emoji: "💎", name: "Kolektor XP" },
];

export default function BadgeWall() {
  const [collected, setCollected] = useState<string[]>([]);
  const all = collected.length === BADGES.length;

  const toggle = (name: string) =>
    setCollected((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <h2 className="font-heading text-3xl font-extrabold md:text-4xl">Koleksi lencanamu</h2>
        <p className="mt-2 text-muted-foreground">
          Klik semua lencana untuk mencoba sensasi mengoleksinya… ({collected.length}/{BADGES.length})
        </p>

        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-3 gap-4 sm:grid-cols-6">
          {BADGES.map((b) => {
            const got = collected.includes(b.name);
            return (
              <button
                key={b.name}
                onClick={() => toggle(b.name)}
                className={cn(
                  "group relative flex flex-col items-center gap-2 rounded-2xl border p-4 transition-all",
                  got
                    ? "scale-105 border-yellow-500/50 bg-yellow-500/10 shadow-md"
                    : "border-border bg-card hover:-translate-y-1 hover:shadow-md"
                )}
              >
                <span
                  className={cn(
                    "text-3xl transition-all",
                    got
                      ? "scale-110 grayscale-0"
                      : "opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0"
                  )}
                >
                  {b.emoji}
                </span>
                <span className="text-[10px] font-bold font-heading leading-tight">{b.name}</span>
                {got && (
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-500 text-white shadow">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {all && (
          <div className="mx-auto mt-8 max-w-md animate-bounce rounded-2xl bg-card p-5 shadow-lg ring-1 ring-yellow-500/40">
            <p className="font-heading text-lg font-extrabold">🏅 Lencana rahasia terbuka!</p>
            <p className="mt-1 text-sm text-muted-foreground">
              "Penjelajah NusaSkillz" — bayangkan koleksi aslimu nanti.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}