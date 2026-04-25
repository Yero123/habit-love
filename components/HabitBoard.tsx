"use client";

import { useState, useCallback, useMemo } from "react";
import type { HabitWithLogs } from "../lib/types";
import { HabitCard } from "./HabitCard";
import { DayView } from "./DayView";
import { StatsComparison } from "./StatsComparison";
import { Avatar } from "./Avatar";
import { useHabits } from "../lib/hooks/useHabits";
import { useToggleHabit } from "../lib/hooks/useToggleHabit";
import { HabitCardSkeleton } from "./skeletons/HabitCardSkeleton";
import { DayViewSkeleton } from "./skeletons/DayViewSkeleton";
import { TabsSkeleton } from "./skeletons/TabsSkeleton";
import { HABITS } from "../constants/habits";
import { PEOPLE } from "../constants/people";

type ViewType = "dashboard" | string;

const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getMonday(d: Date): Date {
  const day = d.getDay();
  const offset = day === 0 ? -6 : 1 - day;
  const monday = new Date(d);
  monday.setDate(monday.getDate() + offset);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

export function HabitBoard() {
  const [currentView, setCurrentView] = useState<ViewType>("dashboard");
  const [toast, setToast] = useState<string | null>(null);
  const { data: habits, isLoading } = useHabits(91);
  const toggleMutation = useToggleHabit();

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const monday = useMemo(() => getMonday(today), [today]);

  const tabs = useMemo(() => {
    const result: { label: string; view: string; isToday: boolean; isFuture: boolean }[] = [
      { label: "All", view: "dashboard", isToday: false, isFuture: false },
    ];

    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(d.getDate() + i);
      const isToday = d.getTime() === today.getTime();
      const isFuture = d > today;
      result.push({
        label: DAY_NAMES[i],
        view: d.toISOString().split("T")[0],
        isToday,
        isFuture,
      });
    }

    return result;
  }, [monday, today]);

  const selectedDate = useMemo(() => {
    if (currentView === "dashboard") return today;
    return new Date(currentView);
  }, [currentView, today]);

  const yeroHabits = useMemo(
    () => (habits ?? []).filter((h) => h.owner === "yero").sort((a, b) => a.sort_order - b.sort_order),
    [habits]
  );
  const jackyHabits = useMemo(
    () => (habits ?? []).filter((h) => h.owner === "jacky").sort((a, b) => a.sort_order - b.sort_order),
    [habits]
  );

  const handleToggle = useCallback(
    (habitId: string, date: string) => {
      const habit = habits?.find((h) => h.id === habitId);
      if (!habit) return;

      toggleMutation.mutate(
        { habitId, date },
        {
          onSuccess: () => {
            const isDone = habits
              ?.find((h) => h.id === habitId)
              ?.logs.some((l) => l.habit_id === habitId && l.date === date && l.completed);

            const newDone = !isDone;
            if (newDone) {
              let streak = 0;
              const logMap = new Set(
                habits
                  ?.find((h) => h.id === habitId)
                  ?.logs.filter((l) => l.completed)
                  .map((l) => l.date) ?? []
              );

              const todayDate = new Date();
              todayDate.setHours(0, 0, 0, 0);
              for (let i = 0; i < 91; i++) {
                const d = new Date(todayDate);
                d.setDate(d.getDate() - i);
                const dateStr = d.toISOString().split("T")[0];
                if (logMap.has(dateStr)) {
                  streak++;
                } else {
                  break;
                }
              }

              setToast(`${habit.name} ✓ ${streak} day${streak === 1 ? "" : "s"} streak`);
              setTimeout(() => setToast(null), 2000);
            }
          },
        }
      );
    },
    [habits, toggleMutation]
  );

  const renderDashboard = () => (
    <div>
      {/* <StatsComparison habits={habits ?? []} startDate={monday} days={30} /> */}

      <div className="grid grid-cols-2 gap-2.5">
        <div>
          <div
            className="rounded-xl text-center p-2.5 mb-2.5"
            style={{
              background: "var(--color-p-card-bg)",
              border: "1px solid var(--color-p-card-bd)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <Avatar personId="yero" size="sm" />
              <span
                className="text-[11px] font-bold tracking-wider"
                style={{ color: "#c4b5fd", letterSpacing: "1.4px" }}
              >
                YERO
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            {yeroHabits.map((habit) => (
              <HabitCard key={habit.id} habit={habit} onToggle={handleToggle} />
            ))}
            {yeroHabits.length < jackyHabits.length &&
              Array.from({ length: jackyHabits.length - yeroHabits.length }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="rounded-2xl flex items-center justify-center min-h-[165px]"
                  style={{
                    background: "rgba(255,255,255,0.015)",
                    border: "1px dashed rgba(255,255,255,0.07)",
                    color: "rgba(255,255,255,0.18)",
                  }}
                >
                  <span className="text-2xl font-light">+</span>
                </div>
              ))}
          </div>
        </div>

        <div>
          <div
            className="rounded-xl text-center p-2.5 mb-2.5"
            style={{
              background: "var(--color-g-card-bg)",
              border: "1px solid var(--color-g-card-bd)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <Avatar personId="jacky" size="sm" />
              <span
                className="text-[11px] font-bold tracking-wider"
                style={{ color: "#fbcfe8", letterSpacing: "1.4px" }}
              >
                JACKY
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            {jackyHabits.map((habit) => (
              <HabitCard key={habit.id} habit={habit} onToggle={handleToggle} />
            ))}
            {jackyHabits.length < yeroHabits.length &&
              Array.from({ length: yeroHabits.length - jackyHabits.length }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="rounded-2xl flex items-center justify-center min-h-[165px]"
                  style={{
                    background: "rgba(255,255,255,0.015)",
                    border: "1px dashed rgba(255,255,255,0.07)",
                    color: "rgba(255,255,255,0.18)",
                  }}
                >
                  <span className="text-2xl font-light">+</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div>
        <TabsSkeleton />
        <div className="grid grid-cols-2 gap-2.5">
          <div className="flex flex-col gap-2.5">
            <HabitCardSkeleton />
            <HabitCardSkeleton />
          </div>
          <div className="flex flex-col gap-2.5">
            <HabitCardSkeleton />
            <HabitCardSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-2 pb-4" style={{ padding: "4px 2px 18px" }}>
        {tabs.map((tab) => (
          <button
            key={tab.view}
            onClick={() => setCurrentView(tab.view)}
            className={`flex flex-col items-center gap-0.5 rounded-2xl transition-all duration-200 ${
              tab.isFuture ? "opacity-45" : ""
            } `}
            style={
              tab.view === currentView
                ? {
                    background: "linear-gradient(135deg, rgba(124,58,237,0.55), rgba(219,39,119,0.45))",
                    border: "1px solid rgba(167,139,250,0.4)",
                    boxShadow: "0 6px 20px -8px rgba(124,58,237,0.6)",
                    color: "white",
                    padding: "10px 14px",
                    minWidth: "52px",
                    flex: "1",
                  }
                : {
                    background: "var(--color-glass-bg)",
                    border: "0.5px solid var(--color-glass-bd)",
                    backdropFilter: "blur(14px)",
                    color: "var(--color-muted)",
                    padding: "10px 14px",
                    minWidth: "52px",
                    flex: "1",
                  }
            }
          >
   
              <>
                <span
                  className="text-[9.5px] font-semibold uppercase"
                  style={{ opacity: 0.7, letterSpacing: "0.6px" }}
                >
                  {tab.label}
                </span>
                <span
                  className="text-[14px] font-bold"
                  style={{ opacity: 0.9, lineHeight: 1 }}
                >
                  {tab.view === "dashboard" ? <div className="flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  <rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  <rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>: new Date(tab.view).getDate()}
                </span>
                {tab.isToday && (
                  <div
                    className="w-1 h-1 rounded-full mt-0.5"
                    style={{
                      background: "linear-gradient(135deg, var(--color-p2), var(--color-g2))",
                    }}
                  />
                )}
                {tab.view === currentView && tab.isToday && (
                  <div
                    className="w-1 h-1 rounded-full mt-0.5"
                    style={{ background: "white" }}
                  />
                )}
              </>
          </button>
        ))}
      </div>

      {currentView === "dashboard" ? (
        renderDashboard()
      ) : (
        <DayView
          habits={habits ?? []}
          selectedDate={selectedDate}
          onToggle={handleToggle}
        />
      )}

      {toast && (
        <div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-full text-[12.5px] font-semibold whitespace-nowrap transition-all duration-300 z-60"
          style={{
            background: "rgba(15,12,26,0.85)",
            backdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "var(--color-text)",
            zIndex: 60,
            opacity: 1,
            transform: "translateX(-50%) translateY(0)",
          }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}