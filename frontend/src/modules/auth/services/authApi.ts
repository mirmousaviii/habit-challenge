import { http, handleApiResponse, handleApiError, SuccessResponse } from "@utils/http";
import { API_ENDPOINTS } from "@core/config";
import { LoginCredentials, LoginResponse } from "../types/auth.types";

/**
 * Authenticate user and return JWT token
 */
export const loginUser = async (
  credentials: LoginCredentials
): Promise<string> => {
  try {
    const res = await http.post<SuccessResponse<LoginResponse>>(API_ENDPOINTS.AUTH.LOGIN, credentials);
    return handleApiResponse(res).token;
  } catch (error) {
    throw handleApiError(error);
  }
};
