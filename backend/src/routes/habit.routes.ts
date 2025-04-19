import express from "express";
import { HabitController } from "../controllers/habit.controller";
import { HabitService } from "../services/habit.service";
import { InMemoryHabitRepository } from "../repositories/InMemoryRepo";
import { FileHabitRepository } from "../repositories/FileHabitRepo";
import { config } from "../config/config";

const router = express.Router();

// Select repository type based on environment variable
const repoType = config.repoType;
const habitRepository =
  repoType === "file"
    ? new FileHabitRepository()
    : new InMemoryHabitRepository();

const habitService = new HabitService(habitRepository);
const habitController = new HabitController(habitService);

// Routes
router.get("/habits", habitController.getAllHabits);
router.post("/habits", habitController.createHabit);
router.patch("/habits/:id/toggle", habitController.toggleHabitForToday);
router.delete("/habits/:id", habitController.deleteHabit);

export default router;

