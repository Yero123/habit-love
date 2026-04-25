"use client";

import { useMemo } from "react";
import type { HabitWithLogs } from "../lib/types";

interface DotGridProps {
  habit: HabitWithLogs;
  startDate: Date;
  days?: number;
}

export function DotGrid({ habit, startDate, days = 91 }: DotGridProps) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const dots = useMemo(() => {
    const result: { date: Date; completed: boolean; isToday: boolean }[] = [];
    const logMap = new Map(
      habit.logs.map((l) => [l.date, l.completed])
    );

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(startDate);
      d.setDate(d.getDate() + i);
      const dateStr = d.toISOString().split("T")[0];
      const completed = !!logMap.get(dateStr);
      const isToday = d.getTime() === today.getTime();
      result.push({ date: d, completed, isToday });
    }

    return result;
  }, [habit, startDate, days, today]);

  const theme = habit.owner === "yero" ? "purple" : "pink";

  return (
    <div
      className="grid gap-1"
      style={{ gridTemplateColumns: "repeat(13, 1fr)", margin: "6px 0 10px" }}
    >
      {dots.map(({ date, completed, isToday }, i) => {
        const dateStr = date.toISOString().split("T")[0];
        return (
          <div
            key={i}
            data-date={dateStr}
            className={`aspect-square rounded-sm transition-all duration-200 hover:scale-[1.18] cursor-pointer ${
              completed ? "on" : ""
            } ${isToday ? "today-marker" : ""}`}
            style={
              completed
                ? {
                    background:
                      theme === "purple"
                        ? "linear-gradient(135deg, var(--color-p1), var(--color-p2))"
                        : "linear-gradient(135deg, var(--color-g1), var(--color-g2))",
                    borderColor:
                      theme === "purple"
                        ? "rgba(167,139,250,0.4)"
                        : "rgba(244,114,182,0.4)",
                    boxShadow:
                      theme === "purple"
                        ? "0 0 8px -1px var(--color-p-glow)"
                        : "0 0 8px -1px var(--color-g-glow)",
                  }
                : {
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.03)",
                  }
            }
          />
        );
      })}
    </div>
  );
}

export function computeStreak(
  logs: { date: string; completed: boolean }[],
  days: number = 91
): number {
  const logMap = new Set(logs.filter((l) => l.completed).map((l) => l.date));

  const today = new Date();
  today.setHours(0, 0, 0, 0);

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

  if (streak === 0) {
    for (let i = 1; i < days; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      if (logMap.has(dateStr)) {
        streak++;
      } else {
        break;
      }
    }
  }

  return streak;
}