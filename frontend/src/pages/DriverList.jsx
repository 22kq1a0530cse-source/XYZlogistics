import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function DriverList() {
  const [drivers, setDrivers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/drivers")
      .then(res => setDrivers(res.data))
      .catch(err => console.error(err));
  }, []);

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
              <td style={tdStyle}>{driver.license_no}</td>
              <td style={tdStyle}>{driver.trips || 0}</td>
              <td style={tdStyle}>{driver.overspeed || 0}</td>
              <td style={tdStyle}>{driver.remarks || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

/* ---- styles (UNCHANGED) ---- */

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
