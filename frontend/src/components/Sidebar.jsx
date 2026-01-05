import { Link } from "react-router-dom";

export default function Sidebar() {
  const role = localStorage.getItem("role");

  return (
    <div style={sidebarStyle}>
      <h3>XYZ Logistics</h3>

      <Link to="/trucks" style={linkStyle}>Truck List</Link>
      <Link to="/drivers" style={linkStyle}>Driver List</Link>
      <Link to="/trips" style={linkStyle}>Trip List</Link>
      <Link to="/safety" style={linkStyle}>Safety Dashboard</Link>
      <Link to="/attendance" style={linkStyle}>Attendance</Link>
      <Link to="/salary" style={linkStyle}>Salary & Payments</Link>

      {/* Admin badge (optional visual feedback) */}
      {role === "admin" && (
        <p style={adminBadge}>ADMIN MODE</p>
      )}
    </div>
  );
}

/* styles (UNCHANGED) */

const sidebarStyle = {
  width: "220px",
  height: "100vh",
  backgroundColor: "#1e293b",
  color: "white",
  padding: "20px"
};

const linkStyle = {
  display: "block",
  color: "white",
  textDecoration: "none",
  margin: "10px 0"
};

const adminBadge = {
  marginTop: "20px",
  fontSize: "12px",
  color: "#38bdf8"
};