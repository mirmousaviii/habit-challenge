import api from "@services/axios";

export interface Habit {
  id: string;
  name: string;
  description?: string;
  completedDates: string[];
  streak: number;
  lastCompletedDate: string | null;
}

export const getAllHabits = async (token: string): Promise<Habit[]> => {
  const response = await api.get("/habits", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createHabit = async (
    data: { name: string; description?: string },
    token: string
  ): Promise<void> => {
    await api.post("/habits", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

export const toggleHabit = async (id: string, token: string): Promise<Habit> => {
const response = await api.patch(`/habits/${id}/toggle`, null, {
    headers: {
    Authorization: `Bearer ${token}`,
    },
});
return response.data;
};

export const deleteHabit = async (id: string, token: string): Promise<void> => {
await api.delete(`/habits/${id}`, {
    headers: {
    Authorization: `Bearer ${token}`,
    },
});
};