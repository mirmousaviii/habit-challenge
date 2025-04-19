import dotenv from "dotenv";

dotenv.config();

export const config = {
  repoType: process.env.REPO_TYPE || "memory",
  dataFilePath: "habits.json",
};
