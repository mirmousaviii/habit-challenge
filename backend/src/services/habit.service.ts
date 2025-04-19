import { HabitRepository } from "../repositories/HabitRepository";
import { Habit } from "../models/habit.model";

export class HabitService {
  constructor(private habitRepo: HabitRepository) {}

  getAllHabits(): Promise<Habit[]> {
    return this.habitRepo.getAll();
  }

  async createHabit(data: { name: string; description?: string }): Promise<Habit> {
    const newHabit: Habit = {
      id: "", // will be generated in repository
      name: data.name,
      description: data.description,
      completedDates: [],
    };

    return this.habitRepo.create(newHabit);
  }
  
  async toggleHabitForToday(id: string): Promise<Habit> {
    return this.habitRepo.toggleCompleteForToday(id);
  }
  
  async deleteHabit(id: string): Promise<void> {
    await this.habitRepo.delete(id);
  }
  
}

