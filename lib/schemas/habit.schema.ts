import { z } from "zod";

export const HabitLogSchema = z.object({
  id: z.string().uuid(),
  habit_id: z.string().uuid(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  completed: z.boolean(),
});

export const HabitSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  owner: z.enum(["yero", "jacky"]),
  frequency: z.enum(["daily", "3x_week"]),
  icon: z.string(),
  sort_order: z.number().int().nonnegative(),
  created_at: z.string().datetime({ offset: true }),
});

export const HabitWithLogsSchema = HabitSchema.extend({
  logs: z.array(HabitLogSchema),
});

export const ToggleInputSchema = z.object({
  habitId: z.string().uuid(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export type Habit = z.infer<typeof HabitSchema>;
export type HabitLog = z.infer<typeof HabitLogSchema>;
export type HabitWithLogs = z.infer<typeof HabitWithLogsSchema>;
export type ToggleInput = z.infer<typeof ToggleInputSchema>;