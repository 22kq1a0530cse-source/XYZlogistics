import { Routes, Route, Navigate } from "react-router-dom";

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
  return (
    <Routes>
      {/* Default */}
      <Route path="/" element={<Navigate to="/trucks" />} />

      {/* Truck */}
      <Route path="/trucks" element={<TruckList />} />
      <Route path="/trucks/:truckNo" element={<TruckDetail />} />

      {/* Driver */}
      <Route path="/drivers" element={<DriverList />} />
      <Route path="/drivers/:driverId" element={<DriverDetail />} />

      {/* Trip */}
      <Route path="/trips" element={<TripList />} />
      <Route path="/trips/:tripId" element={<TripDetail />} />

      {/* Safety */}
      <Route path="/safety" element={<SafetyDashboard />} />

      {/* Attendance & Salary */}
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/salary" element={<Salary />} />
    </Routes>
  );
}