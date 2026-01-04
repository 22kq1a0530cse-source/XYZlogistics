import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminLogin from "../pages/AdminLogin";

import TruckList from "../pages/TruckList";
import TruckDetail from "../pages/TruckDetail";
import DriverList from "../pages/DriverList";
import DriverDetail from "../pages/DriverDetail";
import TripList from "../pages/TripList";
import TripDetail from "../pages/TripDetail";
import SafetyDashboard from "../pages/SafetyDashboard";
import Attendance from "../pages/Attendance";
import Salary from "../pages/Salary";

export default function AppRoutes() {
  const role = localStorage.getItem("role");

  console.log("ROUTE ROLE:", role);

  /* ======================
     🔓 PUBLIC ROUTES
     ====================== */
  if (!role) {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  /* ======================
     👤 USER ROUTES
     ====================== */
  if (role === "user") {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  /* ======================
     🔐 ADMIN ROUTES
     ====================== */
  if (role === "admin") {
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/trucks" />} />

        <Route path="/trucks" element={<TruckList />} />
        <Route path="/trucks/:truckNo" element={<TruckDetail />} />

        <Route path="/drivers" element={<DriverList />} />
        <Route path="/drivers/:driverId" element={<DriverDetail />} />

        <Route path="/trips" element={<TripList />} />
        <Route path="/trips/:tripId" element={<TripDetail />} />

        <Route path="/safety" element={<SafetyDashboard />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/salary" element={<Salary />} />

        <Route path="*" element={<Navigate to="/trucks" />} />
      </Routes>
    );
  }
}
