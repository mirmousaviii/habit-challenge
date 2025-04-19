import { Request, Response, NextFunction } from "express";
import { TokenStore } from "../utils/token-store";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Missing or invalid Authorization header" });
    return;
  }

  const token = authHeader.split(" ")[1];

  if (!TokenStore.has(token)) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  next();
};
