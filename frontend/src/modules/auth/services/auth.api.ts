import { api, handleApiResponse, handleApiError, SuccessResponse, API_ENDPOINTS } from "@modules/core";
import { LoginCredentials, LoginResponse } from "../types/auth.types";

/**
 * Authenticate user and return JWT token
 */
export const loginUser = async (
  credentials: LoginCredentials
): Promise<string> => {
  try {
    const res = await api.post<SuccessResponse<LoginResponse>>(API_ENDPOINTS.AUTH.LOGIN, credentials);
    return handleApiResponse(res).token;
  } catch (error) {
    throw handleApiError(error);
  }
};
