import { useState, useCallback, useEffect } from "react";
import { HabitWithMeta } from "../types/habit.types";
import { getAllHabits, toggleHabit as toggleHabitApi, deleteHabit as deleteHabitApi } from "../services/habit.api";

export const useHabits = () => {
  const [habits, setHabits] = useState<HabitWithMeta[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchHabits = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getAllHabits();
      setHabits(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch habits"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  const toggleHabit = async (id: string) => {
    try {
      await toggleHabitApi(id);
      await fetchHabits(); // Refresh the list after toggling
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to toggle habit"));
    }
  };

  const deleteHabit = async (id: string) => {
    try {
      await deleteHabitApi(id);
      await fetchHabits(); // Refresh the list after deleting
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to delete habit"));
    }
  };

  return {
    habits,
    isLoading,
    error,
    toggleHabit,
    deleteHabit,
    fetchHabits,
  };
}; 