import { Habit } from "../services/habit.api";

const HabitList = ({ habits }: { habits: Habit[] }) => {
  return (
    <ul className="space-y-3 mt-6 w-full max-w-md mx-auto">
      {habits.map((habit) => (
        <li
          key={habit.id}
          className="border p-4 rounded shadow-sm bg-white flex justify-between items-center"
        >
          <div>
            <h3 className="font-semibold">{habit.name}</h3>
            {habit.description && (
              <p className="text-sm text-gray-600">{habit.description}</p>
            )}
            <p className="text-xs text-green-600 mt-1">
              ✅ Streak: {habit.streak} | Last: {habit.lastCompletedDate || "-"}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default HabitList;
