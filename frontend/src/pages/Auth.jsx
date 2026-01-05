import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    api
      .post("/login", { username, password })
      .then(() => {
        // ✅ FIX: use role, not loggedIn
        localStorage.setItem("role", "admin");
        localStorage.setItem("username", username);

        navigate("/trucks"); // go to admin dashboard
      })
      .catch(() => setError("Invalid admin credentials"));
  };

  return (
    <div style={page}>
      <div style={card}>
        <h2 style={title}>Admin Login</h2>

        <input
          style={input}
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          style={input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button style={button} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

/* styles */

const page = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #e0f2fe, #2563eb)"
};

const card = {
  width: "360px",
  background: "#ffffff",
  borderRadius: "16px",
  padding: "35px",
  textAlign: "center",
  boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
};

const title = {
  marginBottom: "20px",
  color: "#2563eb"
};

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc"
};

const button = {
  width: "100%",
  padding: "12px",
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "bold"
};
