import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  GraduationCap, 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  ClipboardCheck, 
  BarChart3, 
  Settings, 
  Bell, 
  Search,
  TrendingUp,
  Clock,
  Award
} from "lucide-react"

export default function TeacherDashboardPage() {
  // Mock Data
  const teacher = { name: "Bu Sari", subject: "Matematika" }
  
  const stats = [
    { label: "Total Murid", value: "142", icon: Users, color: "bg-blue-500/10 text-blue-600" },
    { label: "Kelas Aktif", value: "4", icon: BookOpen, color: "bg-green-500/10 text-green-600" },
    { label: "Tugas Perlu Dinilai", value: "18", icon: ClipboardCheck, color: "bg-orange-500/10 text-orange-600" },
    { label: "Rata-rata Nilai", value: "85.4", icon: TrendingUp, color: "bg-purple-500/10 text-purple-600" },
  ]

  const recentActivity = [
    { student: "Budi Santoso", action: "menyelesaikan Kuis Aljabar", score: "90/100", time: "10 menit lalu" },
    { student: "Siti Aminah", action: "mengumpulkan Tugas Geometri", score: "Menunggu", time: "25 menit lalu" },
    { student: "Andi Pratama", action: "menyelesaikan Kuis Aljabar", score: "75/100", time: "1 jam lalu" },
    { student: "Dewi Lestari", action: "mendapatkan Lencana 'Jagoan Matematika'", score: "-", time: "2 jam lalu" },
  ]

  const topStudents = [
    { name: "Siti Aminah", xp: 2500, avatar: "SA" },
    { name: "Rizky Maulana", xp: 2100, avatar: "RM" },
    { name: "Budi Santoso", xp: 1850, avatar: "BS" },
  ]

  return (
    <div className="flex min-h-svh bg-background">
      
      {/* --- SIDEBAR --- */}
      <aside className="hidden w-64 flex-col border-r border-border bg-card p-6 md:flex">
        <div className="flex items-center gap-2 mb-8">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="font-heading text-xl font-extrabold">NusaSkillz</span>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          <Link href="/teacher/dashboard" className="flex items-center gap-3 rounded-xl bg-primary/10 px-4 py-3 text-primary font-bold transition-colors">
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <Users className="h-5 w-5" />
            Kelas Saya
          </Link>
          <Link href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <BookOpen className="h-5 w-5" />
            Materi & Kuis
          </Link>
          <Link href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <ClipboardCheck className="h-5 w-5" />
            Penilaian
          </Link>
          <Link href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <BarChart3 className="h-5 w-5" />
            Laporan
          </Link>
        </nav>

        <div className="mt-auto">
          <Link href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <Settings className="h-5 w-5" />
            Pengaturan
          </Link>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col">
        
        {/* Top Header */}
        <header className="flex h-16 items-center justify-between border-b border-border bg-card/50 px-6 backdrop-blur-sm sticky top-0 z-40">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Cari murid atau kelas..." 
                className="w-full h-9 pl-9 pr-4 rounded-lg bg-secondary border-none text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative text-muted-foreground hover:text-foreground">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-rose-500 border-2 border-background"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-border">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold font-heading">{teacher.name}</p>
                <p className="text-xs text-muted-foreground">Guru {teacher.subject}</p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                BS
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          
          <div className="mb-8">
            <h1 className="font-heading text-3xl font-extrabold">Selamat Pagi, {teacher.name}!</h1>
            <p className="text-muted-foreground mt-1">Berikut adalah ringkasan kelas Anda hari ini.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-card p-5 ring-1 ring-border shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
                <p className="text-2xl font-bold font-heading">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Two Column Layout */}
          <div className="grid gap-6 lg:grid-cols-3">
            
            {/* Left Column: Recent Activity */}
            <div className="lg:col-span-2 rounded-2xl bg-card p-6 ring-1 ring-border shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-xl font-bold flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Aktivitas Murid Terbaru
                </h2>
                <Link href="@/courses">
                  <Button variant="ghost" size="sm" className="text-sm">Lihat Semua</Button>
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs">
                        {activity.student.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-bold">{activity.student}</p>
                        <p className="text-xs text-muted-foreground">{activity.action}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-bold ${activity.score === 'Menunggu' ? 'text-orange-500' : 'text-foreground'}`}>
                        {activity.score}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Top Students & Quick Actions */}
            <div className="space-y-6">
              
              {/* Top Students */}
              <div className="rounded-2xl bg-card p-6 ring-1 ring-border shadow-sm">
                <h2 className="font-heading text-lg font-bold flex items-center gap-2 mb-4">
                  <Award className="h-5 w-5 text-yellow-500" />
                  Murid Teraktif Minggu Ini
                </h2>
                <div className="space-y-3">
                  {topStudents.map((student, index) => (
                    <div key={student.name} className="flex items-center gap-3">
                      <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                        index === 0 ? "bg-yellow-500 text-white" :
                        index === 1 ? "bg-gray-400 text-white" :
                        "bg-orange-600 text-white"
                      }`}>
                        {index + 1}
                      </span>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary font-bold text-xs">
                        {student.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate">{student.name}</p>
                      </div>
                      <span className="text-xs font-bold text-primary">{student.xp} XP</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="rounded-2xl bg-gradient-to-br from-primary to-purple-600 p-6 text-primary-foreground shadow-sm">
                <h2 className="font-heading text-lg font-bold mb-2">Aksi Cepat</h2>
                <p className="text-sm opacity-90 mb-4">Buat materi baru atau undang murid.</p>
                <div className="flex flex-col gap-2">
                  <Button className="w-full bg-white/20 hover:bg-white/30 text-white border-none">
                    + Buat Kuis Baru
                  </Button>
                  <Button variant="outline" className="w-full bg-white text-primary hover:bg-white/90 border-none">
                    + Tambah Murid
                  </Button>
                </div>
              </div>

            </div>
          </div>

        </main>
      </div>
    </div>
  )
}