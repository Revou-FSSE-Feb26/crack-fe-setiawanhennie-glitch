import Link from "next/link"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import {
  GraduationCap,
  Flame,
  Trophy,
  Zap,
  BookOpen,
  LogOut,
  TrendingUp,
  Star,
  ArrowRight,
  Award,
  BookOpenCheck,
} from "lucide-react"

// --- NEW: Reusable Stat Card Component (borrowed from your code) ---
function StatCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string | number
  tone: "primary" | "accent" | "success"
}) {
  const toneClasses = {
    primary: "bg-primary/10 text-primary",
    accent: "bg-orange-500/10 text-orange-600", // Adjusted for the fire streak
    success: "bg-yellow-500/10 text-yellow-600", // Adjusted for badges
  }[tone]

  return (
    <div className="flex flex-col items-center gap-1.5 rounded-2xl bg-card p-4 text-center ring-1 ring-border">
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${toneClasses}`}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="font-heading text-xl font-extrabold leading-none">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  )
}

export default async function DashboardPage() {
  const session = await auth.api.getSession()
  // For now, we comment this out so you can preview the dashboard.
  // if (!session?.user) redirect("/") 

  // Mock Data
  const user = { name: "Budi Santoso", level: 5, xp: 1250, xpToNext: 2000 }
  const streak = 7
  const completedLessons = 24
  const totalLessons = 40
  const earnedBadges = 12
  const totalBadges = 50

  // UPDATED: Added 'nextLesson', 'done', and 'total' for the new UI features
  const activeCourses = [
    { name: "Matematika", emoji: "🔢", progress: 75, color: "bg-blue-500", nextLesson: "Aljabar Linear", done: 15, total: 20 },
    { name: "Sains & IPA", emoji: "🔬", progress: 40, color: "bg-green-500", nextLesson: "Sistem Tata Surya", done: 6, total: 15 },
    { name: "Bahasa & Sastra", emoji: "📚", progress: 90, color: "bg-orange-500", nextLesson: "Puisi Kontemporer", done: 9, total: 10 },
  ]

  // Find the first course with an incomplete lesson for the "Continue" card
  const continueTarget = activeCourses.find(c => c.done < c.total) 

  const leaderboard = [
    { rank: 1, name: "Siti Aminah", xp: 2500, avatar: "SA" },
    { rank: 2, name: "Andi Pratama", xp: 2100, avatar: "AP" },
    { rank: 3, name: "Budi Santoso", xp: 1250, avatar: "BS", isUser: true },
    { rank: 4, name: "Dewi Lestari", xp: 980, avatar: "DL" },
    { rank: 5, name: "Rizky Maulana", xp: 850, avatar: "RM" },
  ]

  return (
    <main className="min-h-svh bg-background">
      {/* Navbar */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="font-heading text-xl font-extrabold">NusaSkillz</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm font-medium">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                BS
              </div>
              <span>{user.name}</span>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link href="/">
                <LogOut className="h-4 w-4 mr-2" />
                Keluar
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col gap-6">
        
        {/* Welcome Section */}
        <div>
          <h1 className="font-heading text-3xl font-extrabold">
            Halo, {user.name.split(' ')[0]}! 
          </h1>
          <p className="text-muted-foreground mt-1">
            Siap untuk melanjutkan petualangan belajarmu hari ini?
          </p>
        </div>

        {/* Level & XP Card */}
        <div className="rounded-3xl bg-card p-6 shadow-sm ring-1 ring-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-heading">{user.xp} XP</h3>
                <p className="text-sm text-muted-foreground">
                  {user.xpToNext - user.xp} XP lagi ke Level {user.level + 1}
                </p>
              </div>
            </div>
            <span className="text-sm font-bold bg-primary/10 text-primary px-3 py-1.5 rounded-full">
              Level {user.level}
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-secondary">
            <div 
              className="h-2 rounded-full bg-primary transition-all" 
              style={{ width: `${(user.xp / user.xpToNext) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* NEW: Stat row using the reusable StatCard component */}
        <div className="grid grid-cols-3 gap-3">
          <StatCard icon={Flame} label="Streak Harian" value={`${streak} Hari`} tone="accent" />
          <StatCard icon={BookOpenCheck} label="Pelajaran Selesai" value={`${completedLessons}/${totalLessons}`} tone="primary" />
          <StatCard icon={Award} label="Lencana" value={`${earnedBadges}/${totalBadges}`} tone="success" />
        </div>

        {/* NEW: "Continue Learning" Card (Massive UX Upgrade) */}
        {continueTarget && (
          <div className="rounded-3xl bg-card p-5 ring-1 ring-border shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wide text-primary">
                  Lanjutkan Belajar
                </p>
                <h3 className="mt-1 font-heading text-lg font-bold truncate">
                  {continueTarget.nextLesson}
                </h3>
                <p className="text-sm text-muted-foreground truncate">
                  {continueTarget.name} • {continueTarget.done} dari {continueTarget.total} pelajaran
                </p>
              </div>
              <Button asChild className="shrink-0 font-heading">
                <Link href={`/lessons/matematika`}>
                  Mulai
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          
          {/* Left Column: Courses & Achievements */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-3xl bg-card p-6 shadow-sm ring-1 ring-border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-xl font-bold flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Kursusmu
                </h2>
                <Button variant="ghost" size="sm" className="text-sm">Lihat Semua</Button>
              </div>
              <div className="space-y-5">
                {activeCourses.map((course) => (
                  <div key={course.name} className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-2xl">
                      {course.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="font-semibold font-heading">{course.name}</span>
                        {/* UPDATED: Shows "15/20" instead of just "75%" */}
                        <span className="text-sm text-muted-foreground">{course.done}/{course.total}</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-secondary">
                        <div 
                          className={`h-2 rounded-full ${course.color} transition-all`} 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="rounded-3xl bg-card p-6 shadow-sm ring-1 ring-border">
              <h2 className="font-heading text-xl font-bold flex items-center gap-2 mb-6">
                <Star className="h-5 w-5 text-yellow-500" />
                Pencapaian Terbaru
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {["Matematika Jagoan", "Streak 7 Hari", "Kuis Sempurna", "Penjelajah Sains"].map((badge) => (
                  <div key={badge} className="flex flex-col items-center text-center p-4 rounded-2xl bg-secondary/50 border border-border">
                    <div className="h-10 w-10 rounded-full bg-yellow-500/20 text-yellow-600 flex items-center justify-center mb-2">
                      <Star className="h-5 w-5 fill-current" />
                    </div>
                    <span className="text-xs font-bold font-heading leading-tight">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Leaderboard */}
          <div className="space-y-6">
            <div className="rounded-3xl bg-card p-6 shadow-sm ring-1 ring-border h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-xl font-bold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Papan Peringkat
                </h2>
                <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-full">Minggu Ini</span>
              </div>
              <div className="space-y-3">
                {leaderboard.map((player) => (
                  <div 
                    key={player.rank} 
                    className={`flex items-center gap-3 p-3 rounded-2xl transition-colors ${
                      player.isUser ? "bg-primary/10 border border-primary/20" : "hover:bg-secondary/50"
                    }`}
                  >
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full font-bold text-sm ${
                      player.rank === 1 ? "bg-yellow-500 text-white" :
                      player.rank === 2 ? "bg-gray-400 text-white" :
                      player.rank === 3 ? "bg-orange-600 text-white" :
                      "bg-secondary text-muted-foreground"
                    }`}>
                      {player.rank}
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-primary font-bold text-xs">
                      {player.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-bold truncate ${player.isUser ? "text-primary" : "text-foreground"}`}>
                        {player.name} {player.isUser && "(Kamu)"}
                      </p>
                      <p className="text-xs text-muted-foreground">{player.xp} XP</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}