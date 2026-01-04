import { useNavigate } from "react-router-dom";

const drivers = [
  {
    driver_id: "D001",
    license: "DL12345",
    trips: 120,
    overspeed: 2,
    remarks: "Good"
  },
  {
    driver_id: "D002",
    license: "DL67890",
    trips: 78,
    overspeed: 5,
    remarks: "Average"
  }
];

export default function DriverList() {
  const navigate = useNavigate();

  return (
    <>
      <h2>Driver List</h2>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Driver ID</th>
            <th style={thStyle}>License No</th>
            <th style={thStyle}>Trips</th>
            <th style={thStyle}>Over-speed Alerts</th>
            <th style={thStyle}>Remarks</th>
          </tr>
        </thead>

        <tbody>
          {drivers.map((driver, index) => (
            <tr
              key={index}
              style={trStyle}
              onClick={() => navigate(`/drivers/${driver.driver_id}`)}
            >
              <td style={tdStyle}>{driver.driver_id}</td>
              <td style={tdStyle}>{driver.license}</td>
              <td style={tdStyle}>{driver.trips}</td>
              <td style={tdStyle}>{driver.overspeed}</td>
              <td style={tdStyle}>{driver.remarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

/* ---- styles ---- */

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px"
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
