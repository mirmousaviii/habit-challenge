import { Habit, HabitCreateDto } from "../habit.model";

export interface HabitRepository {
  getAll(): Promise<Habit[]>;
  create(habit: HabitCreateDto): Promise<Habit>;
  delete(id: string): Promise<void>;
  toggleCompleteForToday(id: string): Promise<Habit>;
}

