import { useParams } from "react-router-dom";
import { useState } from "react";

const truckData = {
  AP09AB1234: {
    truck_no: "AP09AB1234",
    driver: "D001",
    safety: "Green",
    trips: 120,
    pollution: "Valid",
    rc: "Uploaded",
    totalDistance: "45,000 km"
  },
  TS10CD5678: {
    truck_no: "TS10CD5678",
    driver: "D002",
    safety: "Yellow",
    trips: 78,
    pollution: "Expired",
    rc: "Pending",
    totalDistance: "28,000 km"
  }
};

export default function TruckDetail() {
  const { truckNo } = useParams();
  const [tab, setTab] = useState("overview");

  const truck = truckData[truckNo];

  if (!truck) {
    return <h3>Truck not found</h3>;
  }

  return (
    <>
      <h2>Truck Details</h2>

      {/* Tabs */}
      <div style={tabBar}>
        <button
          style={tabBtn(tab === "overview")}
          onClick={() => setTab("overview")}
        >
          Overview
        </button>

        <button
          style={tabBtn(tab === "documents")}
          onClick={() => setTab("documents")}
        >
          Documents
        </button>

        <button
          style={tabBtn(tab === "trips")}
          onClick={() => setTab("trips")}
        >
          Trips
        </button>
      </div>

      {/* Tab Content */}
      {tab === "overview" && (
        <div style={card}>
          <p><b>Truck No:</b> {truck.truck_no}</p>
          <p><b>Driver Assigned:</b> {truck.driver}</p>
          <p><b>Safety Bucket:</b> {truck.safety}</p>
        </div>
      )}

      {tab === "documents" && (
        <div style={card}>
          <p><b>Pollution Certificate:</b> {truck.pollution}</p>
          <p><b>RC Status:</b> {truck.rc}</p>
        </div>
      )}

      {tab === "trips" && (
        <div style={card}>
          <p><b>Total Trips:</b> {truck.trips}</p>
          <p><b>Total Distance Covered:</b> {truck.totalDistance}</p>
        </div>
      )}
    </>
  );
}

/* ---------- styles ---------- */

const tabBar = {
  display: "flex",
  gap: "10px",
  marginBottom: "15px"
};

const tabBtn = (active) => ({
  padding: "8px 15px",
  border: "none",
  cursor: "pointer",
  backgroundColor: active ? "#2563eb" : "#e5e7eb",
  color: active ? "white" : "black",
  borderRadius: "6px"
});

const card = {
  border: "1px solid #e5e7eb",
  padding: "15px",
  borderRadius: "8px",
  backgroundColor: "#ffffff"
};