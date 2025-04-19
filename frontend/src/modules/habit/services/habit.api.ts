import { api, handleApiResponse, handleApiError, SuccessResponse, API_ENDPOINTS } from "@modules/core";
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
  try {
    const res = await api.get<SuccessResponse<HabitWithMeta[]>>(API_ENDPOINTS.HABITS.BASE);
    return handleApiResponse(res);
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * Create a new habit.
 * @param data Habit name and optional description
 * @returns Created habit
 */
export async function createHabit(data: CreateHabitDto): Promise<Habit> {
  try {
    const res = await api.post<SuccessResponse<Habit>>(API_ENDPOINTS.HABITS.BASE, data);
    return handleApiResponse(res);
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * Toggle habit completion for today.
 * @param id Habit ID
 * @returns Updated habit
 */
export async function toggleHabit(id: string): Promise<Habit> {
  try {
    const res = await api.patch<SuccessResponse<Habit>>(API_ENDPOINTS.HABITS.TOGGLE(id));
    return handleApiResponse(res);
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * Delete a habit by ID.
 * @param id Habit ID
 */
export async function deleteHabit(id: string): Promise<void> {
  try {
    await api.delete<SuccessResponse<void>>(`${API_ENDPOINTS.HABITS.BASE}/${id}`);
  } catch (error) {
    throw handleApiError(error);
  }
}
