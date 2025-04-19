import {HabitWithMeta} from "../types/habit.types";
import {deleteHabit, toggleHabit} from "../services/habit.api";
import {useState} from "react";

interface HabitItemProps {
    habit: HabitWithMeta;
    onChange: () => void;
}

const HabitItem = ({habit, onChange}: HabitItemProps) => {
    const [loading, setLoading] = useState(false);

    const today = new Date().toISOString().split("T")[0];
    const completedToday = habit.completedDates.includes(today);

    const handleToggle = async () => {
        setLoading(true);
        await toggleHabit(habit.id);
        await onChange();
        setLoading(false);
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this habit?")) return;
        await deleteHabit(habit.id);
        onChange();
    };

    return (
        <li className="p-4 rounded-xl shadow-sm bg-white hover:shadow-md transition border border-slate-200 flex justify-between items-start gap-4">
            <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-800">{habit.name}</h3>
                {habit.description && (
                    <p className="text-sm text-slate-600">{habit.description}</p>
                )}
                <p className="text-xs text-indigo-500 mt-1">
                    ✅ Streak: {habit.streak} | Last: {habit.lastCompletedDate || "-"}
                </p>
            </div>

            <div className="flex flex-col gap-2 mt-1">
                <button
                    onClick={handleToggle}
                    disabled={loading}
                    className={`px-3 py-1.5 rounded-md text-sm transition border ${
                        completedToday
                            ? "bg-emerald-500 text-white hover:bg-emerald-600 border-emerald-600"
                            : "text-indigo-600 border-indigo-500 hover:bg-indigo-50"
                    } disabled:opacity-50`}
                >
                    {loading ? "Loading..." : completedToday ? "Done today" : "Mark done"}
                </button>

                <button
                    onClick={handleDelete}
                    className="px-3 py-1.5 rounded-md text-sm border border-rose-500 text-rose-600 hover:bg-rose-50 transition"
                >
                    Delete
                </button>
            </div>
        </li>
    );
};

export default HabitItem;
