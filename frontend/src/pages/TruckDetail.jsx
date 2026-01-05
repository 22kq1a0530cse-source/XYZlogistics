import { useParams, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";

  const [tab, setTab] = useState("overview");
  const [editMode, setEditMode] = useState(false);

  const truck = truckData[truckNo];

  if (!role) {
    navigate("/");
    return null;
  }

  if (!truck) {
    return <h3>Truck not found</h3>;
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Truck Details</h2>

        {/* ADMIN ONLY */}
       {isAdmin && (
  <div style={{ marginBottom: "15px" }}>
    <button style={editBtn}>Edit Truck</button>
    <button style={deleteBtn}>Delete Truck</button>
  </div>
)}

      </div>

      {/* Tabs */}
      <div style={tabBar}>
        <button style={tabBtn(tab === "overview")} onClick={() => setTab("overview")}>
          Overview
        </button>
        <button style={tabBtn(tab === "documents")} onClick={() => setTab("documents")}>
          Documents
        </button>
        <button style={tabBtn(tab === "trips")} onClick={() => setTab("trips")}>
          Trips
        </button>
      </div>

      {/* OVERVIEW */}
      {tab === "overview" && (
        <div style={card}>
          <p><b>Truck No:</b> {truck.truck_no}</p>

          <p>
            <b>Driver Assigned:</b>{" "}
            {editMode ? <input defaultValue={truck.driver} /> : truck.driver}
          </p>

          <p>
            <b>Safety Bucket:</b>{" "}
            {editMode ? (
              <select defaultValue={truck.safety}>
                <option>Green</option>
                <option>Yellow</option>
                <option>Red</option>
              </select>
            ) : (
              truck.safety
            )}
          </p>
        </div>
      )}

      {/* DOCUMENTS */}
      {tab === "documents" && (
        <div style={card}>
          <p>
            <b>Pollution Certificate:</b>{" "}
            {editMode ? <input defaultValue={truck.pollution} /> : truck.pollution}
          </p>

          <p>
            <b>RC Status:</b>{" "}
            {editMode ? <input defaultValue={truck.rc} /> : truck.rc}
          </p>
        </div>
      )}

      {/* TRIPS */}
      {tab === "trips" && (
        <div style={card}>
          <p><b>Total Trips:</b> {truck.trips}</p>
          <p><b>Total Distance Covered:</b> {truck.totalDistance}</p>
        </div>
      )}

      {/* ADMIN SAVE */}
      {isAdmin && editMode && (
        <button style={saveBtn} onClick={() => alert("Save API next step")}>
          Save Changes
        </button>
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

const editBtn = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer"
};

const saveBtn = {
  marginTop: "15px",
  background: "#16a34a",
  color: "#fff",
  border: "none",
  padding: "10px 16px",
  borderRadius: "6px",
  cursor: "pointer"
};
