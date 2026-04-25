import { supabaseAdmin } from "../supabase/server";
import { HabitWithLogsSchema, HabitLogSchema } from "../schemas/habit.schema";
import type { IHabitsRepository } from "../types";

export class SupabaseHabitsRepository implements IHabitsRepository {
  async getHabitsWithLogs(startDate: Date, endDate: Date) {
    const start = startDate.toISOString().split("T")[0];
    const end = endDate.toISOString().split("T")[0];

    const { data, error } = await supabaseAdmin
      .from("habits")
      .select(`
        id, name, owner, frequency, icon, sort_order, created_at,
        habit_logs(id, habit_id, date, completed)
      `)
      .order("sort_order");

    if (error) throw error;

    const habits = (data ?? []).map((h: Record<string, unknown>) => ({
      ...h,
      logs: ((h.habit_logs as unknown[]) ?? []).filter(
        (log: unknown) => {
          const l = log as { date: string };
          return l.date >= start && l.date <= end;
        }
      ),
    }));

    return HabitWithLogsSchema.array().parse(habits);
  }

  async toggleLog(habitId: string, date: string): Promise<void> {
    const existing = await supabaseAdmin
      .from("habit_logs")
      .select("*")
      .eq("habit_id", habitId)
      .eq("date", date)
      .single();

    if (existing.data) {
      const { error } = await supabaseAdmin
        .from("habit_logs")
        .delete()
        .eq("habit_id", habitId)
        .eq("date", date);

      if (error) throw error;
    } else {
      const { error } = await supabaseAdmin
        .from("habit_logs")
        .upsert(
          { habit_id: habitId, date, completed: true },
          { onConflict: "habit_id,date" }
        );

      if (error) throw error;
    }
  }

  async getLogsForDate(date: string) {
    const { data, error } = await supabaseAdmin
      .from("habit_logs")
      .select("*")
      .eq("date", date);

    if (error) throw error;
    return HabitLogSchema.array().parse(data ?? []);
  }
}

export const habitsRepository = new SupabaseHabitsRepository();