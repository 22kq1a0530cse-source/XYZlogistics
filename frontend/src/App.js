import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./pages/DashboardLayout";

import TruckList from "./pages/TruckList";
import TruckDetail from "./pages/TruckDetail";

import DriverList from "./pages/DriverList";
import DriverDetail from "./pages/DriverDetail";

import TripList from "./pages/TripList";
import TripDetail from "./pages/TripDetail";

import SafetyDashboard from "./pages/SafetyDashboard";
import Attendance from "./pages/Attendance";
import Salary from "./pages/Salary";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= DASHBOARD ================= */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* TRUCKS */}
          <Route path="trucks" element={<TruckList />} />
          <Route path="trucks/:truckNo" element={<TruckDetail />} />

          {/* DRIVERS */}
          <Route path="drivers" element={<DriverList />} />
          <Route path="drivers/:driverId" element={<DriverDetail />} />

          {/* TRIPS (🔥 FIXED HERE 🔥) */}
          <Route path="trips" element={<TripList />} />
          <Route path="trips/:tripId" element={<TripDetail />} />

          {/* OTHERS */}
          <Route path="safety" element={<SafetyDashboard />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="salary" element={<Salary />} />
        </Route>

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;