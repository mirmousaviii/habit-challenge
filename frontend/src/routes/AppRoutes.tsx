import { Routes, Route, Navigate } from "react-router-dom";
import { LoginView } from "@modules/auth";
import { HabitDashboardView } from "@modules/habit";
import { useAuth } from "@hooks/useAuth";
import { ROUTES, DEFAULT_ROUTE } from "./routes.config";
import { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to={ROUTES.AUTH.LOGIN} replace />;
};

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useAuth();
  return token ? <Navigate to={ROUTES.HABIT.DASHBOARD} replace /> : children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path={ROUTES.AUTH.LOGIN}
        element={
          <PublicRoute>
            <LoginView />
          </PublicRoute>
        }
      />
      <Route
        path={ROUTES.HABIT.DASHBOARD}
        element={
          <ProtectedRoute>
            <HabitDashboardView />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to={DEFAULT_ROUTE} replace />} />
    </Routes>
  );
};

export default AppRoutes;
