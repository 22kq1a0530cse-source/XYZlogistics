import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function TripList() {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/trips")
      .then(res => setTrips(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <h2>Trip List</h2>

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