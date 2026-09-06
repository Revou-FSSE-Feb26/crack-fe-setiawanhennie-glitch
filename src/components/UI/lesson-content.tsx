export default function LessonContent({ content }: { content: string }) {
  const lines = content.split("\n");
  return (
    <div className="space-y-3 text-sm leading-relaxed">
      {lines.map((line, i) => {
        const match = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
        if (match) {
          return (
            <img
              key={i}
              src={match[2]}
              alt={match[1] || "gambar"}
              className="max-h-96 w-full rounded-xl object-contain ring-1 ring-border"
            />
          );
        }
        if (!line.trim()) return null;
        return <p key={i}>{line}</p>;
      })}
    </div>
  );
}