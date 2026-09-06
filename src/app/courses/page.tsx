import Link from "next/link"
import { auth } from "@/lib/auth"
import { Button } from "@/components/UI/button"
import { 
  GraduationCap, 
  LogOut, 
  Search, 
  Flame, 
  Lock, 
  ChevronRight,
  Sparkles
} from "lucide-react"

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  emoji: string;
  color: string;
  isLocked: boolean;
  lessons?: any[];
}

export default async function CoursesPage() {
  const res = await fetch('http://localhost:3001/courses', { 
    cache: 'no-store' 
  })
  const courses: Course[] = await res.json()

  const user = { name: "Budi Santoso" }

  // 1. THE RETURN STATEMENT WAS MISSING HERE!
  return (
    <main className="min-h-svh bg-background">
      {/* Navbar */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="font-heading text-xl font-extrabold">NusaSkillz</span>
          </Link>
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

      <div className="mx-auto max-w-6xl px-4 py-8">
        
        {/* Header & Daily Quest Banner */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-extrabold">Jelajah Kursus</h1>
          <p className="text-muted-foreground mt-1">Pilih petualangan belajarmu selanjutnya.</p>
          
          <div className="mt-6 relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-purple-600 p-6 text-primary-foreground shadow-lg">
            <div className="relative z-10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                  <Flame className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide opacity-80">Misi Harian</p>
                  <h3 className="font-heading text-lg font-bold">Selesaikan 3 Pelajaran Hari Ini!</h3>
                  <p className="text-sm opacity-90 mt-0.5">Hadiah: <span className="font-bold">+50 XP</span> & Lencana "Rajin Belajar"</p>
                </div>
              </div>
              <div className="hidden sm:block text-right">
                <p className="text-3xl font-heading font-extrabold">1/3</p>
                <p className="text-xs opacity-80">Progress</p>
              </div>
            </div>
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 bg-white/10 rounded-full blur-2xl"></div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Cari kursus atau topik..." 
            className="w-full h-12 pl-12 pr-4 rounded-2xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        {/* Courses Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
          {courses.map((course) => {
            // Add safety checks
            const lessonCount = course.lessons ? course.lessons.length : 0;
            const completedCount = 0; 
            const progress = lessonCount > 0 ? Math.round((completedCount / lessonCount) * 100) : 0;
            
            // Safety check for color classes
            const colorClasses = course.color ? course.color.split(' ') : ['bg-gray-500/10', 'text-gray-600'];
            const textColor = colorClasses[1] || 'text-gray-600';
            const bgColor = textColor.replace('text-', 'bg-');
            
            return (
              <div 
                key={course.slug} 
                className={`group relative rounded-3xl bg-card p-6 ring-1 ring-border transition-all hover:shadow-lg hover:-translate-y-1 ${course.isLocked ? 'opacity-70' : ''}`}
              >
                {course.isLocked && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-muted px-3 py-1 rounded-full text-xs font-bold text-muted-foreground">
                    <Lock className="h-3 w-3" />
                    Terkunci
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-3xl border ${course.color || 'bg-gray-500/10 text-gray-600 border-gray-500/20'}`}>
                    {course.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-xl font-bold truncate">{course.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{course.description}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-5">
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-muted-foreground">{completedCount} dari {lessonCount} pelajaran</span>
                    <span className={textColor}>{progress}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${bgColor}`} 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-5">
                  {course.isLocked ? (
                    <Button disabled className="w-full" variant="outline">
                      Buka di Level 6
                    </Button>
                  ) : completedCount === 0 ? (
                    <Button asChild className="w-full font-heading">
                      <Link href={`/lesson`}>
                        Mulai Belajar
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  ) : progress === 100 ? (
                     <Button asChild className="w-full font-heading" variant="secondary">
                      <Link href={`/lesson`}>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Ulangi Kursus
                      </Link>
                    </Button>
                  ) : (
                    <Button asChild className="w-full font-heading">
                      <Link href={`/lesson`}>
                        Lanjutkan
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </main>
  )
}