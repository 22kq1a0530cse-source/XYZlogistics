import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    api
      .post("/register", { username, password })
      .then(() => {
        alert("Registration successful");
        navigate("/login");
      })
      .catch((err) => {
        if (err.response?.status === 409) {
          setError("User already exists");
        } else {
          setError("Registration failed");
        }
      });
  };

  return (
    <div style={box}>
      <h2>User Registration</h2>

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

      {error && <p style={errorText}>{error}</p>}

      <button style={btn} onClick={handleRegister}>
        Register
      </button>
    </div>
  );
}

/* ================= STYLES ================= */

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
  background: "#14b8a6",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
};

const errorText = {
  color: "red",
  fontSize: "13px",
  marginBottom: "10px"
};
