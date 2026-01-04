import Sidebar from "./components/Sidebar";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  const role = localStorage.getItem("role"); // ✅ FIXED

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar only for admin */}
      {role === "admin" && <Sidebar />}

      <div style={{ flex: 1, padding: "20px", background: "#f8fafc" }}>
        <AppRoutes />
      </div>
    </div>
  );
}