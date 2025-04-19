import { useAuth } from "@context/AuthContext";
import { Habit, toggleHabit, deleteHabit } from "../services/habit.api";

interface HabitListProps {
  habits: Habit[];
  onChange: () => void;
}

const HabitList = ({ habits, onChange }: HabitListProps) => {
  const { token } = useAuth();

  const handleToggle = async (id: string) => {
    await toggleHabit(id, token!);
    onChange();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this habit?")) return;
    await deleteHabit(id, token!);
    onChange();
  };

  return (
    <ul className="space-y-3 mt-6 w-full max-w-md mx-auto">
      {habits.map((habit) => (
        <li
          key={habit.id}
          className="border p-4 rounded shadow-sm bg-white flex justify-between items-start"
        >
          <div className="flex-1">
            <h3 className="font-semibold">{habit.name}</h3>
            {habit.description && (
              <p className="text-sm text-gray-600">{habit.description}</p>
            )}
            <p className="text-xs text-green-600 mt-1">
              ✅ Streak: {habit.streak} | Last: {habit.lastCompletedDate || "-"}
            </p>
          </div>

          <div className="flex gap-2 ml-4">
            <button
              onClick={() => handleToggle(habit.id)}
              className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
              title="Toggle for Today"
            >
              ✅
            </button>
            <button
              onClick={() => handleDelete(habit.id)}
              className="delete-btn"
              title="Delete"
            >
              ❌
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default HabitList;
