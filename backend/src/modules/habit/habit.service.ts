import { HabitRepository } from "./repository/habit.repository.interface";
import { Habit, HabitCreateDto, HabitWithMeta } from "./habit.model";
import { calculateStreak } from "./utils/streak.util";
import { getLastCompletedDate } from "./utils/history.util";

export class HabitService {
  constructor(private habitRepo: HabitRepository) {}

  async getAllHabits(): Promise<HabitWithMeta[]> {
    const habits = await this.habitRepo.getAll();

    return habits.map((habit) => ({
      ...habit,
      streak: calculateStreak(habit.completedDates),
      lastCompletedDate: getLastCompletedDate(habit.completedDates),
    }));
  }

  async createHabit(data: HabitCreateDto): Promise<Habit> {
    const newHabit: HabitCreateDto = {
      name: data.name,
      description: data.description,
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
