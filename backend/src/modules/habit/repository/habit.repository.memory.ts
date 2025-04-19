import { HabitRepository } from "./habit.repository.interface";
import { Habit } from "../habit.model";
import { v4 as uuidv4 } from "uuid";

export class InMemoryHabitRepository implements HabitRepository {
  private habits: Habit[] = [];

  async getAll(): Promise<Habit[]> {
    return this.habits;
  }

  async create(habit: Habit): Promise<Habit> {
    const newHabit = { ...habit, id: uuidv4(), completedDates: [] };
    this.habits.push(newHabit);
    return newHabit;
  }

  async delete(id: string): Promise<void> {
    const index = this.habits.findIndex((habit) => habit.id === id);
    if (index === -1) {
      throw new Error("Habit not found");
    }
    this.habits.splice(index, 1);
  }

  async toggleCompleteForToday(id: string): Promise<Habit> {
    const habit = this.habits.find((h) => h.id === id);
    if (!habit) {
      throw new Error("Habit not found");
    }

    const today = new Date().toISOString().split("T")[0];

    if (habit.completedDates.includes(today)) {
      habit.completedDates = habit.completedDates.filter((d) => d !== today);
    } else {
      habit.completedDates.push(today);
    }

    return habit;
  }
}

