import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleHabit } from "../../app/actions/habits";
import type { HabitWithLogs, ToggleInput } from "../types";

export function useToggleHabit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: ToggleInput) => toggleHabit(input),
    onMutate: async ({ habitId, date }) => {
      await queryClient.cancelQueries({ queryKey: ["habits", 91] });

      const previous = queryClient.getQueryData<HabitWithLogs[]>(["habits", 91]);

      queryClient.setQueryData<HabitWithLogs[]>(
        ["habits", 91],
        (old) => {
          if (!old) return old;
          return old.map((habit) => {
            if (habit.id !== habitId) return habit;
            const exists = habit.logs.some(
              (l) => l.habit_id === habitId && l.date === date
            );
            return {
              ...habit,
              logs: exists
                ? habit.logs.filter((l) => !(l.habit_id === habitId && l.date === date))
                : [...habit.logs, { id: "temp", habit_id: habitId, date, completed: true }],
            };
          });
        }
      );

      return { previous };
    },
    onError: (_err, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["habits", 91], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
  });
}