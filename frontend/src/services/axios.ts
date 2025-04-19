import axios from "axios";
import { useAuth } from "../context/AuthContext";

// Create Axios instance
const api = axios.create({
  baseURL: "http://localhost:3000/api/v1", // backend base URL
});

// TODO: Add an interceptor here if needed globally
// But we can also pass token directly in services (safer for SSR-free apps)

export default api;
