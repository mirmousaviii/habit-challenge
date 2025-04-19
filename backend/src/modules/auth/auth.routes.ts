import express from "express";
import { login } from "./auth.controller";

const router = express.Router();

router.post("/auth/login", login);

export default router;
