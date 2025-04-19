import { Habit } from "../habit.model";

export interface HabitRepository {
  getAll(): Promise<Habit[]>;
  create(habit: Habit): Promise<Habit>;
  delete(id: string): Promise<void>;
  toggleCompleteForToday(id: string): Promise<Habit>;
}

