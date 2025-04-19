import { HabitRepository } from "./repository/habit.repository.interface";
import { Habit } from "./habit.model";
import { calculateStreak } from "@utils/streak.util";
import { getLastCompletedDate } from "@utils/history.util";

export class HabitService {
  constructor(private habitRepo: HabitRepository) {}

  async getAllHabits(): Promise<(Habit & { streak: number; lastCompletedDate: string | null })[]> {
    const habits = await this.habitRepo.getAll();
  
    return habits.map((habit) => ({
      ...habit,
      streak: calculateStreak(habit.completedDates),
      lastCompletedDate: getLastCompletedDate(habit.completedDates),
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

