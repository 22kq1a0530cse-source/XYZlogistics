import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function SafetyDashboard() {
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const navigate = useNavigate();

  const [safetyData, setSafetyData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ADMIN FORM STATE
  const [driverId, setDriverId] = useState("");
  const [name, setName] = useState("");
  const [overspeed, setOverspeed] = useState("");
  const [score, setScore] = useState("");

  // 🔐 PROTECT PAGE
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  // 📡 FETCH SAFETY DATA
  const fetchSafety = () => {
    api
      .get("/safety")
      .then((res) => setSafetyData(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchSafety();
  }, []);

  // ➕ ADD SAFETY (ADMIN ONLY)
  const handleAddSafety = () => {
    if (!driverId || !name || !overspeed || !score) {
      alert("Fill all fields");
      return;
    }

    api
      .post("/safety", {
        driver_id: driverId,
        name,
        overspeed: Number(overspeed),
        score: Number(score),
        role
      })
      .then(() => {
        setDriverId("");
        setName("");
        setOverspeed("");
        setScore("");
        fetchSafety();
      })
      .catch((err) =>
        alert(err.response?.data?.message || "Failed to add safety record")
      );
  };

  // 📊 SUMMARY VALUES
  const totalDrivers = safetyData.length;
  const totalOverspeed = safetyData.reduce((sum, d) => sum + d.overspeed, 0);
  const safeDrivers = safetyData.filter((d) => d.score >= 80).length;
  const highRiskDrivers = safetyData.filter((d) => d.score < 60).length;

  return (
    <>
      <h2>Safety & Over-Speed Dashboard</h2>

      {/* 🔐 ADMIN ADD FORM */}
      {isAdmin && (
        <div style={formBox}>
          <h4>Add Safety Record</h4>

          <input
            style={input}
            placeholder="Driver ID"
            value={driverId}
            onChange={(e) => setDriverId(e.target.value)}
          />

          <input
            style={input}
            placeholder="Driver Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            style={input}
            type="number"
            placeholder="Over-speed Count"
            value={overspeed}
            onChange={(e) => setOverspeed(e.target.value)}
          />

          <input
            style={input}
            type="number"
            placeholder="Safety Score"
            value={score}
            onChange={(e) => setScore(e.target.value)}
          />

          <button style={addBtn} onClick={handleAddSafety}>
            + Add Safety
          </button>
        </div>
      )}

      {/* SUMMARY CARDS */}
      <div style={cardGrid}>
        <SummaryCard title="Total Drivers" value={totalDrivers} />
        <SummaryCard title="Over-speed Alerts" value={totalOverspeed} />
        <SummaryCard title="Safe Drivers" value={safeDrivers} />
        <SummaryCard title="High-Risk Drivers" value={highRiskDrivers} />
      </div>

      {/* TABLE */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Driver ID</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Over-speed</th>
            <th style={thStyle}>Safety Score</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>

        <tbody>
          {loading && (
            <tr>
              <td colSpan="5" style={tdStyle}>Loading...</td>
            </tr>
          )}

          {!loading && safetyData.length === 0 && (
            <tr>
              <td colSpan="5" style={tdStyle}>No safety data</td>
            </tr>
          )}

          {safetyData.map((d, i) => (
            <tr key={i}>
              <td style={tdStyle}>{d.driver_id}</td>
              <td style={tdStyle}>{d.name}</td>
              <td style={tdStyle}>{d.overspeed}</td>
              <td style={tdStyle}>{d.score}</td>
              <td
                style={{
                  ...tdStyle,
                  fontWeight: "bold",
                  color: statusColor(d.score)
                }}
              >
                {statusText(d.score)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

/* ---------- helpers ---------- */

function SummaryCard({ title, value }) {
  return (
    <div style={summaryCard}>
      <p style={{ fontSize: "14px", color: "#64748b" }}>{title}</p>
      <h3>{value}</h3>
    </div>
  );
}

const statusText = (score) => {
  if (score >= 80) return "Good";
  if (score >= 60) return "Warning";
  return "Critical";
};

const statusColor = (score) => {
  if (score >= 80) return "green";
  if (score >= 60) return "orange";
  return "red";
};

/* ---------- styles ---------- */

const formBox = {
  background: "#ffffff",
  padding: "15px",
  borderRadius: "8px",
  marginBottom: "20px",
  maxWidth: "400px"
};

const input = {
  width: "100%",
  padding: "8px",
  marginBottom: "10pxtpx",
  border: "1px solid #ccc",
  borderRadius: "4px"
};

const addBtn = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer"
};

const cardGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "15px",
  marginBottom: "25px"
};

const summaryCard = {
  border: "1px solid #e5e7eb",
  padding: "15px",
  borderRadius: "8px",
  backgroundColor: "#ffffff"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  backgroundColor: "#ffffff"
};

const thStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  backgroundColor: "#f1f5f9",
  textAlign: "left"
};

const tdStyle = {
  border: "1px solid #ccc",
  padding: "10px"
};
