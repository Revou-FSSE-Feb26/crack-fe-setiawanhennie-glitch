import Link from "next/link"
import { Button } from "@/components/UI/button"
import {
  Trophy,
  Flame,
  Award,
  Zap,
  GraduationCap,
  CheckCircle2,
  BookOpen,
  School,
  ArrowRight,
  Calculator,
  FlaskConical,
  Languages,
  Landmark,
  PhoneCall,
  Star,
  Mail,
} from "lucide-react"
import DarkModeToggle from "@/components/UI/darkmodetoggle"
import Reveal from "@/components/UI/reveal"
import InquiryForm from "@/components/inquiry-form"

export default function HomePage() {
  const mapNodes = [
    { icon: Calculator, name: "Matematika", level: "Lvl 1", state: "current" },
    { icon: FlaskConical, name: "Sains", level: "Lvl 2", state: "unlocked" },
    { icon: Languages, name: "Bahasa", level: "Lvl 3", state: "locked" },
    { icon: Landmark, name: "Sejarah", level: "Lvl 4", state: "locked" },
    { icon: Trophy, name: "Juara", level: "???", state: "locked", isGoal: true },
  ]

  const features = [
    { icon: Zap, title: "Dapatkan XP & naik level", desc: "Setiap pelajaran dan kuis memberimu poin pengalaman. Pantau perjalananmu dari Pemula hingga Legenda." },
    { icon: Award, title: "Buka lencana prestasi", desc: "Kumpulkan lencana untuk pencapaian, nilai sempurna, dan streak belajar harian." },
    { icon: Trophy, title: "Naiki papan peringkat", desc: "Bersaing dengan teman sekelas dan lihat siapa pelajar terbaik minggu ini." },
    { icon: Flame, title: "Pertahankan streak harian", desc: "Belajar sedikit setiap hari dan pertahankan streak-mu untuk mendapatkan hadiah bonus." },
  ]

  const howItWorks = [
    { step: "01", title: "Daftar & verifikasi", desc: "Buat akun gratis dan verifikasi emailmu dalam 30 detik.", icon: CheckCircle2 },
    { step: "02", title: "Pilih kursus", desc: "Jelajahi mata pelajaran dan mulai dari level yang sesuai.", icon: BookOpen },
    { step: "03", title: "Belajar & raih XP", desc: "Selesaikan pelajaran, kumpulkan XP, dan naik level!", icon: Zap },
  ]

  return (
    <main className="min-h-svh bg-background">
      {/* Nav */}
      <header className="mx-auto flex items-center justify-between px-4 py-5 sticky top-0 z-50 bg-background/90 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="font-heading text-xl font-extrabold">NusaSkillz</span>
        </Link>

        <div className="flex items-center gap-2">
          <DarkModeToggle />
          <Button asChild variant="ghost" className="rounded-full">
            <Link href="/sign-in">Masuk</Link>
          </Button>
          <Button asChild className="rounded-full font-heading">
            <Link href="/sign-up">Mulai Belajar</Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-4 pt-14">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-[140%] rounded-full bg-primary/15 blur-[90px]" aria-hidden />
        <div className="pointer-events-none absolute -top-10 left-1/2 h-64 w-64 translate-x-[60%] rounded-full bg-accent/20 blur-[90px]" aria-hidden />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Left Column - Text Content */}
          <div className="text-left">
            <h1 className="text-balance font-heading text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Jadikan belajar sebuah{" "}
              <span className="text-primary">petualangan seru!</span>
            </h1>
            
            <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Selesaikan pelajaran, kerjakan kuis, kumpulkan XP, dan buka level
              baru di Matematika, IPA, Bahasa, dan Sejarah.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="rounded-full font-heading text-base">
                <Link href="/sign-up">Mulai petualanganmu</Link>
              </Button>
              <Link href="tel:+622150001234" className="group flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <PhoneCall className="h-4 w-4" />
                </span>
                <span className="text-left">
                  <span className="block font-heading text-sm font-bold">(021) 5000-1234</span>
                  <span className="block text-xs text-muted-foreground">Untuk pertanyaan seputar pendaftaran</span>
                </span>
              </Link>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative mx-auto w-full max-w-lg">         
            {/* Image container with circular mask */}
                <img
                  src="/output-onlinegiftools.gif"
                  alt="Siswa bahagia belajar dengan NusaSkillz"
                  className="h-full w-full object-cover"
                />

            {/* Floating badge - Rating (top right) */}
            <div className="absolute -top-4 -right-4 rounded-2xl bg-card px-4 py-3 shadow-lg ring-1 ring-border animate-float-badge">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-600">
                  <Star className="h-4 w-4 fill-yellow-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Rating</p>
                  <p className="font-heading text-sm font-bold">4.9/5.0</p>
                </div>
              </div>
            </div>

            {/* Floating badge - XP (bottom left) */}
            <div className="absolute -bottom-4 -left-4 rounded-2xl bg-card px-4 py-3 shadow-lg ring-1 ring-border animate-float-badge-delayed">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Zap className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">XP Dikumpulkan</p>
                  <p className="font-heading text-sm font-bold text-primary">10,000+ XP</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-3xl font-extrabold md:text-4xl">Mulai dalam 3 langkah mudah</h2>
            <p className="mt-2 text-muted-foreground">Tidak perlu setup rumit. Langsung belajar dalam hitungan menit.</p>
          </div>
          <div className="relative grid gap-6 md:grid-cols-3">
            <div className="absolute left-0 right-0 top-9 hidden h-0 border-t-2 border-dashed border-border md:block" aria-hidden />
            {howItWorks.map((item) => (
              <div key={item.step} className="relative flex flex-col items-center text-center md:items-start md:text-left">
                <div className="relative z-10 flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-primary bg-card">
                  <span className="font-heading text-lg font-extrabold text-primary">{item.step}</span>
                </div>
                <item.icon className="mt-4 h-5 w-5 text-accent-foreground" />
                <h3 className="mt-2 font-heading text-lg font-bold">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features — the expanded version of the hero trio */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-3xl font-extrabold md:text-4xl">Kenapa pelajar suka NusaSkillz?</h2>
            <p className="mt-2 text-muted-foreground">Sistem game yang membuatmu terus termotivasi dan semangat belajar.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, index) => (
              <Reveal key={f.title} delay={index * 120}>
                <div className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border transition-all hover:-translate-y-1 hover:shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <f.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-bold">{f.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* For Teachers */}
      <Reveal direction="left">
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white md:p-12">
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold">
                    <School className="h-4 w-4" />
                    Untuk Guru & Sekolah
                  </div>
                  <h2 className="mb-4 font-heading text-3xl font-extrabold md:text-4xl">Pantau progress murid dengan mudah</h2>
                  <p className="mb-6 leading-relaxed text-white/80">
                    Dashboard khusus guru untuk melihat statistik kelas, menilai tugas, dan membuat kuis interaktif.
                    Semua dalam satu platform.
                  </p>
                  <ul className="mb-6 space-y-2">
                    {["Laporan progress real-time", "Buat kuis & materi sendiri", "Sistem penilaian otomatis"].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="rounded-full bg-white font-heading text-slate-900 hover:bg-white/90">
                    <Link href="/teacher/dashboard">
                      Lihat dashboard guru
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                <div className="hidden justify-center md:flex">
                  <div className="w-72 rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur">
                    <p className="mb-3 font-heading text-xs font-bold uppercase tracking-wide text-white/60">Kelas 9B · Papan Peringkat</p>
                    <div className="space-y-2.5">
                      {[
                        { name: "Ayu R.", xp: "1,240 XP", w: "w-[92%]" },
                        { name: "Dimas P.", xp: "1,105 XP", w: "w-[80%]" },
                        { name: "Nadia S.", xp: "980 XP", w: "w-[68%]" },
                      ].map((row, i) => (
                        <div key={row.name} className="flex items-center gap-2 text-xs">
                          <span className="w-4 shrink-0 font-heading font-bold text-accent">{i + 1}</span>
                          <span className="w-16 shrink-0 truncate text-white/90">{row.name}</span>
                          <div className="h-1.5 flex-1 rounded-full bg-white/10">
                            <div className={`h-1.5 ${row.w} rounded-full bg-accent`} />
                          </div>
                          <span className="w-14 shrink-0 text-right text-white/60">{row.xp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Contact / Inquiry Form */}
      <Reveal direction="left">
        <section className="mx-auto max-w-6xl px-4 pb-20">
          <div className="relative overflow-hidden rounded-xl bg-primary px-6 py-16 text-primary-foreground md:px-12">
            <div className="pointer-events-none absolute -bottom-16 -right-10 h-56 w-56 rounded-full bg-white/10 blur-2xl" aria-hidden />
            <div className="pointer-events-none absolute -top-16 -left-10 h-56 w-56 rounded-full bg-white/10 blur-2xl" aria-hidden />

            <div className="relative grid items-center gap-10 md:grid-cols-2">
              {/* Left: Heading + contact info */}
              <div className="text-left">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold">
                  <PhoneCall className="h-4 w-4" />
                  Hubungi Kami
                </div>
                <h2 className="text-balance font-heading text-3xl font-extrabold md:text-4xl">
                  Ada pertanyaan? Kami siap membantu!
                </h2>
                <p className="mt-3 leading-relaxed text-primary-foreground/80">
                  Isi formulir di samping dan tim kami akan membalas dalam 1×24 jam kerja.
                </p>
                <ul className="mt-6 space-y-3 text-sm">
                  <li className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                      <Mail className="h-4 w-4" />
                    </span>
                    support@nusaskillz.id
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                      <PhoneCall className="h-4 w-4" />
                    </span>
                    (021) 5000-1234
                  </li>
                </ul>
              </div>

              {/* Right: The form */}
              <InquiryForm />
            </div>
          </div>
        </section>
      </Reveal>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 md:grid-cols-5">
            <div className="md:col-span-2">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <span className="font-heading text-xl font-extrabold">NusaSkillz</span>
              </div>
              <p className="max-w-sm text-sm text-muted-foreground">
                Platform belajar bergamifikasi untuk pelajar Indonesia. Jadikan setiap pelajaran sebuah petualangan yang seru!
              </p>
            </div>
            <div>
              <h4 className="mb-3 font-heading text-sm font-bold">Produk</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/courses" className="hover:text-foreground">Kursus</Link></li>
                <li><Link href="#" className="hover:text-foreground">Untuk Guru</Link></li>
                <li><Link href="#" className="hover:text-foreground">Untuk Sekolah</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 font-heading text-sm font-bold">Perusahaan</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">Tentang Kami</Link></li>
                <li><Link href="#" className="hover:text-foreground">Kebijakan Privasi</Link></li>
                <li><Link href="#" className="hover:text-foreground">Syarat & Ketentuan</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 font-heading text-sm font-bold">Kontak</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>support@nusaskillz.id</li>
                <li>(021) 5000-1234</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>© 2026 NusaSkillz. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}