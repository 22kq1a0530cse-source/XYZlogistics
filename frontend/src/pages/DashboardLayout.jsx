import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // 🔒 PROTECT DASHBOARD (Guest blocked)
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div style={layout}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div style={content}>
        <div style={pageContent}>
          <Outlet /> {/* 🚀 Child pages render here */}
        </div>
      </div>
    </div>
  );
}

/* ===================== STYLES ===================== */

const layout = {
  display: "flex",
  minHeight: "100vh",
  background: "#f8fafc"
};

const content = {
  flex: 1,
  display: "flex",
  flexDirection: "column"
};

const pageContent = {
  padding: "20px",
  flex: 1,
  overflowY: "auto"
};
