import { Request, Response } from "express";
import { HabitService } from "./habit.service";
import { HabitCreateDto } from "./habit.model";
import { 
  successResponse, 
  createdResponse, 
  noContentResponse, 
  errorResponse, 
  notFoundResponse 
} from "@utils/response.util";

export class HabitController {
  constructor(private habitService: HabitService) {}

  getAllHabits = async (req: Request, res: Response): Promise<void> => {
    try {
      const habits = await this.habitService.getAllHabits();
      successResponse(res, 200, habits, "Habits retrieved successfully");
    } catch (error) {
      errorResponse(res, 500, "Internal server error", "INTERNAL_SERVER_ERROR");
    }
  };

  createHabit = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, description } = req.body as HabitCreateDto;

      if (!name) {
        errorResponse(res, 400, "Name is required", "MISSING_REQUIRED_FIELD");
        return;
      }

      const habit = await this.habitService.createHabit({ name, description });
      createdResponse(res, habit, "Habit created successfully");
    } catch (error) {
      errorResponse(res, 500, "Internal server error", "INTERNAL_SERVER_ERROR");
    }
  };
  
  toggleHabitForToday = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const updatedHabit = await this.habitService.toggleHabitForToday(id);
      successResponse(res, 200, updatedHabit, "Habit status updated successfully");
    } catch (error) {
      notFoundResponse(res, "Habit not found", "HABIT_NOT_FOUND");
    }
  };
  
  deleteHabit = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      await this.habitService.deleteHabit(id);
      noContentResponse(res);
    } catch (error) {
      notFoundResponse(res, "Habit not found", "HABIT_NOT_FOUND");
    }
  };
}

