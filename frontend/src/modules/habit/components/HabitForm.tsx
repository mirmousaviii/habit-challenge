import { useState } from "react";
import { createHabit } from "../services/habit.api";
import { useAuth } from "@hooks/useAuth";

interface HabitFormProps {
  onClose: () => void;
  onSuccess: () => Promise<void>;
}

const HabitForm = ({ onClose, onSuccess }: HabitFormProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { token } = useAuth();
  if (!token) {
    return null; // or handle unauthenticated state
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createHabit({ name, description });
      setName("");
      setDescription("");
      await onSuccess();
      onClose();
    } catch (err) {
      setError("Failed to create habit");
      if (process.env.NODE_ENV === "development") {
        console.error("Create habit error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md border border-slate-200 max-w-xl mx-auto"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-indigo-700">
          Create a New Habit
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="text-slate-500 hover:text-slate-700"
        >
          ✕
        </button>
      </div>

      <input
        type="text"
        placeholder="Habit name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="block w-full p-3 mb-3 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        required
      />

      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="block w-full p-3 mb-3 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
      />

      {error && <p className="text-sm text-rose-500 mb-3">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-indigo-600 hover:bg-indigo-700 text-white w-full py-2 rounded-md transition disabled:opacity-50"
      >
        {loading ? "Creating..." : "Add Habit"}
      </button>
    </form>
  );
};

export default HabitForm;
