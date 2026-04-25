import type { z } from "zod";
import { HabitSchema, HabitLogSchema, HabitWithLogsSchema } from "../schemas/habit.schema";

export type Person = "yero" | "jacky";

export type Frequency = "daily" | "3x_week";

export type Habit = z.infer<typeof HabitSchema>;
export type HabitLog = z.infer<typeof HabitLogSchema>;
export type HabitWithLogs = z.infer<typeof HabitWithLogsSchema>;

export interface ToggleInput {
  habitId: string;
  date: string;
}

export interface PersonConfig {
  id: Person;
  name: string;
  initial: string;
  theme: "purple" | "pink";
}

export interface IHabitsRepository {
  getHabitsWithLogs(startDate: Date, endDate: Date): Promise<HabitWithLogs[]>;
  toggleLog(habitId: string, date: string): Promise<void>;
  getLogsForDate(date: string): Promise<HabitLog[]>;
}