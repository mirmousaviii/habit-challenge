import { HabitRepository } from "../repositories/HabitRepository";
import { Habit } from "../models/habit.model";
import { calculateStreak } from "../utils/streak.util";

export class HabitService {
  constructor(private habitRepo: HabitRepository) {}

  async getAllHabits(): Promise<(Habit & { streak: number })[]> {
    const habits = await this.habitRepo.getAll();
    return habits.map((habit) => ({
      ...habit,
      streak: calculateStreak(habit.completedDates),
    }));
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

