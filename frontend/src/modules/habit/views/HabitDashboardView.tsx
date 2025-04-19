import { useState } from "react";
import { HabitWithMeta } from "../types/habit.types";
import HabitForm from "../components/HabitForm";
import HabitList from "../components/HabitList";
import Layout from "@layouts/AppLayout";
import { useHabits } from "../hooks/useHabits";

export const HabitDashboardView = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const { habits, isLoading, error, toggleHabit, deleteHabit, fetchHabits } = useHabits();

    const handleToggle = async (habit: HabitWithMeta) => {
        try {
            await toggleHabit(habit.id);
        } catch (error) {
            console.error("Failed to toggle habit:", error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteHabit(id);
        } catch (error) {
            console.error("Failed to delete habit:", error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-500">Error: {error.message}</div>
            </div>
        );
    }

    return (
        <Layout>
            <div className="max-w-xl mx-auto space-y-6">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Habits</h1>
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                        Add New Habit
                    </button>
                </div>

                <HabitList
                    habits={habits}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                />

                {isFormOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg w-full max-w-md">
                            <HabitForm onClose={() => setIsFormOpen(false)} onSuccess={fetchHabits} />
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};
