import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    phone: "",
    age: "",
    gender: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleRegister = () => {
    setError("");

    const { username, password, phone, age, gender } = form;

    if (!username || !password || !phone || !age || !gender) {
      setError("All fields are required");
      return;
    }

    if (phone.length !== 10) {
      setError("Phone number must be 10 digits");
      return;
    }

    if (Number(age) < 18) {
      setError("Age must be 18 or above");
      return;
    }

    setLoading(true);

    api
      .post("/register", {
        username,
        password,
        phone,
        age,
        gender
      })
      .then((res) => {
        alert(
          `Registration successful 🎉\n\nDriver ID: ${res.data.driver_id}\nDefault Password: ${res.data.default_password}`
        );
        navigate("/login");
      })
      .catch((err) => {
        console.error(err.response?.data);
        setError(err.response?.data?.message || "Registration failed. Try again.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div style={page}>
      {/* background blobs */}
      <div style={blobLeft}></div>
      <div style={blobRight}></div>

      <div style={card}>
        <div style={avatarWrap}>
          <div style={avatarCircle}></div>
        </div>

        <h2 style={title}>Create Account</h2>

        <div style={inputWrap}>
          <span style={icon}>👤</span>
          <input
            style={input}
            name="username"
            value={form.username}
            placeholder="Username"
            onChange={handleChange}
          />
        </div>

        <div style={inputWrap}>
          <span style={icon}>🔒</span>
          <input
            style={input}
            type="password"
            name="password"
            value={form.password}
            placeholder="Password"
            onChange={handleChange}
          />
        </div>

        <div style={inputWrap}>
          <span style={icon}>📞</span>
          <input
            style={input}
            name="phone"
            value={form.phone}
            placeholder="Phone Number"
            onChange={handleChange}
          />
        </div>

        <div style={inputWrap}>
          <span style={icon}>🎂</span>
          <input
            style={input}
            type="number"
            name="age"
            value={form.age}
            placeholder="Age"
            onChange={handleChange}
          />
        </div>

        <div style={inputWrap}>
          <span style={icon}>⚧️</span>
          <select
            style={select}
            name="gender"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {error && <p style={errorText}>{error}</p>}

        <button style={btn} onClick={handleRegister} disabled={loading}>
          {loading ? "Registering..." : "REGISTER"}
        </button>

        <p style={footerText}>
          Already have an account?{" "}
          <span style={link} onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

/* ================= STYLES (SAME THEME AS LOGIN) ================= */

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
  opacity: 0.8,
  pointerEvents: "none"
};

const blobRight = {
  position: "absolute",
  width: "360px",
  height: "360px",
  background: "#3bb8e5",
  borderRadius: "50%",
  top: "-120px",
  right: "-120px",
  opacity: 0.8,
  pointerEvents: "none"
};

const card = {
  width: "360px",
  padding: "34px 26px",
  borderRadius: "22px",
  background: "rgba(255,255,255,0.25)",
  backdropFilter: "blur(14px)",
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

const select = {
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

const errorText = {
  color: "#fee2e2",
  fontSize: "13px",
  marginBottom: "6px"
};

const footerText = {
  marginTop: "14px",
  fontSize: "13px",
  color: "#e5e7eb"
};

const link = {
  color: "#ffffff",
  fontWeight: "500",
  cursor: "pointer"
};
