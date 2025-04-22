import express from "express";
import cors from "cors";
import authRoutes from "@modules/auth/auth.routes";
import habitRoutes from "@modules/habit/habit.routes";
import { authMiddleware } from "@core/middleware/auth.middleware";

const app = express();
app.use(cors());

// Middlewares
app.use(express.json());

// Public routes (no auth)
app.use("/api/v1", authRoutes);

// Protected routes (with auth)
app.use("/api/v1", authMiddleware, habitRoutes);


export default app;
