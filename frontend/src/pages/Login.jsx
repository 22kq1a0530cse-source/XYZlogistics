import { useState } from "react";
import { api } from "../services/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");

    api
      .post("/login", { username, password })
      .then((res) => {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("username", res.data.username);
        window.location.href = "/";
      })
      .catch(() => {
        setError("Invalid username or password");
      });
  }; // ✅ THIS WAS MISSING

  return (
    <div style={page}>
      <div style={card}>
        {/* Avatar */}
        <div style={avatarBox}>
          <div style={avatar}>👤</div>
        </div>

        <h2 style={title}>Sign In</h2>

        {/* Username */}
        <div style={inputWrapper}>
          <span style={icon}>👤</span>
          <input
            style={input}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Password */}
        <div style={inputWrapper}>
          <span style={icon}>🔒</span>
          <input
            style={input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p style={errorText}>{error}</p>}

        <button style={loginBtn} onClick={handleLogin}>
          LOGIN
        </button>

        <div style={footer}>
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <span style={forgot}>Forgot password?</span>
        </div>
      </div>
    </div>
  );
}

/* ===================== STYLES ===================== */

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
  borderRadius: "20px",
  padding: "40px 30px",
  textAlign: "center",
  boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
};

const avatarBox = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "10px"
};

const avatar = {
  width: "70px",
  height: "70px",
  borderRadius: "50%",
  background: "#2563eb",
  color: "#ffffff",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "32px"
};

const title = {
  marginBottom: "25px",
  color: "#2563eb"
};

const inputWrapper = {
  display: "flex",
  alignItems: "center",
  background: "#f1f5f9",
  borderRadius: "30px",
  padding: "10px 15px",
  marginBottom: "15px"
};

const icon = {
  marginRight: "10px",
  fontSize: "18px"
};

const input = {
  border: "none",
  outline: "none",
  background: "transparent",
  width: "100%",
  fontSize: "14px"
};

const loginBtn = {
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  background: "#2563eb",
  color: "#ffffff",
  border: "none",
  borderRadius: "30px",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "15px"
};

const footer = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "15px",
  fontSize: "12px",
  color: "#555"
};

const forgot = {
  cursor: "pointer",
  color: "#2563eb"
};

const errorText = {
  color: "red",
  fontSize: "13px",
  marginBottom: "10px"
};