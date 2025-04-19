import {HabitWithMeta} from "../types/habit.types";
import HabitItem from "./HabitItem";

interface HabitListProps {
    habits: HabitWithMeta[];
    onToggle: (habit: HabitWithMeta) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}

const HabitList = ({habits, onToggle, onDelete}: HabitListProps) => {
    return (
        <ul className="space-y-4 mt-8 max-w-xl mx-auto">
            {habits.map((habit) => (
                <HabitItem 
                    key={habit.id} 
                    habit={habit} 
                    onToggle={() => onToggle(habit)}
                    onDelete={() => onDelete(habit.id)}
                />
            ))}
        </ul>
    );
};

export default HabitList;
