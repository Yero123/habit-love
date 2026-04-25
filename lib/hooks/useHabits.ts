import { useQuery } from "@tanstack/react-query";
import { getHabitsWithLogs } from "../../app/actions/habits";
import type { HabitWithLogs } from "../types";

export function useHabits(days: number = 91): {
  data: HabitWithLogs[] | undefined;
  isLoading: boolean;
  error: Error | null;
} {
  const { data, isLoading, error } = useQuery({
    queryKey: ["habits", days],
    queryFn: () => getHabitsWithLogs(days),
    staleTime: 60 * 1000,
  });

  return { data, isLoading, error: error as Error | null };
}