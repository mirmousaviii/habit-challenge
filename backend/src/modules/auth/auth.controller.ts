import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { mockUser } from "@utils/mock-user";
import { TokenStore } from "@utils/token-store";

export const login = (req: Request, res: Response): void => {
  const { username, password } = req.body;

  if (username === mockUser.username && password === mockUser.password) {
    const token = uuidv4(); // generate fake token
    TokenStore.add(token);
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};
