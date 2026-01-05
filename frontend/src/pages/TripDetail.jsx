import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function TripDetail() {
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const { tripId } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);

  // 🔐 BLOCK ONLY IF NOT LOGGED IN
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    api
      .get(`/trips/${tripId}`)
      .then((res) => setTrip(res.data))
      .catch(() => alert("Trip not found"));
  }, [tripId]);

  if (!trip) {
    return <h3>Loading trip details...</h3>;
  }

  const avgSpeed =
    trip.distance_km && trip.duration_hours
      ? (trip.distance_km / trip.duration_hours).toFixed(2)
      : "—";

  return (
    <>
      <h2>Trip Details – {trip.trip_id}</h2>

      <table style={tableStyle}>
        <tbody>
          <tr><th style={thStyle}>Trip ID</th><td style={tdStyle}>{trip.trip_id}</td></tr>
          <tr><th style={thStyle}>Truck No</th><td style={tdStyle}>{trip.truck_no}</td></tr>
          <tr><th style={thStyle}>Driver ID</th><td style={tdStyle}>{trip.driver_id}</td></tr>
          <tr><th style={thStyle}>Distance</th><td style={tdStyle}>{trip.distance_km} km</td></tr>
          <tr><th style={thStyle}>Duration</th><td style={tdStyle}>{trip.duration_hours} hrs</td></tr>
          <tr><th style={thStyle}>Average Speed</th><td style={tdStyle}>{avgSpeed} km/h</td></tr>
          <tr>
            <th style={thStyle}>Over-speed</th>
            <td style={{ ...tdStyle, color: trip.overspeed ? "red" : "green" }}>
              {trip.overspeed ? "Yes" : "No"}
            </td>
          </tr>
        </tbody>
      </table>

      <button style={backBtn} onClick={() => navigate("/dashboard/trips")}>
        ← Back to Trips
      </button>

      {isAdmin && (
        <button style={editBtn} onClick={() => alert("Edit Trip (next step)")}>
          Edit Trip
        </button>
      )}
    </>
  );
}

/* ================= STYLES ================= */

const tableStyle = {
  width: "100%",
  maxWidth: "500px",
  borderCollapse: "collapse",
  background: "#fff",
  marginTop: "15px"
};

const thStyle = {
  textAlign: "left",
  padding: "10px",
  border: "1px solid #e5e7eb",
  background: "#f1f5f9",
  width: "40%"
};

const tdStyle = {
  padding: "10px",
  border: "1px solid #e5e7eb"
};

const backBtn = {
  marginTop: "15px",
  marginRight: "10px",
  background: "#6b7280",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer"
};

const editBtn = {
  marginTop: "15px",
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer"
};
