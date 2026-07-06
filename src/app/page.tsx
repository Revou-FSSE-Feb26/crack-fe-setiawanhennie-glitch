import Link from "next/link"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import {
  Sparkles,
  Trophy,
  Flame,
  Award,
  Zap,
  Target,
  Briefcase,
} from "lucide-react"

export default async function HomePage() {
  const session = await auth.api.getSession()
  if (session?.user) redirect("/dashboard")

  const features = [
    {
      icon: Zap,
      title: "Earn XP & Level Up",
      desc: "Every module and assessment earns experience points. Track your journey from Beginner to Expert.",
    },
    {
      icon: Award,
      title: "Unlock Skill Badges",
      desc: "Collect verified achievements for course completions, top scores, and mastery milestones.",
    },
    {
      icon: Trophy,
      title: "Climb the Leaderboard",
      desc: "Compete with peers and see who's the top learner in your field this week.",
    },
    {
      icon: Flame,
      title: "Build Daily Streaks",
      desc: "Upskill a little every day and keep your streak alive for bonus rewards and perks.",
    },
  ]

  const skillTracks = [
    { emoji: "💻", name: "Tech & Code", color: "bg-[oklch(0.95_0.04_220)]" },
    { emoji: "📈", name: "Business & Finance", color: "bg-[oklch(0.95_0.05_150)]" },
    { emoji: "🎨", name: "Design & Creative", color: "bg-[oklch(0.96_0.05_80)]" },
    { emoji: "🗣️", name: "Language & Communication", color: "bg-[oklch(0.95_0.04_20)]" },
  ]

  return (
    <main className="min-h-svh bg-background">
      {/* Nav */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="font-heading text-xl font-extrabold">NusaSkillz</span>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost">
            <Link href="/sign-in">Sign in</Link>
          </Button>
          <Button asChild className="font-heading">
            <Link href="/sign-up">Get started</Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-10 pb-16 text-center">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-semibold text-secondary-foreground">
          <Target className="h-4 w-4" />
          Upskilling made engaging for ambitious professionals
        </div>
        <h1 className="mx-auto max-w-3xl text-balance font-heading text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
          Turn upskilling into an{" "}
          <span className="text-primary">epic career journey</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-lg text-muted-foreground leading-relaxed">
          NusaSkillz makes professional growth addictive. Complete modules, ace
          assessments, earn XP, and unlock badges across tech, business, design,
          and communication.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="font-heading text-base">
            <Link href="/sign-up">Start your journey — it&apos;s free</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="font-heading text-base"
          >
            <Link href="/sign-in">I already have an account</Link>
          </Button>
        </div>

        {/* Skill track pills */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
          {skillTracks.map((s) => (
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
              Why learners love NusaSkillz
            </h2>
            <p className="mt-2 text-muted-foreground">
              Game mechanics that keep professionals motivated and coming back.
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
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-accent text-accent-foreground">
            <Briefcase className="h-8 w-8" />
          </div>
        </div>
        <h2 className="mt-6 text-balance font-heading text-3xl font-extrabold md:text-4xl">
          Ready to level up your career?
        </h2>
        <p className="mt-3 text-muted-foreground">
          Join NusaSkillz today and start earning XP in minutes.
        </p>
        <Button asChild size="lg" className="mt-8 font-heading text-base">
          <Link href="/sign-up">Create your free account</Link>
        </Button>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <p>NusaSkillz — Gamified upskilling for ambitious minds.</p>
      </footer>
    </main>
  )
}