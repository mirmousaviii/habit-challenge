import { HabitController } from "./habit.controller";
import { HabitService } from "./habit.service";
import { FileHabitRepository } from "./repository/habit.repository.file";
import { InMemoryHabitRepository } from "./repository/habit.repository.memory";
import { config } from "../../core/config";

// Choose repository based on config
const habitRepository =
  config.repoType === "file"
    ? new FileHabitRepository()
    : new InMemoryHabitRepository();

const habitService = new HabitService(habitRepository);
const habitController = new HabitController(habitService);

export const habitModule = {
  controller: habitController,
};
