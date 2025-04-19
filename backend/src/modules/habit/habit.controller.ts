import { Request, Response } from "express";
import { HabitService } from "./habit.service";
import { HabitCreateDto } from "./habit.model";

export class HabitController {
  constructor(private habitService: HabitService) {}

  getAllHabits = async (req: Request, res: Response): Promise<void> => {
    try {
      const habits = await this.habitService.getAllHabits();
      res.json(habits);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

  createHabit = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, description } = req.body as HabitCreateDto;

      if (!name) {
        res.status(400).json({ message: "Name is required" });
        return;
      }

      const habit = await this.habitService.createHabit({ name, description });
      res.status(201).json(habit);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  toggleHabitForToday = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const updatedHabit = await this.habitService.toggleHabitForToday(id);
      res.json(updatedHabit);
    } catch (error) {
      res.status(404).json({ message: (error as Error).message });
    }
  };
  
  deleteHabit = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      await this.habitService.deleteHabit(id);
      res.status(204).send(); // No content
    } catch (error) {
      res.status(404).json({ message: (error as Error).message });
    }
  };
  
}

