"use client";

import { useMemo } from "react";
import type { HabitWithLogs } from "../lib/types";
import { Avatar } from "./Avatar";
import { PEOPLE } from "../constants/people";

interface StatsComparisonProps {
  habits: HabitWithLogs[];
  startDate: Date;
  days?: number;
}

export function StatsComparison({ habits, startDate, days = 30 }: StatsComparisonProps) {
  const stats = useMemo(() => {
    return PEOPLE.map((person) => {
      const personHabits = habits.filter((h) => h.owner === person.id);
      const dailyHabits = personHabits.filter((h) => h.frequency === "daily");

      let completed = 0;
      let total = 0;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      for (let i = 0; i < days; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split("T")[0];

        dailyHabits.forEach((habit) => {
          total++;
          if (habit.logs.some((l) => l.habit_id === habit.id && l.date === dateStr && l.completed)) {
            completed++;
          }
        });
      }

      const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

      let bestStreak = 0;
      dailyHabits.forEach((habit) => {
        const logMap = new Set(
          habit.logs.filter((l) => l.completed).map((l) => l.date)
        );

        let streak = 0;
        for (let i = 0; i < days; i++) {
          const d = new Date(today);
          d.setDate(d.getDate() - i);
          const dateStr = d.toISOString().split("T")[0];
          if (logMap.has(dateStr)) {
            streak++;
          } else {
            break;
          }
        }
        if (streak > bestStreak) bestStreak = streak;
      });

      return { person, pct, bestStreak, completed, total };
    });
  }, [habits, days]);

  const winner = stats[0].pct > stats[1].pct ? stats[0] : stats[1].pct > stats[0].pct ? stats[1] : null;

  return (
    <div
      className="rounded-2xl p-4 mb-4"
      style={{
        background: "var(--color-glass-bg)",
        border: "0.5px solid var(--color-glass-bd)",
        backdropFilter: "blur(16px)",
      }}
    >
      <div className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: "var(--color-muted)" }}>
        Last {days} days
      </div>

      <div className="flex gap-3">
        {stats.map(({ person, pct, bestStreak }) => (
          <div
            key={person.id}
            className="flex-1 rounded-xl p-3"
            style={{
              background:
                person.theme === "purple"
                  ? "var(--color-p-card-bg)"
                  : "var(--color-g-card-bg)",
              border:
                person.theme === "purple"
                  ? "1px solid var(--color-p-card-bd)"
                  : "1px solid var(--color-g-card-bd)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Avatar personId={person.id} size="sm" />
              <span
                className="text-[11px] font-bold tracking-wider"
                style={{
                  color: person.theme === "purple" ? "#c4b5fd" : "#fbcfe8",
                }}
              >
                {person.name}
              </span>
            </div>
            <div
              className="text-2xl font-extrabold tracking-tight mb-1"
              style={{
                background:
                  person.theme === "purple"
                    ? "linear-gradient(135deg, #a78bfa, #7c3aed)"
                    : "linear-gradient(135deg, #f472b6, #db2777)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {pct}%
            </div>
            <div className="text-[10px] font-medium" style={{ color: "var(--color-dim)" }}>
              {bestStreak > 0 ? `${bestStreak} day streak 🔥` : "no streak yet"}
            </div>
          </div>
        ))}
      </div>

      {winner && (
        <div
          className="mt-3 text-center text-[11px] font-semibold py-1.5 rounded-lg"
          style={{
            background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(219,39,119,0.25))",
            border: "1px solid rgba(167,139,250,0.3)",
            color: "var(--color-text)",
          }}
        >
          {winner.person.name} is winning this month
        </div>
      )}
    </div>
  );
}