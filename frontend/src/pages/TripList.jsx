import { useNavigate } from "react-router-dom";

const trips = [
  {
    trip_id: "T001",
    truck_no: "AP09AB1234",
    driver_id: "D001",
    distance: "350 km",
    duration: "6 hrs",
    overspeed: "No"
  },
  {
    trip_id: "T002",
    truck_no: "TS10CD5678",
    driver_id: "D002",
    distance: "280 km",
    duration: "5 hrs",
    overspeed: "Yes"
  }
];

export default function TripList() {
  const navigate = useNavigate();

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
              <td style={tdStyle}>{trip.distance}</td>
              <td style={tdStyle}>{trip.duration}</td>
              <td style={tdStyle}>{trip.overspeed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

/* ---------- styles ---------- */

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
