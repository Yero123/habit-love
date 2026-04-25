"use client";

import { useCallback } from "react";
import type { HabitWithLogs, Person } from "../lib/types";
import { ICONS, ICON_TINT } from "../constants/habits";
import { DotGrid, computeStreak } from "./DotGrid";

interface HabitCardProps {
  habit: HabitWithLogs;
  onToggle: (habitId: string, date: string) => void;
}

const FREQ_LABEL: Record<string, string> = {
  daily: "daily",
  "3x_week": "3× week",
};

export function HabitCard({ habit, onToggle }: HabitCardProps) {
  const theme = habit.owner === "yero" ? "purple" : "pink";

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toISOString().split("T")[0];

  const todayDone = habit.logs.some(
    (l) => l.habit_id === habit.id && l.date === todayStr && l.completed
  );

  const streak = computeStreak(
    habit.logs.map((l) => ({ date: l.date, completed: l.completed }))
  );

  const handleToggleToday = useCallback(() => {
    onToggle(habit.id, todayStr);
  }, [habit.id, todayStr, onToggle]);

  const handleDotClick = useCallback(
    (date: string) => {
      onToggle(habit.id, date);
    },
    [habit.id, onToggle]
  );

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 90);
  startDate.setHours(0, 0, 0, 0);

  return (
    <div
      onClick={handleToggleToday}
      className="relative rounded-2xl p-4 transition-all duration-200 hover:scale-[1.01] cursor-pointer active:scale-[0.98]"
      style={{
        background:
          theme === "purple"
            ? "var(--color-p-card-bg)"
            : "var(--color-g-card-bg)",
        border:
          theme === "purple"
            ? "0.5px solid var(--color-p-card-bd)"
            : "0.5px solid var(--color-g-card-bd)",
        backdropFilter: "blur(16px)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.04), transparent 40%)",
        }}
      />

      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex gap-2 items-start min-w-0 flex-1">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-none"
            style={{
              background: ICON_TINT[habit.icon] || "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <div style={{ width: 16, height: 16 }}>
              {ICONS[habit.icon]}
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <h3
              className="text-sm font-bold text-[var(--color-text)] truncate"
              style={{ letterSpacing: "-0.2px" }}
            >
              {habit.name}
            </h3>
            <p
              className="text-[10.5px] font-medium mt-0.5"
              style={{ color: "var(--color-dim)" }}
            >
              {FREQ_LABEL[habit.frequency] || habit.frequency}
            </p>
          </div>
        </div>

        
      </div>

      <DotGrid habit={habit} startDate={startDate} days={91} />

      <div
        className={`text-[11.5px] font-semibold flex items-center gap-1 ${
          streak === 0 ? "" : ""
        }`}
        style={{
          color: streak === 0 ? "var(--color-dim)" : theme === "purple" ? "#c4b5fd" : "#fbcfe8",
        }}
      >
        {streak === 0 ? (
          "start a streak"
        ) : (
          <>
            {streak} day{streak === 1 ? "" : "s"} streak
            <span>🔥</span>
          </>
        )}
      </div>
    </div>
  );
}