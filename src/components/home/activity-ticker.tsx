const EVENTS = [
  { emoji: "🎯", text: "Kuis interaktif dengan 6 tipe soal", chip: "Game" },
  { emoji: "🔥", text: "Streak harian + bonus XP", chip: "Streak" },
  { emoji: "🏅", text: "9 lencana prestasi menunggu", chip: "Badge" },
  { emoji: "📄", text: "Unggah PDF/Word langsung jadi materi", chip: "Fitur" },
  { emoji: "🏆", text: "Papan peringkat per sekolah", chip: "Kompetisi" },
  { emoji: "📊", text: "Dashboard guru & admin sekolah", chip: "Pro" },
];

export default function ActivityTicker() {
  const row = [...EVENTS, ...EVENTS];
  return (
    <div className="ticker overflow-hidden border-b border-border bg-secondary/40 py-3">
      <div className="ticker-track flex w-max gap-3 px-4">
        {row.map((e, i) => (
          <span
            key={i}
            className="flex items-center gap-2 whitespace-nowrap rounded-full bg-card px-4 py-1.5 text-xs font-semibold ring-1 ring-border"
          >
            <span>{e.emoji}</span>
            {e.text}
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">{e.chip}</span>
          </span>
        ))}
      </div>
    </div>
  );
}