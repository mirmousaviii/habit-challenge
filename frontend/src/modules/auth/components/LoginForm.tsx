import { useState } from "react";
import { loginUser } from "../services/auth.api";
import { useAuth } from "@hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { APP_NAME } from "@core/constants";

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("user1");
  const [password, setPassword] = useState("pass1@habit");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = await loginUser({ username, password });
      login(token);
      navigate("/dashboard");
    } catch (err) {
      setError("Login failed. Check credentials.");
      if (process.env.NODE_ENV === "development") {
        console.error("Login error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="bg-white p-8 shadow-md rounded w-full max-w-sm"
    >
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
        {APP_NAME || "Habit Challenge"}!
      </h2>
      <p className="text-sm text-gray-600 mb-6 text-center">
        Login to continue your habit journey.
      </p>
      <input
        className="border p-2 w-full mb-4"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="border p-2 w-full mb-4"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 w-full rounded"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
