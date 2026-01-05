import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const attendanceData = [
  { driver_id: "D001", name: "Ravi", presentDays: 26, absentDays: 4 },
  { driver_id: "D002", name: "Kumar", presentDays: 22, absentDays: 8 },
  { driver_id: "D003", name: "Suresh", presentDays: 18, absentDays: 12 }
];

export default function Attendance() {
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";
  const navigate = useNavigate();

  // 🔐 Block guest access
  useEffect(() => {
    if (!role) {
      navigate("/");
    }
  }, [role, navigate]);

  return (
    <>
      <h2>Driver Attendance</h2>

      {/* 🔐 ADMIN CONTROLS (future use) */}
      {isAdmin && (
        <div style={adminBar}>
          <button style={editBtn}>Edit Attendance</button>
        </div>
      )}

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Driver ID</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Present Days</th>
            <th style={thStyle}>Absent Days</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((a, i) => (
            <tr key={i}>
              <td style={tdStyle}>{a.driver_id}</td>
              <td style={tdStyle}>{a.name}</td>
              <td style={tdStyle}>{a.presentDays}</td>
              <td style={tdStyle}>{a.absentDays}</td>
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

/* admin UI (isolated) */
const adminBar = {
  marginBottom: "10px"
};

const editBtn = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer"
};