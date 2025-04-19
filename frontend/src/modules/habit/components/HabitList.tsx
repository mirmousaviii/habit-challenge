import HabitItem from "./HabitItem";
import { Habit } from "../services/habit.api";

interface HabitListProps {
  habits: Habit[];
  onChange: () => void;
}

const HabitList = ({ habits, onChange }: HabitListProps) => {
  return (
    <ul className="space-y-4 mt-8 max-w-xl mx-auto">
      {habits.map((habit) => (
        <HabitItem key={habit.id} habit={habit} onChange={onChange} />
      ))}
    </ul>
  );
};

export default HabitList;
