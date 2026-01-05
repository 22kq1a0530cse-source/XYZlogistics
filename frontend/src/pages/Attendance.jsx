import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function Attendance() {
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const navigate = useNavigate();

  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    api.get("/attendance")
      .then(res => setAttendanceData(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h2>Driver Attendance</h2>

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
          {loading && (
            <tr><td colSpan="4" style={tdStyle}>Loading...</td></tr>
          )}

          {!loading && attendanceData.length === 0 && (
            <tr><td colSpan="4" style={tdStyle}>No attendance data</td></tr>
          )}

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

/* styles unchanged */
const tableStyle = { width: "100%", borderCollapse: "collapse", marginTop: "20px" };
const thStyle = { border: "1px solid #ccc", padding: "10px", background: "#f1f5f9" };
const tdStyle = { border: "1px solid #ccc", padding: "10px" };
const adminBar = { marginBottom: "10px" };
const editBtn = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer"
};