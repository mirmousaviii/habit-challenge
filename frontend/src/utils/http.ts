import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { API_URL, API_TIMEOUT, STORAGE_KEYS } from "../core/config";

export interface ErrorResponse {
  error: {
    code?: string;
    message: string;
    details?: unknown;
  };
}

export interface SuccessResponse<T = unknown> {
  data?: T;
  message?: string;
}

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public code?: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Create and configure axios instance
 */
export const http = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: API_TIMEOUT,
});

/**
 * Request interceptor for adding auth token
 */
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor for handling errors
 */
http.interceptors.response.use(
  (response: AxiosResponse<SuccessResponse>) => response,
  (error: AxiosError<ErrorResponse>) => {
    if (error.response) {
      const { status, data } = error.response;
      const errorMessage = data?.error?.message || "An unexpected error occurred";
      const errorCode = data?.error?.code;
      const errorDetails = data?.error?.details;

      // Create ApiError instance
      const apiError = new ApiError(status, errorMessage, errorCode, errorDetails);

      switch (status) {
        case 400:
          // TODO: Implement user-friendly error notification for bad requests
          console.error(`Bad Request: ${errorMessage}`, errorDetails);
          break;
        case 401:
          // TODO: Improve this line to use a more robust method of checking the current URL
          if (window.location.pathname !== "/login") {
            localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
            window.location.assign("/login");
          } 
         
          // TODO: Implement proper auth state management and redirect handling
          console.warn(`Unauthorized: ${errorMessage}`);
         
          break;
        case 403:
          // TODO: Implement proper access control UI feedback
          console.warn(`Forbidden: ${errorMessage}`);
          break;
        case 404:
          // TODO: Implement 404 page or fallback UI
          console.warn(`Not Found: ${errorMessage}`);
          break;
        case 405:
          // TODO: Implement method not allowed UI feedback
          console.warn(`Method Not Allowed: ${errorMessage}`);
          break;
        case 408:
          // TODO: Implement retry mechanism for timeout errors
          console.warn(`Request Timeout: ${errorMessage}`);
          break;
        case 409:
          // TODO: Implement conflict resolution UI
          console.warn(`Conflict: ${errorMessage}`);
          break;
        case 413:
          // TODO: Implement file size validation and user feedback
          console.warn(`Payload Too Large: ${errorMessage}`);
          break;
        case 415:
          // TODO: Implement file type validation and user feedback
          console.warn(`Unsupported Media Type: ${errorMessage}`);
          break;
        case 422:
          // TODO: Implement form validation error display
          console.warn(`Validation Error: ${errorMessage}`, errorDetails);
          break;
        case 429:
          // TODO: Implement rate limiting UI feedback and retry mechanism
          console.warn(`Too Many Requests: ${errorMessage}`);
          break;
        case 500:
          // TODO: Implement error boundary and fallback UI
          console.error(`Internal Server Error: ${errorMessage}`);
          break;
        case 502:
          // TODO: Implement service status check and user notification
          console.error(`Bad Gateway: ${errorMessage}`);
          break;
        case 503:
          // TODO: Implement service maintenance mode UI
          console.error(`Service Unavailable: ${errorMessage}`);
          break;
        case 504:
          // TODO: Implement gateway timeout retry mechanism
          console.error(`Gateway Timeout: ${errorMessage}`);
          break;
        default:
          // TODO: Implement generic error handling UI
          console.error(`Unexpected error (${status}): ${errorMessage}`);
      }

      return Promise.reject(apiError);
    } else if (error.request) {
      // TODO: Implement offline mode detection and UI
      console.error("Network error: No response received from server");
      return Promise.reject(new ApiError(0, "Network error: No response received from server"));
    } else {
      // TODO: Implement request setup error handling
      console.error("Error setting up request:", error.message);
      return Promise.reject(new ApiError(0, `Error setting up request: ${error.message}`));
    }
  }
);

/**
 * Helper function to handle API responses
 */
export const handleApiResponse = <T>(response: AxiosResponse<SuccessResponse<T>>): T => {
  if (!response.data.data) {
    throw new ApiError(500, "No data received from server");
  }
  return response.data.data;
};

/**
 * Helper function to handle API errors
 */
export const handleApiError = (error: unknown): never => {
  if (error instanceof ApiError) {
    throw error;
  }
  if (axios.isAxiosError(error)) {
    throw new ApiError(
      error.response?.status || 0,
      error.message,
      error.response?.data?.error?.code,
      error.response?.data?.error?.details
    );
  }
  throw new ApiError(0, "An unexpected error occurred");
}; 