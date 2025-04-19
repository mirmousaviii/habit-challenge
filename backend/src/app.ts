import express from "express";
import habitRoutes from "./routes/habit.routes";

const app = express();

app.use(express.json());
app.use("/api/v1", habitRoutes);

export default app;

