import {useCallback, useEffect, useState} from "react";
import {HabitWithMeta} from "../types/habit.types";
import {getAllHabits} from "../services/habit.api";
import HabitForm from "../components/HabitForm";
import HabitList from "../components/HabitList";
import Layout from "@layouts/AppLayout";

const HabitDashboard = () => {
    const [habits, setHabits] = useState<HabitWithMeta[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchHabits = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const data = await getAllHabits();
            setHabits(data);
        } catch {
            setError("Failed to load habits");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchHabits();
    }, [fetchHabits]);

    const renderContent = () => {
        if (loading) {
            return (
                <div className="text-center text-sm text-slate-500 animate-pulse">
                    Loading your habits...
                </div>
            );
        }

        if (error) {
            return <div className="text-center text-rose-500 text-sm">{error}</div>;
        }

        if (habits.length === 0) {
            return (
                <div className="text-center text-slate-500 text-sm italic">
                    No habits found. Start by creating one!
                </div>
            );
        }

        return <HabitList habits={habits} onChange={fetchHabits}/>;
    };

    return (
        <Layout>
            <div className="max-w-xl mx-auto space-y-6">
                <HabitForm onCreated={fetchHabits}/>
                {renderContent()}
            </div>
        </Layout>
    );
};

export default HabitDashboard;
