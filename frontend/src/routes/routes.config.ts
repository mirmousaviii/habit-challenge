export const ROUTES = {
  AUTH: {
    LOGIN: "/login",
  },
  HABIT: {
    DASHBOARD: "/dashboard",
  },
} as const;

export const DEFAULT_ROUTE = ROUTES.AUTH.LOGIN; 