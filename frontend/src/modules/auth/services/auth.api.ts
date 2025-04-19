import { api } from "@core/axios";
import { LoginCredentials, LoginResponse } from "../types/auth.types";

/**
 * Authenticate user and return JWT token
 */
export const loginUser = async (
  credentials: LoginCredentials
): Promise<string> => {
  const res = await api.post<LoginResponse>("/auth/login", credentials);
  return res.data.token;
};
