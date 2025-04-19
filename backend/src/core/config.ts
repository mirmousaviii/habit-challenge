import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || "3000", 10),
  repoType: process.env.REPO_TYPE || "memory", // memory or file
  dataFilePath: process.env.DATA_FILE || "data/habits.json",
  auth: {
    username: process.env.FAKE_USERNAME,
    password: process.env.FAKE_PASSWORD,
  },
};
