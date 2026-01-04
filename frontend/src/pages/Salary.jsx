import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function Salary() {
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";
  const navigate = useNavigate();

  const [salaryData, setSalaryData] = useState([]);

  // 🔐 block guest access
  useEffect(() => {
    if (!role) {
      navigate("/");
    }
  }, [role, navigate]);

  useEffect(() => {
    // Demo salary (backend later)
    api.get("/salary/D001")
      .then(res => {
        const d = res.data;

        setSalaryData([
          {
            driver_id: d.driver_id,
            name: "Ravi",
            trips: d.total_trips,
            distance: `${d.total_distance} km`,
            salary: `₹${d.salary}`,
            status: "Paid"
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
            {isAdmin && <th style={thStyle}>Action</th>}
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

              {/* 🔐 ADMIN ONLY */}
              {isAdmin && (
                <td style={tdStyle}>
                  <button
                    style={payBtn}
                    onClick={() => alert("Mark Paid (STEP-7 backend)")}
                  >
                    Mark Paid
                  </button>
                </td>
              )}
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

const payBtn = {
  background: "#16a34a",
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  borderRadius: "5px",
  cursor: "pointer"
};