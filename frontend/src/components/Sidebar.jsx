import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={sidebarStyle}>
      <h3>XYZ Logistics</h3>

      <Link to="/trucks" style={linkStyle}>Truck List</Link>
      <Link to="/drivers" style={linkStyle}>Driver List</Link>
      <Link to="/trips" style={linkStyle}>Trip List</Link>
      <Link to="/safety" style={linkStyle}>Safety Dashboard</Link>
      <Link to="/attendance" style={linkStyle}>Attendance</Link>
      <Link to="/salary" style={linkStyle}>Salary & Payments</Link>
    </div>
  );
}

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
