// Habit model definition

export interface Habit {
  id: string;
  name: string;
  description?: string;
  completedDates: string[];
}

