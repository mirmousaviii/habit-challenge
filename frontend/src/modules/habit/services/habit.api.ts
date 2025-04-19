import { api } from "@core/axios";
import {
  Habit,
  HabitWithMeta,
  CreateHabitDto,
} from "../types/habit.types";

/**
 * Fetch all habits from the backend.
 * @returns Habit list including streak and lastCompletedDate
 */
export async function getAllHabits(): Promise<HabitWithMeta[]> {
  const res = await api.get("/habits");
  return res.data;
}

/**
 * Create a new habit.
 * @param data Habit name and optional description
 * @returns Created habit
 */
export async function createHabit(data: CreateHabitDto): Promise<Habit> {
  const res = await api.post("/habits", data);
  return res.data;
}

/**
 * Toggle habit completion for today.
 * @param id Habit ID
 * @returns Updated habit
 */
export async function toggleHabit(id: string): Promise<Habit> {
  const res = await api.patch(`/habits/${id}/toggle`);
  return res.data;
}

/**
 * Delete a habit by ID.
 * @param id Habit ID
 */
export async function deleteHabit(id: string): Promise<void> {
  await api.delete(`/habits/${id}`);
}
