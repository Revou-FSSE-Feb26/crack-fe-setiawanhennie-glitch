"use client";

import { useEffect, useState } from "react";

const COLORS = ["#6366f1", "#a855f7", "#f59e0b", "#10b981", "#ef4444", "#3b82f6"];

function LevelUpToast({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] flex items-start justify-center pt-24">
      {Array.from({ length: 40 }).map((_, i) => (
        <span
          key={i}
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 0.8}s`,
            backgroundColor: COLORS[i % COLORS.length],
          }}
        />
      ))}
    </div>
  );
}

export default function XpScrollBar() {
  const [progress, setProgress] = useState(0);
  const [leveled, setLeveled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      setProgress(p);
      if (p >= 0.99) setLeveled(true);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-[60] h-1.5 bg-secondary/50">
        <div
          className="relative h-full bg-gradient-to-r from-primary via-purple-500 to-yellow-400 transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        >
          <div className="absolute inset-0 animate-pulse rounded-full bg-white/30" />
        </div>
      </div>
      {leveled && <LevelUpToast onClose={() => setLeveled(false)} />}
    </>
  );
}