import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function DriverDetail() {
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";

  const { driverId } = useParams();
  const navigate = useNavigate();
  const [driver, setDriver] = useState(null);

  // 🔐 Block guest access
  useEffect(() => {
    if (!role) {
      navigate("/");
    }
  }, [role, navigate]);

  useEffect(() => {
    api.get(`/drivers/${driverId}`)
      .then(res => setDriver(res.data))
      .catch(err => console.error(err));
  }, [driverId]);

  if (!driver) return <h3>Loading driver details...</h3>;

  return (
    <>
      <h2>Driver Details</h2>

      {/* 🔐 ADMIN CONTROLS (UI placeholder) */}
      {isAdmin && (
        <div style={adminBar}>
          <button style={editBtn}>Edit Driver</button>
          <button style={deleteBtn}>Delete Driver</button>
        </div>
      )}

      {/* Basic Info */}
      <div style={cardStyle}>
        <h3>Basic Information</h3>
        <p><b>Name:</b> {driver.name}</p>
        <p><b>License No:</b> {driver.license_no}</p>
      </div>

      {/* Trip Summary */}
      <div style={cardStyle}>
        <h3>Trip Summary</h3>
        <p><b>Total Trips:</b> {driver.totalTrips || 0}</p>
        <p><b>Kilometers Travelled:</b> {driver.kilometers || 0}</p>
        <p><b>Hours Driven:</b> {driver.hours || 0}</p>
      </div>

      {/* Performance & Safety */}
      <div style={cardStyle}>
        <h3>Performance & Safety</h3>
        <p><b>Performance Score:</b> {driver.performance || "—"}</p>
        <p><b>Over-speed Alerts:</b> {driver.overspeed || 0}</p>
      </div>

      {/* Attendance & Salary */}
      <div style={cardStyle}>
        <h3>Attendance & Salary</h3>
        <p><b>Attendance:</b> {driver.attendance || "—"}</p>
        <p><b>Salary:</b> {driver.salary ? `₹${driver.salary}` : "—"}</p>
      </div>
    </>
  );
}

/* ----- styles (UNCHANGED) ----- */

const cardStyle = {
  border: "1px solid #e5e7eb",
  padding: "15px",
  borderRadius: "8px",
  marginTop: "15px",
  backgroundColor: "#ffffff"
};

/* admin ui (new but isolated) */
const adminBar = {
  display: "flex",
  gap: "10px",
  marginBottom: "10px"
};

const editBtn = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer"
};

const deleteBtn = {
  background: "#dc2626",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer"
};
