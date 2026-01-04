import { useNavigate } from "react-router-dom";

const trucks = [
  {
    truck_no: "AP09AB1234",
    driver: "D001",
    safety: "Green",
    trips: 120
  },
  {
    truck_no: "TS10CD5678",
    driver: "D002",
    safety: "Yellow",
    trips: 78
  }
];

export default function TruckList() {
  const navigate = useNavigate();   // ✅ ADD THIS

  return (
    <>
      <h2>Truck List</h2>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Truck No</th>
            <th style={thStyle}>Driver Assigned</th>
            <th style={thStyle}>Safety Bucket</th>
            <th style={thStyle}>Trip Count</th>
          </tr>
        </thead>

        <tbody>
          {trucks.map((truck, index) => (
            <tr
              key={index}
              style={trStyle}
              onClick={() => navigate(`/trucks/${truck.truck_no}`)} // ✅ ADD THIS
            >
              <td style={tdStyle}>{truck.truck_no}</td>
              <td style={tdStyle}>{truck.driver}</td>
              <td style={tdStyle}>{truck.safety}</td>
              <td style={tdStyle}>{truck.trips}</td>
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
  padding: "10px",
  textAlign: "left"
};

const trStyle = {
  cursor: "pointer"
};
