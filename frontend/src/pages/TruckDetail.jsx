import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function TruckDetail() {
  const { truckNo } = useParams();
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";

  const [tab, setTab] = useState("overview");
  const [editMode, setEditMode] = useState(false);

  // ✅ NEW STATE (API DATA)
  const [truck, setTruck] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 SAFE REDIRECT
  useEffect(() => {
    if (!role) {
      navigate("/");
    }
  }, [role, navigate]);

  // 📡 FETCH TRUCK DETAILS (NEW)
  useEffect(() => {
    api
      .get(`/trucks/${truckNo}`)
      .then((res) => {
        setTruck(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [truckNo]);

  if (loading) return <h3>Loading...</h3>;
  if (!truck) return <h3>Truck not found</h3>;

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this truck?")) {
      api.delete(`/trucks/${truckNo}`).then(() => {
        navigate("/dashboard/trucks");
      });
    }
  };

  return (
    <>
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Truck Details</h2>

        {isAdmin && (
          <div>
            <button style={editBtn} onClick={() => setEditMode(!editMode)}>
              {editMode ? "Cancel Edit" : "Edit Truck"}
            </button>

            <button style={deleteBtn} onClick={handleDelete}>
              Delete Truck
            </button>
          </div>
        )}
      </div>

      {/* TABS */}
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
            {editMode ? <input defaultValue={truck.driver_id} /> : truck.driver_id}
          </p>

          <p>
            <b>Safety Bucket:</b>{" "}
            {editMode ? (
              <select defaultValue={truck.safety_bucket}>
                <option>Green</option>
                <option>Yellow</option>
                <option>Red</option>
              </select>
            ) : (
              truck.safety_bucket
            )}
          </p>
        </div>
      )}

      {/* DOCUMENTS */}
      {tab === "documents" && (
        <div style={card}>
          <p><b>Pollution Certificate:</b> {truck.pollution || "N/A"}</p>
          <p><b>RC Status:</b> {truck.rc || "N/A"}</p>
        </div>
      )}

      {/* TRIPS */}
      {tab === "trips" && (
        <div style={card}>
          <p><b>Total Trips:</b> {truck.trip_count}</p>
          <p><b>Total Distance Covered:</b> {truck.totalDistance || "N/A"}</p>
        </div>
      )}

      {/* SAVE */}
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
  cursor: "pointer",
  marginRight: "10px"
};

const deleteBtn = {
  background: "#dc2626",
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
