import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function TripList() {
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const navigate = useNavigate();

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  // ADMIN FORM STATE
  const [tripId, setTripId] = useState("");
  const [truckNo, setTruckNo] = useState("");
  const [driverId, setDriverId] = useState("");
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [overspeed, setOverspeed] = useState(false);

  // 🔐 BLOCK GUEST ACCESS
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  // 📡 FETCH TRIPS (REMOVE DUPLICATES BY trip_id)
  const fetchTrips = () => {
    api
      .get("/trips")
      .then((res) => {
        const uniqueTrips = Array.from(
          new Map(res.data.map(t => [t.trip_id, t])).values()
        );
        setTrips(uniqueTrips);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  // ➕ ADD TRIP (ADMIN ONLY)
  const handleAddTrip = () => {
    if (!tripId || !truckNo || !driverId || !distance || !duration) {
      alert("Fill all fields");
      return;
    }

    api
      .post("/trips", {
        trip_id: tripId,
        truck_no: truckNo,
        driver_id: driverId,
        distance_km: Number(distance),
        duration_hours: Number(duration),
        overspeed,
        role
      })
      .then(() => {
        setTripId("");
        setTruckNo("");
        setDriverId("");
        setDistance("");
        setDuration("");
        setOverspeed(false);
        fetchTrips();
      })
      .catch((err) =>
        alert(err.response?.data?.message || "Failed to add trip")
      );
  };

  return (
    <>
      <h2>Trip List</h2>

      {/* 🔐 ADMIN ADD FORM */}
      {isAdmin && (
        <div style={formBox}>
          <h4>Add Trip</h4>

          <input style={input} placeholder="Trip ID" value={tripId} onChange={e => setTripId(e.target.value)} />
          <input style={input} placeholder="Truck No" value={truckNo} onChange={e => setTruckNo(e.target.value)} />
          <input style={input} placeholder="Driver ID" value={driverId} onChange={e => setDriverId(e.target.value)} />
          <input style={input} type="number" placeholder="Distance (km)" value={distance} onChange={e => setDistance(e.target.value)} />
          <input style={input} type="number" placeholder="Duration (hours)" value={duration} onChange={e => setDuration(e.target.value)} />

          <label>
            <input type="checkbox" checked={overspeed} onChange={e => setOverspeed(e.target.checked)} /> Over-speed
          </label>

          <br /><br />
          <button style={addBtn} onClick={handleAddTrip}>+ Add Trip</button>
        </div>
      )}

      {/* TABLE */}
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
          {loading && (
            <tr><td colSpan="6" style={tdStyle}>Loading...</td></tr>
          )}

          {!loading && trips.length === 0 && (
            <tr><td colSpan="6" style={tdStyle}>No trips available</td></tr>
          )}

          {trips.map((trip, index) => (
            <tr key={index}>
              <td
                style={{ ...tdStyle, cursor: "pointer", color: "#2563eb", fontWeight: "600" }}
                onClick={() => navigate(`/dashboard/trips/${trip.trip_id}`)}
              >
                {trip.trip_id}
              </td>
              <td style={tdStyle}>{trip.truck_no}</td>
              <td style={tdStyle}>{trip.driver_id}</td>
              <td style={tdStyle}>{trip.distance_km} km</td>
              <td style={tdStyle}>{trip.duration_hours} hrs</td>
              <td style={{ ...tdStyle, color: trip.overspeed ? "red" : "green" }}>
                {trip.overspeed ? "Yes" : "No"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

/* ================= STYLES ================= */

const formBox = {
  background: "#fff",
  padding: "15px",
  borderRadius: "8px",
  marginBottom: "20px",
  maxWidth: "420px"
};

const input = {
  width: "100%",
  padding: "8px",
  marginBottom: "10px",
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

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
  backgroundColor: "#fff"
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