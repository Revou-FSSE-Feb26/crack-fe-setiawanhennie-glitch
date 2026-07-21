import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  GraduationCap, 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Shield, 
  Database, 
  Activity, 
  AlertTriangle, 
  Search, 
  Bell, 
  CheckCircle2, 
  XCircle,
  Server,
  TrendingUp
} from "lucide-react"

export default function AdminDashboardPage() {
  // Mock Data
  const admin = { name: "Pak Admin", role: "Super Admin" }
  
  const globalStats = [
    { label: "Total Murid", value: "12,450", icon: Users, color: "bg-blue-500/10 text-blue-600", trend: "+12% bulan ini" },
    { label: "Total Guru", value: "142", icon: GraduationCap, color: "bg-green-500/10 text-green-600", trend: "+5 bulan ini" },
    { label: "Kursus Aktif", value: "86", icon: BookOpen, color: "bg-purple-500/10 text-purple-600", trend: "3 menunggu review" },
    { label: "Uptime Sistem", value: "99.9%", icon: Activity, color: "bg-emerald-500/10 text-emerald-600", trend: "Sangat Stabil" },
  ]

  const pendingApprovals = [
    { id: 1, title: "Kuis Dasar-Dasar Koding Python", author: "Pak Joko", type: "Kuis", date: "2 jam lalu" },
    { id: 2, title: "Materi Sejarah Kemerdekaan RI", author: "Bu Ratna", type: "Materi", date: "5 jam lalu" },
    { id: 3, title: "Latihan Soal Olimpiade Matematika", author: "Pak Budi", type: "Kuis", date: "1 hari lalu" },
  ]

  const recentSignups = [
    { name: "Rina Wulandari", role: "Murid", school: "SMA 3 Bandung", time: "10 menit lalu" },
    { name: "Pak Hendra", role: "Guru", school: "SMP 1 Surabaya", time: "1 jam lalu" },
    { name: "Dimas Anggara", role: "Murid", school: "SMA 8 Jakarta", time: "3 jam lalu" },
  ]

  const systemHealth = [
    { name: "Database (SQLite)", status: "Online", load: "24%", color: "bg-emerald-500" },
    { name: "API Server", status: "Online", load: "12%", color: "bg-emerald-500" },
    { name: "Storage (Gambar & Aset)", status: "Online", load: "68%", color: "bg-yellow-500" },
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
          <Link href="/admin/dashboard" className="flex items-center gap-3 rounded-xl bg-primary/10 px-4 py-3 text-primary font-bold transition-colors">
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <Users className="h-5 w-5" />
            Manajemen Pengguna
          </Link>
          <Link href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <BookOpen className="h-5 w-5" />
            Manajemen Kursus
          </Link>
          <Link href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <AlertTriangle className="h-5 w-5" />
            Laporan & Moderasi
          </Link>
          <Link href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <Database className="h-5 w-5" />
            Pengaturan Sistem
          </Link>
        </nav>

        <div className="mt-auto">
          <div className="rounded-xl bg-secondary/50 p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-xs font-bold font-heading">Mode Admin</span>
            </div>
            <p className="text-xs text-muted-foreground">Anda memiliki akses penuh ke seluruh platform.</p>
          </div>
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
                placeholder="Cari pengguna, kursus, atau laporan..." 
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
                <p className="text-sm font-bold font-heading">{admin.name}</p>
                <p className="text-xs text-muted-foreground">{admin.role}</p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                PA
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          
          <div className="mb-8">
            <h1 className="font-heading text-3xl font-extrabold">Pusat Kontrol Platform</h1>
            <p className="text-muted-foreground mt-1">Pantau kesehatan sistem, pengguna, dan konten NusaSkillz.</p>
          </div>

          {/* Global Stats Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {globalStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-card p-5 ring-1 ring-border shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                </div>
                <p className="text-2xl font-bold font-heading">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-xs text-emerald-600 font-medium mt-1">{stat.trend}</p>
              </div>
            ))}
          </div>

          {/* Two Column Layout */}
          <div className="grid gap-6 lg:grid-cols-3">
            
            {/* Left Column: Approvals & System Health */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Pending Approvals */}
              <div className="rounded-2xl bg-card p-6 ring-1 ring-border shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading text-xl font-bold flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    Persetujuan Konten (3)
                  </h2>
                  <Button variant="ghost" size="sm" className="text-sm">Lihat Semua</Button>
                </div>
                
                <div className="space-y-3">
                  {pendingApprovals.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <BookOpen className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold font-heading">{item.title}</p>
                          <p className="text-xs text-muted-foreground">Diajukan oleh {item.author} • {item.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-full">
                          <XCircle className="h-4 w-4 text-rose-500" />
                        </Button>
                        <Button size="sm" className="h-8 px-4">
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Setujui
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Health */}
              <div className="rounded-2xl bg-card p-6 ring-1 ring-border shadow-sm">
                <h2 className="font-heading text-xl font-bold flex items-center gap-2 mb-6">
                  <Server className="h-5 w-5 text-primary" />
                  Kesehatan Sistem
                </h2>
                <div className="space-y-5">
                  {systemHealth.map((sys) => (
                    <div key={sys.name}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${sys.color}`}></div>
                          <span className="text-sm font-bold">{sys.name}</span>
                        </div>
                        <span className="text-xs font-medium text-muted-foreground">{sys.status} • Beban {sys.load}</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${sys.color} transition-all`} 
                          style={{ width: sys.load }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Recent Signups & Quick Actions */}
            <div className="space-y-6">
              
              {/* Recent Signups */}
              <div className="rounded-2xl bg-card p-6 ring-1 ring-border shadow-sm">
                <h2 className="font-heading text-lg font-bold flex items-center gap-2 mb-4">
                  <Users className="h-5 w-5 text-blue-500" />
                  Pendaftaran Terbaru
                </h2>
                <div className="space-y-4">
                  {recentSignups.map((user, index) => (
                    <div key={index} className="flex items-center gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary font-bold text-xs">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.role} • {user.school}</p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{user.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Admin Actions */}
              <div className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 text-white shadow-sm">
                <h2 className="font-heading text-lg font-bold mb-2">Aksi Cepat Admin</h2>
                <p className="text-sm opacity-80 mb-4">Kelola platform dengan cepat.</p>
                <div className="flex flex-col gap-2">
                  <Button className="w-full bg-white/10 hover:bg-white/20 text-white border-none">
                    + Tambah Guru Baru
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent text-white border-white/20 hover:bg-white/10">
                    📥 Ekspor Data Pengguna
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent text-white border-white/20 hover:bg-white/10">
                    🔄 Backup Database
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