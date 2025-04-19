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
