import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function TripList() {
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";

  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  // 🔐 block guest access
  useEffect(() => {
    if (!role) {
      navigate("/");
    }
  }, [role, navigate]);

  useEffect(() => {
    api.get("/trips")
      .then(res => setTrips(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Trip List</h2>

        {/* ADMIN ONLY */}
        {isAdmin && (
          <button
            style={addBtn}
            onClick={() => alert("Add Trip (Step-6 backend)")}
          >
            + Add Trip
          </button>
        )}
      </div>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Trip ID</th>
            <th style={thStyle}>Truck No</th>
            <th style={thStyle}>Driver ID</th>
            <th style={thStyle}>Distance</th>
            <th style={thStyle}>Duration</th>
            <th style={thStyle}>Over-speed</th>
          </tr>
        </thead>

        <tbody>
          {trips.map((trip, index) => (
            <tr
              key={index}
              style={trStyle}
              onClick={() => navigate(`/trips/${trip.trip_id}`)}
            >
              <td style={tdStyle}>{trip.trip_id}</td>
              <td style={tdStyle}>{trip.truck_no}</td>
              <td style={tdStyle}>{trip.driver_id}</td>
              <td style={tdStyle}>{trip.distance_km} km</td>
              <td style={tdStyle}>{trip.duration_hours} hrs</td>
              <td style={tdStyle}>{trip.overspeed ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

/* ---------- styles (UNCHANGED) ---------- */

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
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

const trStyle = {
  cursor: "pointer"
};

const addBtn = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer"
};