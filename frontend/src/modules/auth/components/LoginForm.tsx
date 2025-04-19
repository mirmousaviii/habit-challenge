import { useState } from "react";
import { loginUser } from "../services/authApi";
import { useAuth } from "@hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { APP_NAME } from "@core/config";
import "./LoginForm.css"; // Example of vanilla CSS!

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
    <form onSubmit={handleLogin} className="login-form">
      <h2 className="login-title">
        {APP_NAME || "Habit Challenge"}!
      </h2>
      <p className="login-subtitle">
        Login to continue your habit journey.
      </p>
      <input
        className="login-input"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="login-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="login-error">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="login-button"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
