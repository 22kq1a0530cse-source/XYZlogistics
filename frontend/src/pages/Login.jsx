import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    setError("");

    const cleanUsername = username.trim();
    const cleanPassword = password.trim();

    if (!cleanUsername || !cleanPassword) {
      setError("Please enter username and password");
      return;
    }

    api
      .post("/login", {
        username: cleanUsername,
        password: cleanPassword
      })
      .then((res) => {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("username", res.data.username);

        if (res.data.role === "admin") {
          navigate("/dashboard/trucks");
        } else {
          navigate("/dashboard/trips");
        }
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Invalid credentials");
      });
  };

  return (
    <div style={page}>
      {/* background shapes */}
      <div style={blobLeft}></div>
      <div style={blobRight}></div>

      <div style={card}>
        {/* avatar */}
        <div style={avatarWrap}>
          <div style={avatarCircle}></div>
        </div>

        <h2 style={title}>Sign In</h2>

        {/* Username */}
        <div style={inputWrap}>
          <span style={icon}>👤</span>
          <input
            style={input}
            placeholder="Username / Driver ID"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Password */}
        <div style={inputWrap}>
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

        <button style={btn} onClick={handleLogin}>
          LOGIN
        </button>

        <div style={footer}>
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <span style={forgot}>Forgot password?</span>
        </div>

        <p style={demo}>
          Admin: admin / admin123 <br />
          Driver: D001 / 1234
        </p>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  height: "100vh",
  background: "linear-gradient(135deg, #2fbf9f, #1fa0c9)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
  fontFamily: "Inter, sans-serif"
};

const blobLeft = {
  position: "absolute",
  width: "420px",
  height: "420px",
  background: "#33d1a7",
  borderRadius: "50%",
  bottom: "-140px",
  left: "-140px",
  opacity: 0.8
};

const blobRight = {
  position: "absolute",
  width: "360px",
  height: "360px",
  background: "#3bb8e5",
  borderRadius: "50%",
  top: "-120px",
  right: "-120px",
  opacity: 0.8
};

const card = {
  width: "340px",
  padding: "34px 26px",
  borderRadius: "22px",
  background: "rgba(255,255,255,0.25)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  boxShadow: "0 30px 60px rgba(0,0,0,0.25)",
  textAlign: "center",
  position: "relative",
  zIndex: 2
};

const avatarWrap = {
  width: "90px",
  height: "90px",
  margin: "0 auto 14px",
  borderRadius: "18px",
  background: "rgba(255,255,255,0.35)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const avatarCircle = {
  width: "42px",
  height: "42px",
  borderRadius: "50%",
  background: "#0f766e"
};

const title = {
  color: "#ffffff",
  fontWeight: "500",
  marginBottom: "18px"
};

const inputWrap = {
  display: "flex",
  alignItems: "center",
  background: "rgba(255,255,255,0.9)",
  borderRadius: "12px",
  padding: "0 14px",
  marginBottom: "14px"
};

const icon = {
  marginRight: "10px",
  fontSize: "16px"
};

const input = {
  flex: 1,
  height: "44px",
  border: "none",
  outline: "none",
  background: "transparent",
  fontSize: "14px"
};

const btn = {
  width: "100%",
  height: "46px",
  borderRadius: "12px",
  border: "none",
  background: "linear-gradient(90deg, #0f766e, #0ea5a5)",
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: "600",
  cursor: "pointer",
  marginTop: "6px"
};

const footer = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "14px",
  fontSize: "12px",
  color: "#e5e7eb"
};

const forgot = {
  cursor: "pointer"
};

const errorText = {
  color: "#fee2e2",
  fontSize: "13px",
  marginBottom: "6px"
};

const demo = {
  marginTop: "12px",
  fontSize: "11px",
  color: "#e5e7eb"
};