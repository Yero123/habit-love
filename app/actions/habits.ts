"use server";

import { z } from "zod";
import { ToggleInputSchema } from "../../lib/schemas/habit.schema";
import { habitsRepository } from "../../lib/repository/habits.repository";
import type { HabitWithLogs } from "../../lib/types";

export async function getHabitsWithLogs(days: number): Promise<HabitWithLogs[]> {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days + 1);

  return habitsRepository.getHabitsWithLogs(startDate, endDate);
}

export async function toggleHabit(input: { habitId: string; date: string }): Promise<void> {
  const parsed = ToggleInputSchema.parse(input);
  await habitsRepository.toggleLog(parsed.habitId, parsed.date);
}