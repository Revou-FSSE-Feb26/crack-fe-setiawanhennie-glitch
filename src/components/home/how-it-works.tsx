"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, BookOpen, Zap, type LucideIcon } from "lucide-react";

const STEPS = [
  { step: "01", title: "Daftar & verifikasi", desc: "Buat akun gratis dan verifikasi emailmu dalam 30 detik.", icon: CheckCircle2 },
  { step: "02", title: "Pilih kursus", desc: "Jelajahi mata pelajaran dan mulai dari level yang sesuai.", icon: BookOpen },
  { step: "03", title: "Belajar & raih XP", desc: "Selesaikan pelajaran, kumpulkan XP, dan naik level!", icon: Zap },
];

function CountUp({ target, started, delay }: { target: number; started: boolean; delay: number }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!started) return;
    const startTimer = setTimeout(() => {
      const duration = 800;
      const t0 = performance.now();
      let raf = 0;
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(target * eased));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(startTimer);
  }, [started, target, delay]);

  return <>{String(value).padStart(2, "0")}</>;
}

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="scroll-mt-24 flex min-h-[calc(100svh-6rem)] items-center py-16"
      id="cara-kerja"
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-extrabold md:text-4xl">
            Mulai dalam 3 langkah mudah!
          </h2>
          <p className="mt-2 text-muted-foreground">
            Tidak perlu setup rumit. Langsung belajar dalam hitungan menit.
          </p>
        </div>

        <div className="relative grid gap-6 md:grid-cols-3">
          {/* Animated dashed line (SVG so we can draw it) */}
          <svg
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-9 hidden h-2 w-full md:block"
            preserveAspectRatio="none"
            viewBox="0 0 1000 8"
          >
            <line
              x1="80"
              y1="4"
              x2="920"
              y2="4"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="8 8"
              className="text-border"
              style={{
                strokeDasharray: started ? "8 8" : "1000",
                strokeDashoffset: started ? 0 : 1000,
                transition: "stroke-dashoffset 1.2s ease-out, stroke-dasharray 0.01s 1.2s",
              }}
            />
          </svg>

          {STEPS.map((item, i) => {
            const delay = i * 300; // stagger
            return (
              <div
                key={item.step}
                className="hover-wiggle group relative flex flex-col items-center text-center md:items-start md:text-left"
                style={{
                  opacity: started ? 1 : 0,
                  transform: started ? "translateY(0)" : "translateY(24px)",
                  transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
                }}
              >
                {/* Circle with pop-in */}
                <div
                  className={`relative z-10 flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-primary bg-card ${
                    started ? "animate-pop-in" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${delay + 200}ms` }}
                >
                  {started && (
                    <div className="absolute inset-0 rounded-full animate-pulse-ring" />
                  )}
                  <span className="relative z-10 font-heading text-lg font-extrabold text-primary">
                    <CountUp target={i + 1} started={started} delay={delay + 200} />
                  </span>
                </div>

                {/* Icon with scale-in */}
                <div
                  className="step-icon mt-4"
                  style={{
                    opacity: started ? 1 : 0,
                    transform: started ? "scale(1) rotate(0deg)" : "scale(0) rotate(-45deg)",
                    transition: `opacity 0.5s ease-out ${delay + 400}ms, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay + 400}ms`,
                  }}
                >
                  <item.icon className="h-5 w-5 text-accent-foreground" />
                </div>

                <h3
                  className="mt-2 font-heading text-lg font-bold"
                  style={{
                    opacity: started ? 1 : 0,
                    transform: started ? "translateY(0)" : "translateY(8px)",
                    transition: `opacity 0.5s ease-out ${delay + 500}ms, transform 0.5s ease-out ${delay + 500}ms`,
                  }}
                >
                  {item.title}
                </h3>

                <p
                  className="mt-1 text-sm leading-relaxed text-muted-foreground"
                  style={{
                    opacity: started ? 1 : 0,
                    transform: started ? "translateY(0)" : "translateY(8px)",
                    transition: `opacity 0.5s ease-out ${delay + 600}ms, transform 0.5s ease-out ${delay + 600}ms`,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}