import { Link } from "react-router-dom";

export default function Sidebar() {
  const role = localStorage.getItem("role");

  return (
    <div style={sidebarStyle}>
      <h3 style={title}>XYZ Logistics</h3>

      {/* ===== ADMIN + DRIVER ===== */}
      <Link to="/dashboard/trucks" style={linkStyle}>
        🚚 Truck List
      </Link>

      <Link to="/dashboard/drivers" style={linkStyle}>
        👨‍✈️ Driver List
      </Link>

      <Link to="/dashboard/trips" style={linkStyle}>
        🧭 Trip List
      </Link>

      <Link to="/dashboard/attendance" style={linkStyle}>
        🕒 Attendance
      </Link>

      <Link to="/dashboard/salary" style={linkStyle}>
        💰 Salary & Payments
      </Link>

      <Link to="/dashboard/safety" style={linkStyle}>
        🛡️ Safety Dashboard
      </Link>

      {/* ===== ADMIN BADGE ===== */}
      {role === "admin" && (
        <>
          <hr style={divider} />
          <p style={adminBadge}>ADMIN MODE</p>
        </>
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const sidebarStyle = {
  width: "220px",
  height: "100vh",
  backgroundColor: "#1e293b",
  color: "white",
  padding: "20px",
  boxSizing: "border-box"
};

const title = {
  marginBottom: "20px",
  fontSize: "18px",
  letterSpacing: "0.5px"
};

const linkStyle = {
  display: "block",
  color: "white",
  textDecoration: "none",
  margin: "12px 0",
  fontSize: "14px"
};

const divider = {
  margin: "15px 0",
  border: "0.5px solid #334155"
};

const adminBadge = {
  marginTop: "20px",
  fontSize: "12px",
  color: "#38bdf8",
  fontWeight: "bold"
};