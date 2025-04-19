import api from "@services/axios";

export const loginUser = async (username: string, password: string): Promise<string> => {
  const res = await api.post("/auth/login", { username, password });
  return res.data.token;
};
