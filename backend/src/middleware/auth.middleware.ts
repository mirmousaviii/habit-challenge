import { Request, Response, NextFunction } from "express";
import { TokenStore } from "@utils/token-store";
import { unauthorizedResponse } from "@utils/response.util";

const BEARER_PREFIX = "Bearer ";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization || "";

  // Check header format
  if (!authHeader.startsWith(BEARER_PREFIX)) {
    unauthorizedResponse(res, "Missing or invalid Authorization header", "INVALID_AUTH_HEADER");
    return;
  }

  const token = authHeader.substring(BEARER_PREFIX.length);

  // Validate token
  if (!TokenStore.has(token)) {
    unauthorizedResponse(res, "Unauthorized", "INVALID_TOKEN");
    return;
  }

  next();
};
