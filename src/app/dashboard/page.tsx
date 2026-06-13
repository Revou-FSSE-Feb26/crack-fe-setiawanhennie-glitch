"use client";

import { Zap, Target, Trophy, Users } from "lucide-react";
import StatCard from "@/components/UI/statcard";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold font-heading text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome back, Student! Here's your progress.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total XP" 
            value="2,450" 
            trend="up" 
            trendValue="+12%" 
            icon={Zap} 
          />
          <StatCard 
            title="Quests Done" 
            value="18/20" 
            trend="up" 
            trendValue="+5%" 
            icon={Target} 
          />
          <StatCard 
            title="Current Rank" 
            value="#42" 
            trend="down" 
            trendValue="-3" 
            icon={Trophy} 
          />
          <StatCard 
            title="Study Streak" 
            value="7 Days" 
            trend="neutral" 
            icon={Users} 
          />
        </div>
      </div>
    </div>
  );
}