import { Habit } from "../habit.model";
import { HabitRepository } from "./habit.repository.interface";
import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";
import { config } from "@core/config";

export class FileHabitRepository implements HabitRepository {
  private filePath = config.dataFilePath;

  private async readFile(): Promise<Habit[]> {
    try {
      const data = await fs.readFile(this.filePath, "utf-8");
      return JSON.parse(data) as Habit[];
    } catch (error) {
      // If file does not exist or is empty
      return [];
    }
  }

  private async writeFile(habits: Habit[]): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(habits, null, 2));
  }

  async getAll(): Promise<Habit[]> {
    return this.readFile();
  }

  async create(habit: Habit): Promise<Habit> {
    const habits = await this.readFile();
    const newHabit = { ...habit, id: uuidv4(), completedDates: [] };
    habits.push(newHabit);
    await this.writeFile(habits);
    return newHabit;
  }

  async delete(id: string): Promise<void> {
    const habits = await this.readFile();
    const index = habits.findIndex((h) => h.id === id);
    if (index === -1) throw new Error("Habit not found");

    habits.splice(index, 1);
    await this.writeFile(habits);
  }

  async toggleCompleteForToday(id: string): Promise<Habit> {
    const habits = await this.readFile();
    const habit = habits.find((h) => h.id === id);
    if (!habit) throw new Error("Habit not found");

    const today = new Date().toISOString().split("T")[0];

    if (habit.completedDates.includes(today)) {
      habit.completedDates = habit.completedDates.filter((d) => d !== today);
    } else {
      habit.completedDates.push(today);
    }

    await this.writeFile(habits);
    return habit;
  }
}
