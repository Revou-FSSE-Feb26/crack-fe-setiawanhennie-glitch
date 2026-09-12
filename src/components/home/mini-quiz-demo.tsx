"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/UI/button";
import { Check, X as XIcon, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const QUESTIONS = [
  { q: "Ibu kota Indonesia adalah?", options: ["Bandung", "Jakarta", "Surabaya", "Medan"], answer: "Jakarta" },
  { q: "7 × 8 = ?", options: ["54", "56", "58", "64"], answer: "56" },
];

export default function MiniQuizDemo() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [xp, setXp] = useState(0);
  const [done, setDone] = useState(false);

  const current = QUESTIONS[step];
  const correct = selected === current.answer;

  const handleCheck = () => {
    if (!selected) return;
    setChecked(true);
    if (selected === current.answer) setXp((x) => x + 10);
  };

  const handleContinue = () => {
    if (step < QUESTIONS.length - 1) {
      setStep((s) => s + 1);
      setSelected(null);
      setChecked(false);
    } else {
      setDone(true);
    }
  };

  return (
    <section className="py-20" id="coba">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-3xl font-extrabold md:text-4xl">Rasakan sendiri sebelum daftar</h2>
          <p className="mt-2 text-muted-foreground">
            Coba mini kuis di bawah — persis seperti pengalaman belajar aslinya.
          </p>
        </div>

        <div className="mx-auto max-w-xl overflow-hidden rounded-3xl bg-card shadow-lg ring-1 ring-border">
          {done ? (
            <div className="p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 animate-bounce items-center justify-center rounded-full bg-yellow-500/10 text-3xl">
                🏆
              </div>
              <h3 className="font-heading text-2xl font-extrabold">Demo Selesai!</h3>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 font-bold text-primary">
                <Zap className="h-4 w-4 fill-current" /> +{xp} XP
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Bayangkan merasakan ini setiap hari, di semua mata pelajaran.
              </p>
              <Button asChild size="lg" className="mt-6 w-full font-heading">
                <Link href="/sign-up?ref=demo">Mulai petualangan asli</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="border-b border-border p-6 pb-4">
                <div className="mb-2 flex items-center justify-between text-xs font-bold text-muted-foreground">
                  <span>Soal {step + 1}/{QUESTIONS.length}</span>
                  <span className="flex items-center gap-1 text-primary">
                    <Zap className="h-3.5 w-3.5 fill-current" />
                    {xp} XP
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div
                    className="h-2 rounded-full bg-primary transition-all"
                    style={{ width: `${(step / QUESTIONS.length) * 100}%` }}
                  />
                </div>
                <h3 className="mt-4 font-heading text-xl font-extrabold">{current.q}</h3>
              </div>

              <div className="grid gap-3 p-6 sm:grid-cols-2">
                {current.options.map((opt) => {
                  const isSel = selected === opt;
                  const isCorrectOpt = checked && opt === current.answer;
                  const isWrongOpt = checked && isSel && !correct;
                  return (
                    <button
                      key={opt}
                      disabled={checked}
                      onClick={() => setSelected(opt)}
                      className={cn(
                        "flex items-center justify-between rounded-2xl border-2 p-4 text-left font-semibold transition-all",
                        !checked && !isSel && "border-border hover:border-primary/50 hover:bg-primary/5",
                        !checked && isSel && "border-primary bg-primary/10 text-primary",
                        isCorrectOpt && "border-emerald-500 bg-emerald-500/10 text-emerald-700",
                        isWrongOpt && "border-rose-500 bg-rose-500/10 text-rose-700"
                      )}
                    >
                      {opt}
                      {isCorrectOpt && <Check className="h-5 w-5 text-emerald-500" />}
                      {isWrongOpt && <XIcon className="h-5 w-5 text-rose-500" />}
                    </button>
                  );
                })}
              </div>

              <footer
                className={cn(
                  "border-t p-5 transition-colors",
                  !checked && "border-border",
                  checked && correct && "border-emerald-500/20 bg-emerald-500/10",
                  checked && !correct && "border-rose-500/20 bg-rose-500/10"
                )}
              >
                {checked && (
                  <p className={cn("mb-3 text-sm font-bold", correct ? "text-emerald-700" : "text-rose-700")}>
                    {correct ? "Benar Sekali! 🎉 +10 XP" : `Kurang tepat... jawaban: ${current.answer}`}
                  </p>
                )}
                {!checked ? (
                  <Button className="w-full font-heading" disabled={!selected} onClick={handleCheck}>
                    Periksa Jawaban
                  </Button>
                ) : (
                  <Button
                    className={cn(
                      "w-full font-heading",
                      correct ? "bg-emerald-600 hover:bg-emerald-700" : "bg-rose-600 hover:bg-rose-700"
                    )}
                    onClick={handleContinue}
                  >
                    Lanjutkan
                  </Button>
                )}
              </footer>
            </>
          )}
        </div>
      </div>
    </section>
  );
}