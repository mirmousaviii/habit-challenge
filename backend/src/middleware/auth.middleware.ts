import { Request, Response, NextFunction } from "express";
import { TokenStore } from "@utils/token-store";

const BEARER_PREFIX = "Bearer ";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization || "";

  // Check header format
  if (!authHeader.startsWith(BEARER_PREFIX)) {
    res
      .status(401)
      .json({ message: "Missing or invalid Authorization header" });
    return;
  }

  const token = authHeader.substring(BEARER_PREFIX.length);

  // Validate token
  if (!TokenStore.has(token)) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  next();
};
