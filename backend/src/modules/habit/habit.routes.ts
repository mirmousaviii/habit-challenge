import express from "express";
import { habitModule } from "./habit.module";

const router = express.Router();

// Routes

router.get("/habits", habitModule.controller.getAllHabits);

router.post("/habits", habitModule.controller.createHabit);

// NOTE: This endpoint was implemented as requested (toggle behavior).
// In a real-world project, this could be refactored into PATCH /habits/:id with a HabitUpdateDto.
router.patch("/habits/:id/toggle", habitModule.controller.toggleHabitForToday);

router.delete("/habits/:id", habitModule.controller.deleteHabit);

export default router;
