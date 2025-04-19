/**
 * NOTE:
 * This file currently includes both the main Habit model and the DTO for habit creation.
 * In a future cleanup step, it is recommended to split them into:
 *
 * - habit.model.ts        → contains the main Habit entity/interface
 * - habit.dto.ts          → contains CreateHabitDto and other data transfer objects
 * - habit.types.ts        → contains extended types like HabitWithMeta, etc.
 */

// Habit model representing a habit entity
export interface Habit {
  id: string;
  name: string;
  description?: string;
  completedDates: string[];
}

// DTO used when creating a new habit
export interface HabitCreateDto {
  name: string;
  description?: string;
}

// Extended Habit type with additional metadata
// TODO: Add database as a repository type in the future
export enum RepositoryType {
  MEMORY = "memory",
  FILE = "file"
}
