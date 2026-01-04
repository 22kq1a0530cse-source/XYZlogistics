import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Salary() {
  const [salaryData, setSalaryData] = useState([]);

  useEffect(() => {
    // For now, demo with one driver
    api.get("/salary/D001")
      .then(res => {
        const d = res.data;

        // Convert backend response into table format
        setSalaryData([
          {
            driver_id: d.driver_id,
            name: "Ravi", // can be fetched later from driver API
            trips: d.total_trips,
            distance: `${d.total_distance} km`,
            salary: `₹${d.salary}`,
            status: "Paid" // demo status (can be dynamic later)
          }
        ]);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <h2>Driver Salary & Payments</h2>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Driver ID</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Trips</th>
            <th style={thStyle}>Distance</th>
            <th style={thStyle}>Salary</th>
            <th style={thStyle}>Payment Status</th>
          </tr>
        </thead>

        <tbody>
          {salaryData.map((s, i) => (
            <tr key={i}>
              <td style={tdStyle}>{s.driver_id}</td>
              <td style={tdStyle}>{s.name}</td>
              <td style={tdStyle}>{s.trips}</td>
              <td style={tdStyle}>{s.distance}</td>
              <td style={tdStyle}>{s.salary}</td>
              <td
                style={{
                  ...tdStyle,
                  fontWeight: "bold",
                  color: s.status === "Paid" ? "green" : "orange"
                }}
              >
                {s.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

/* styles (UNCHANGED) */
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px"
};

const thStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  background: "#f1f5f9"
};

const tdStyle = {
  border: "1px solid #ccc",
  padding: "10px"
};
