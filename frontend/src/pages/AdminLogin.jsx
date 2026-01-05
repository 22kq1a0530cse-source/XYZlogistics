import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // TEMP admin credentials
    if (username === "admin" && password === "admin123") {
  localStorage.setItem("role", "admin");
  localStorage.setItem("username", "Admin"); // ✅ ADD THIS LINE
  navigate("/trucks");
}
 else {
      setError("Invalid admin credentials");
    }
  };

  return (
    <div style={box}>
      <h2>Admin Login</h2>

      <input
        style={input}
        placeholder="Admin Username"
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

      <button style={btn} onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

/* styles */
const box = {
  width: "320px",
  margin: "120px auto",
  padding: "25px",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  background: "white",
  textAlign: "center"
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  border: "1px solid #ccc",
  borderRadius: "4px"
};

const btn = {
  width: "100%",
  padding: "10px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
};