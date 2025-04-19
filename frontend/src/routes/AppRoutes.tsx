import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@modules/auth/pages/LoginPage";
import HabitDashboard from "@modules/habit/pages/HabitDashboard";
import { useAuth } from "@context/AuthContext";

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />
        }
      />
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? <HabitDashboard /> : <Navigate to="/login" />
        }
      />
    </Routes>
  );
};

export default AppRoutes;
