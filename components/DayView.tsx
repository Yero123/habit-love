"use client";

import { useCallback, useMemo } from "react";
import type { HabitWithLogs, Person } from "../lib/types";
import { Avatar } from "./Avatar";
import { ICONS, ICON_TINT } from "../constants/habits";
import { PEOPLE } from "../constants/people";

interface DayViewProps {
  habits: HabitWithLogs[];
  selectedDate: Date;
  onToggle: (habitId: string, date: string) => void;
}

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function DayView({ habits, selectedDate, onToggle }: DayViewProps) {
  const dateStr = selectedDate.toISOString().split("T")[0];
  const dayName = DAY_NAMES[selectedDate.getDay()];
  const monthName = MONTH_NAMES[selectedDate.getMonth()];
  const isToday = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate.getTime() === today.getTime();
  }, [selectedDate]);

  const isFuture = selectedDate > new Date();

  const requiredHabits = habits.filter((h) => h.frequency === "daily");
  const doneRequired = requiredHabits.filter((h) =>
    h.logs.some((l) => l.habit_id === h.id && l.date === dateStr && l.completed)
  ).length;
  const totalRequired = requiredHabits.length;
  const pct = totalRequired === 0 ? 0 : Math.round((doneRequired / totalRequired) * 100);

  return (
    <div>
      <div className="mb-4 px-1">
        <div
          className="text-[11px] font-bold uppercase tracking-wider mb-1"
          style={{ color: "var(--color-muted)", letterSpacing: "1.6px" }}
        >
          {isToday ? `Today · ${dayName}` : dayName}
        </div>
        <div
          className="text-2xl font-extrabold tracking-tight"
          style={{
            background: "linear-gradient(95deg, #c4b5fd 0%, #f9a8d4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {monthName} {selectedDate.getDate()}
        </div>
        <div className="mt-3 flex items-center gap-2 text-[12px]" style={{ color: "var(--color-muted)" }}>
          <span
            className="px-2.5 py-1 rounded-full text-[11px] font-bold"
            style={
              pct === 100
                ? {
                    background: "linear-gradient(135deg, rgba(124,58,237,0.4), rgba(219,39,119,0.35))",
                    border: "1px solid rgba(167,139,250,0.4)",
                    color: "white",
                  }
                : {
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "var(--color-text)",
                  }
            }
          >
            {doneRequired}/{totalRequired} daily habits
          </span>
          {pct === 100 && <span>everything done 🔥</span>}
        </div>
      </div>

      {PEOPLE.map((person) => {
        const personHabits = habits.filter((h) => h.owner === person.id);
        const reqHabits = personHabits.filter((h) => h.frequency === "daily");
        const reqDone = reqHabits.filter((h) =>
          h.logs.some((l) => l.habit_id === h.id && l.date === dateStr && l.completed)
        ).length;

        return (
          <div key={person.id} className="mb-5">
            <div
              className="flex items-center gap-3 p-3 rounded-xl mb-2"
              style={{
                background:
                  person.theme === "purple"
                    ? "var(--color-p-card-bg)"
                    : "var(--color-g-card-bg)",
                border:
                  person.theme === "purple"
                    ? "1px solid var(--color-p-card-bd)"
                    : "1px solid var(--color-g-card-bd)",
                backdropFilter: "blur(16px)",
              }}
            >
              <Avatar personId={person.id} size="md" />
              <span
                className="text-[13px] font-bold tracking-wider"
                style={{
                  color: person.theme === "purple" ? "#c4b5fd" : "#fbcfe8",
                }}
              >
                {person.name}
              </span>
              <span
                className="ml-auto text-[11px] font-semibold"
                style={{ color: "var(--color-muted)" }}
              >
                <strong style={{ color: "var(--color-text)", fontWeight: 700 }}>
                  {reqDone}
                </strong>
                /{reqHabits.length} daily
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {personHabits.map((habit) => {
                const done = habit.logs.some(
                  (l) => l.habit_id === habit.id && l.date === dateStr && l.completed
                );
                const isOptional = habit.frequency !== "daily";
                let stateClass: string;
                let pillText: string;

                if (isOptional) {
                  stateClass = `optional ${done ? "done" : ""}`;
                  pillText = done ? "Done" : "— rest";
                } else if (done) {
                  stateClass = "done";
                  pillText = "Done";
                } else if (isFuture) {
                  stateClass = "optional";
                  pillText = "—";
                } else {
                  stateClass = "missed";
                  pillText = "Missed";
                }

                return (
                  <div
                    key={habit.id}
                    onClick={() => onToggle(habit.id, dateStr)}
                    className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-[rgba(255,255,255,0.04)]"
                    style={{
                      background: "rgba(255,255,255,0.025)",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{
                        background: ICON_TINT[habit.icon] || "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.12)",
                      }}
                    >
                      <div style={{ width: 14, height: 14 }}>
                        {ICONS[habit.icon]}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[14px] font-semibold text-[var(--color-text)]">
                        {habit.name}
                      </h4>
                      <p className="text-[10.5px] font-medium mt-0.5" style={{ color: "var(--color-dim)" }}>
                        {isOptional ? (
                          <>
                            {habit.frequency === "3x_week" ? "3× week" : "daily"}
                            <span
                              className="ml-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider"
                              style={{
                                background: "rgba(255,255,255,0.05)",
                                color: "var(--color-muted)",
                              }}
                            >
                              optional
                            </span>
                          </>
                        ) : (
                          habit.frequency === "3x_week" ? "3× week" : "daily"
                        )}
                      </p>
                    </div>
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={
                        done
                          ? {
                              background:
                                person.theme === "purple"
                                  ? "linear-gradient(135deg, var(--color-p1), var(--color-p2))"
                                  : "linear-gradient(135deg, var(--color-g1), var(--color-g2))",
                              color: "white",
                            }
                          : stateClass === "optional"
                          ? {
                              background: "rgba(255,255,255,0.04)",
                              color: "rgba(255,255,255,0.4)",
                              border: "1px dashed rgba(255,255,255,0.12)",
                            }
                          : {
                              background: "rgba(255,255,255,0.04)",
                              color: "rgba(255,255,255,0.25)",
                              border: "1px solid rgba(255,255,255,0.06)",
                            }
                      }
                    >
                      {done ? (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ width: 12, height: 12 }}
                        >
                          <polyline points="5 12 10 17 19 7" />
                        </svg>
                      ) : (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ width: 12, height: 12 }}
                        >
                          <circle cx="12" cy="12" r="8" />
                        </svg>
                      )}
                    </div>
                    <span
                      className="px-2.5 py-1 rounded-full text-[10.5px] font-bold uppercase tracking-wider"
                      style={
                        done
                          ? {
                              background:
                                person.theme === "purple"
                                  ? "linear-gradient(135deg, var(--color-p1), var(--color-p2))"
                                  : "linear-gradient(135deg, var(--color-g1), var(--color-g2))",
                              color: "white",
                              boxShadow:
                                person.theme === "purple"
                                  ? "0 4px 12px -3px var(--color-p-glow)"
                                  : "0 4px 12px -3px var(--color-g-glow)",
                            }
                          : stateClass === "missed"
                          ? {
                              background: "rgba(255,255,255,0.05)",
                              color: "var(--color-dim)",
                              border: "1px solid rgba(255,255,255,0.08)",
                            }
                          : {
                              background: "rgba(255,255,255,0.04)",
                              color: "rgba(236,233,245,0.6)",
                              border: "1px solid rgba(255,255,255,0.08)",
                            }
                      }
                    >
                      {pillText}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}