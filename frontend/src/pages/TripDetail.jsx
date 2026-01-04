import { useParams } from "react-router-dom";

const tripData = {
  T001: {
    trip_id: "T001",
    truck_no: "AP09AB1234",
    driver_id: "D001",
    distance: "350 km",
    duration: "6 hrs",
    overspeed: "No",
    avgSpeed: "58 km/h",
    remarks: "Safe driving"
  },
  T002: {
    trip_id: "T002",
    truck_no: "TS10CD5678",
    driver_id: "D002",
    distance: "280 km",
    duration: "5 hrs",
    overspeed: "Yes",
    avgSpeed: "72 km/h",
    remarks: "Over-speed detected"
  }
};

export default function TripDetail() {
  const { tripId } = useParams();
  const trip = tripData[tripId];

  if (!trip) {
    return <h3>Trip not found</h3>;
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
        <p><b>Distance:</b> {trip.distance}</p>
        <p><b>Duration:</b> {trip.duration}</p>
        <p><b>Average Speed:</b> {trip.avgSpeed}</p>
      </div>

      <div style={card}>
        <p><b>Over-speed:</b> {trip.overspeed}</p>
        <p><b>Remarks:</b> {trip.remarks}</p>
      </div>
    </>
  );
}

/* ---------- styles ---------- */

const card = {
  border: "1px solid #e5e7eb",
  padding: "15px",
  borderRadius: "8px",
  marginTop: "15px",
  backgroundColor: "#ffffff"
};