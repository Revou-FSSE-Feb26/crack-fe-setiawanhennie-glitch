import Link from "next/link"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import {
  Trophy,
  Flame,
  Award,
  Zap,
  Target,
  GraduationCap, 
} from "lucide-react"

export default async function HomePage() {
  const session = await auth.api.getSession()
  if (session?.user) redirect("/dashboard")

  const features = [
    {
      icon: Zap,
      title: "Dapatkan XP & Naik Level",
      desc: "Setiap pelajaran dan kuis memberimu poin pengalaman. Pantau perjalananmu dari Pemula hingga Legenda.",
    },
    {
      icon: Award,
      title: "Buka Lencana Prestasi",
      desc: "Kumpulkan lencana untuk pencapaian, nilai sempurna, dan streak belajar harian.",
    },
    {
      icon: Trophy,
      title: "Naiki Papan Peringkat",
      desc: "Bersaing dengan teman sekelas dan lihat siapa pelajar terbaik minggu ini.",
    },
    {
      icon: Flame,
      title: "Pertahankan Streak Harian",
      desc: "Belajar sedikit setiap hari dan pertahankan streak-mu untuk mendapatkan hadiah bonus.",
    },
  ]

  const subjects = [
    { emoji: "🔢", name: "Matematika", color: "bg-[oklch(0.95_0.04_220)]" },
    { emoji: "🔬", name: "Sains & IPA", color: "bg-[oklch(0.95_0.05_150)]" },
    { emoji: "📚", name: "Bahasa & Sastra", color: "bg-[oklch(0.96_0.05_80)]" },
    { emoji: "🌍", name: "Sejarah & Sosial", color: "bg-[oklch(0.95_0.04_20)]" },
  ]

  return (
    <main className="min-h-svh bg-background">
      {/* Nav */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="font-heading text-xl font-extrabold">NusaSkillz</span>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost">
            <Link href="/sign-in">Masuk</Link>
          </Button>
          <Button asChild className="font-heading">
            <Link href="/sign-up">Mulai Belajar</Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-10 pb-16 text-center">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-semibold text-secondary-foreground">
          <Target className="h-4 w-4" />
          Belajar jadi seru untuk semua pelajar
        </div>
        <h1 className="mx-auto max-w-3xl text-balance font-heading text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
          Jadikan belajar sebuah{" "}
          <span className="text-primary">petualangan seru!</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-lg text-muted-foreground leading-relaxed">
          NusaSkillz membuat belajar jadi ketagihan. Selesaikan pelajaran, 
          kerjakan kuis, kumpulkan XP, dan buka lencana di Matematika, IPA, 
          Bahasa, dan Sejarah.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="font-heading text-base">
            <Link href="/sign-up">Mulai petualanganmu</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="font-heading text-base"
          >
            <Link href="/sign-in">Saya sudah punya akun</Link>
          </Button>
        </div>

        {/* Subject pills */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
          {subjects.map((s) => (
            <div
              key={s.name}
              className={`flex items-center gap-2 rounded-2xl ${s.color} px-4 py-3 shadow-sm`}
            >
              <span className="text-2xl" aria-hidden>
                {s.emoji}
              </span>
              <span className="font-heading font-bold text-foreground">
                {s.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-3xl font-extrabold">
              Kenapa pelajar suka NusaSkillz?
            </h2>
            <p className="mt-2 text-muted-foreground">
              Sistem game yang membuatmu terus termotivasi dan semangat belajar.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-3xl bg-card p-6 shadow-sm ring-1 ring-border"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold">
                  {f.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-4 py-20 text-center">
        <div className="flex justify-center">
          {/* Changed to GraduationCap to match your login/register pages */}
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-accent text-accent-foreground">
            <GraduationCap className="h-8 w-8" />
          </div>
        </div>
        <h2 className="mt-6 text-balance font-heading text-3xl font-extrabold md:text-4xl">
          Siap menjadikan belajar sebuah petualangan?
        </h2>
        <p className="mt-3 text-muted-foreground">
          Bergabung dengan NusaSkillz hari ini dan mulai kumpulkan XP dalam hitungan menit.
        </p>
        <Button asChild size="lg" className="mt-8 font-heading text-base">
          <Link href="/sign-up">Buat akun gratis</Link>
        </Button>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <p>NusaSkillz — Belajar ala game untuk pelajar Indonesia.</p>
      </footer>
    </main>
  )
}