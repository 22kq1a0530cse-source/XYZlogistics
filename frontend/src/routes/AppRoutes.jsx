import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";

import TruckList from "../pages/TruckList";
import DriverList from "../pages/DriverList";
import DriverDetail from "../pages/DriverDetail";
import TruckDetail from "../pages/TruckDetail";

import TripList from "../pages/TripList";
import TripDetail from "../pages/TripDetail";
import Attendance from "../pages/Attendance";
import Salary from "../pages/Salary";
import SafetyDashboard from "../pages/SafetyDashboard";

export default function AppRoutes() {
  const role = localStorage.getItem("role");

  return (
    <Routes>
      {/* ================= LOGIN ================= */}
      <Route path="/login" element={<Login />} />

      {/* ================= ADMIN ONLY ================= */}
      <Route
        path="/dashboard/trucks"
        element={role === "admin" ? <TruckList /> : <Navigate to="/login" />}
      />

      {/* 🔥 ADDED: TRUCK DETAILS */}
      <Route
        path="/dashboard/trucks/:truckNo"
        element={role === "admin" ? <TruckDetail /> : <Navigate to="/login" />}
      />

      <Route
        path="/dashboard/drivers"
        element={role === "admin" ? <DriverList /> : <Navigate to="/login" />}
      />

      {/* 🔥 ADDED: DRIVER DETAILS */}
      <Route
        path="/dashboard/drivers/:driverId"
        element={role === "admin" ? <DriverDetail /> : <Navigate to="/login" />}
      />

      {/* ================= ADMIN + DRIVER ================= */}
      <Route
        path="/dashboard/trips"
        element={role ? <TripList /> : <Navigate to="/login" />}
      />

      <Route
        path="/dashboard/trips/:id"
        element={role ? <TripDetail /> : <Navigate to="/login" />}
      />

      <Route
        path="/dashboard/attendance"
        element={role ? <Attendance /> : <Navigate to="/login" />}
      />

      <Route
        path="/dashboard/salary"
        element={role ? <Salary /> : <Navigate to="/login" />}
      />

      <Route
        path="/dashboard/safety"
        element={role ? <SafetyDashboard /> : <Navigate to="/login" />}
      />

      {/* ================= DEFAULT ================= */}
      <Route
        path="*"
        element={<Navigate to={role ? "/dashboard/trips" : "/login"} />}
      />
    </Routes>
  );
}