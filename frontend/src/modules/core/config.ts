/**
 * Application configuration and environment variables
 */

// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

// Application Settings
export const APP_NAME = import.meta.env.VITE_APP_NAME || "Habit Challenge";

// Authentication Settings
export const AUTH_TOKEN_KEY = "habit_token";

// API Timeout Settings (in milliseconds)
export const API_TIMEOUT = 10000; // 10 seconds

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: AUTH_TOKEN_KEY,
  // Add other storage keys here as needed
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
  },
  HABITS: {
    BASE: "/habits",
    TOGGLE: (id: string) => `/habits/${id}/toggle`,
  },
} as const; 