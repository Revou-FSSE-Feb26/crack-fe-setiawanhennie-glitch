import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils"; 

interface StatCardProps {
  title: string;
  value: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  icon: LucideIcon;
  className?: string;
}

export default function StatCard({ 
  title, 
  value, 
  trend = "neutral", 
  trendValue, 
  icon: Icon,
  className 
}: StatCardProps) {
  
  const trendConfig = {
    up: { icon: TrendingUp, color: "text-success", bg: "bg-success/10" },
    down: { icon: TrendingDown, color: "text-destructive", bg: "bg-destructive/10" },
    neutral: { icon: Minus, color: "text-muted-foreground", bg: "bg-muted" },
  };

  const TrendIcon = trendConfig[trend].icon;

  return (
    <div className={cn(
      "rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md",
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <Icon className="w-5 h-5" />
        </div>
        
        {trendValue && (
          <div className={cn("flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full", trendConfig[trend].bg, trendConfig[trend].color)}>
            <TrendIcon className="w-3 h-3" />
            {trendValue}
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <h3 className="text-3xl font-bold font-heading text-card-foreground">{value}</h3>
      </div>
    </div>
  );
}