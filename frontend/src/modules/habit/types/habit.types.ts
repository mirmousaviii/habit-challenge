export interface Habit {
    id: string;
    name: string;
    description?: string;
    completedDates: string[];
  }
  
  export interface HabitWithMeta extends Habit {
    streak: number;
    lastCompletedDate: string | null;
  }
  
  export interface CreateHabitDto {
    name: string;
    description?: string;
  }
  