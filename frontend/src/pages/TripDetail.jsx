import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";

export default function TripDetail() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    api.get(`/trips/${tripId}`)
      .then(res => setTrip(res.data))
      .catch(err => console.error(err));
  }, [tripId]);

  if (!trip) {
    return <h3>Loading trip details...</h3>;
  }

  return (
    <>
      <h2>Trip Details</h2>

      <div style={card}>
        <p><b>Trip ID:</b> {trip.trip_id}</p>
        <p><b>Truck No:</b> {trip.truck_no}</p>
        <p><b>Driver ID:</b> {trip.driver_id}</p>
      </div>

      <div style={card}>
        <p><b>Distance:</b> {trip.distance_km} km</p>
        <p><b>Duration:</b> {trip.duration_hours} hrs</p>
        <p><b>Average Speed:</b> {trip.avg_speed || "—"} km/h</p>
      </div>

      <div style={card}>
        <p><b>Over-speed:</b> {trip.overspeed ? "Yes" : "No"}</p>
        <p><b>Remarks:</b> {trip.remarks || "—"}</p>
      </div>
    </>
  );
}

/* ---------- styles (UNCHANGED) ---------- */

const card = {
  border: "1px solid #e5e7eb",
  padding: "15px",
  borderRadius: "8px",
  marginTop: "15px",
  backgroundColor: "#ffffff"
};