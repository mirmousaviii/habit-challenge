import axios from "axios";
import { API_URL } from "@core/constants";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token to all requests automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("habit_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Global error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    console.warn("Unauthorized! Redirecting to login...");
                    localStorage.removeItem("habit_token");
                    window.location.assign("/login");
                    // TODO: Show a notification                    
                    break;
                case 403:
                    console.warn("Forbidden! You don't have permission to access this resource.");
                    // TODO: Handle forbidden access
                    break;
                case 500:
                    console.error("Server error! Please try again later.");
                    // TODO: Optionally show a user-friendly error message
                    break;
                default:
                    console.error(`Unexpected error: ${error.response.status}`);
            }
        } else {
            console.error("Network error or server is unreachable.");
            // TODO: Optionally handle network errors
        }
        return Promise.reject(error);
    }
);
