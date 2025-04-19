import { useAuth } from "@context/AuthContext";
import { useEffect, useState } from "react";
import { getAllHabits, Habit } from "../services/habit.api";
import HabitList from "../components/HabitList";
import HabitForm from "../components/HabitForm";

const HabitDashboard = () => {
  const { token, logout } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchHabits = async () => {
    setLoading(true);
    try {
      const data = await getAllHabits(token!);
      setHabits(data);
    } catch {
      setError("Failed to load habits");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchHabits();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Habits</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </header>

      <HabitForm onCreated={fetchHabits} />

      {loading && <p className="text-gray-500">Loading habits...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && habits.length === 0 && (
        <p className="text-gray-600">No habits found.</p>
      )}
      {!loading && habits.length > 0 && (
        <HabitList habits={habits} />
      )}
    </div>
  );
};

export default HabitDashboard;
