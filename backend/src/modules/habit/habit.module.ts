import { HabitController } from "./habit.controller";
import { HabitService } from "./habit.service";
import { FileHabitRepository } from "./repository/habit.repository.file";
import { InMemoryHabitRepository } from "./repository/habit.repository.memory";
import { config } from "@core/config";
import { RepositoryType } from "./habit.model";

// Dynamically select the repository implementation based on configuration
const repositoryMap = {
  [RepositoryType.FILE]: FileHabitRepository,
  [RepositoryType.MEMORY]: InMemoryHabitRepository,
};

const RepositoryClass = repositoryMap[config.repoType];
const habitRepository = new RepositoryClass();

const habitService = new HabitService(habitRepository);
const habitController = new HabitController(habitService);

export const habitModule = {
  controller: habitController,
};
