import { Request, Response } from "express";
import { LoginDto } from "./auth.model";
import { v4 as uuidv4 } from "uuid";
import { mockUser } from "./utils/mock-user.util";
import { TokenStore } from "@utils/token-store.util";
import { errorResponse, successResponse } from "@utils/response.util";

export const login = (req: Request, res: Response): void => {
  const { username, password } = req.body as LoginDto;

  if (username === mockUser.username && password === mockUser.password) {
    const token = uuidv4(); // generate fake token
    TokenStore.add(token);
    successResponse(res, 200, { token }, "Login successful");
  } else {
    errorResponse(res, 401, "Invalid credentials", "INVALID_CREDENTIALS");
  }
};
