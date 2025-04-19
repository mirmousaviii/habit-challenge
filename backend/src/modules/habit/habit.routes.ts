import express from "express";
import { habitModule } from "./habit.module";

const router = express.Router();

// Routes
router.get("/habits", habitModule.controller.getAllHabits);
router.post("/habits", habitModule.controller.createHabit);
router.patch("/habits/:id/toggle", habitModule.controller.toggleHabitForToday);
router.delete("/habits/:id", habitModule.controller.deleteHabit);

export default router;
