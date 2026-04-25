import type { Person } from "../lib/types";

export interface HabitConfig {
  id: string;
  name: string;
  owner: Person;
  frequency: "daily" | "3x_week";
  icon: string;
  sortOrder: number;
}

export const HABITS: HabitConfig[] = [
  { id: "y-read", name: "Read", owner: "yero", frequency: "daily", icon: "book", sortOrder: 1 },
  { id: "y-meditate", name: "Meditate", owner: "yero", frequency: "daily", icon: "lotus", sortOrder: 2 },
  { id: "y-exercise", name: "Exercise", owner: "yero", frequency: "3x_week", icon: "dumbbell", sortOrder: 3 },
  { id: "y-skin", name: "Skin care", owner: "yero", frequency: "daily", icon: "spark", sortOrder: 4 },
  { id: "j-exercise", name: "Exercise", owner: "jacky", frequency: "3x_week", icon: "dumbbell", sortOrder: 1 },
  { id: "j-skin", name: "Skin care", owner: "jacky", frequency: "daily", icon: "spark", sortOrder: 2 },
];

export const ICONS: Record<string, React.ReactNode> = {
  book: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5V4.5Z" />
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    </svg>
  ),
  lotus: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4c1.5 3 1.5 7 0 10" />
      <path d="M5 9c2 1 4 3 5 7" />
      <path d="M19 9c-2 1-4 3-5 7" />
      <path d="M3 16c3-1 6-1 9 0 3-1 6-1 9 0" />
    </svg>
  ),
  spark: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
    </svg>
  ),
  dumbbell: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="9" width="3" height="6" rx="1" />
      <rect x="19" y="9" width="3" height="6" rx="1" />
      <rect x="6" y="7" width="3" height="10" rx="1" />
      <rect x="15" y="7" width="3" height="10" rx="1" />
      <line x1="9" y1="12" x2="15" y2="12" />
    </svg>
  ),
};

export const ICON_TINT: Record<string, string> = {
  book: "linear-gradient(135deg,#a78bfa,#7c3aed)",
  lotus: "linear-gradient(135deg,#c4b5fd,#8b5cf6)",
  spark: "linear-gradient(135deg,#f9a8d4,#db2777)",
  dumbbell: "linear-gradient(135deg,#fbbf24,#f59e0b)",
};