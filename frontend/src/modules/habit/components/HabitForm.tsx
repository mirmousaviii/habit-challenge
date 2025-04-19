import { useState } from "react";
import { useAuth } from "@context/AuthContext";
import { createHabit } from "../services/habit.api";

interface HabitFormProps {
  onCreated: () => void;
}

const HabitForm = ({ onCreated }: HabitFormProps) => {
  const { token } = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createHabit({ name, description }, token!);
      setName("");
      setDescription("");
      onCreated();
    } catch (err) {
      setError("Failed to create habit.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow w-full max-w-md mx-auto mb-6"
    >
      <h2 className="text-lg font-semibold mb-4">Create a New Habit</h2>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Habit name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="border p-2 w-full mb-3"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        {loading ? "Creating..." : "Add Habit"}
      </button>
    </form>
  );
};

export default HabitForm;
