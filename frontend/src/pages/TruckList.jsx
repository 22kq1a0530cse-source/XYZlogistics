import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function TruckList() {
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";

  const [trucks, setTrucks] = useState([]);
  const navigate = useNavigate();

  // 🔐 BLOCK NON-ADMIN ACCESS
  useEffect(() => {
    if (!role || role !== "admin") {
      navigate("/login");
    }
  }, [role, navigate]);

  // 🔹 ADMIN FORM STATE
  const [form, setForm] = useState({
    truck_no: "",
    driver_id: "",
    safety_bucket: "Green"
  });

  // 📡 FETCH TRUCKS (DEDUPLICATION ADDED)
  const fetchTrucks = () => {
    api
      .get("/trucks")
      .then((res) => {
        const uniqueTrucks = Array.from(
          new Map(res.data.map(t => [t.truck_no, t])).values()
        );
        setTrucks(uniqueTrucks);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTrucks();
  }, []);

  // ➕ ADD TRUCK (DUPLICATE BLOCK ADDED)
  const handleAddTruck = () => {
    if (!form.truck_no || !form.driver_id) {
      alert("Please fill all fields");
      return;
    }

    const exists = trucks.some(
      (t) => t.truck_no === form.truck_no
    );

    if (exists) {
      alert("Truck number already exists");
      return;
    }

    api
      .post("/trucks", form)
      .then(() => {
        alert("Truck added successfully");
        setForm({ truck_no: "", driver_id: "", safety_bucket: "Green" });
        fetchTrucks();
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Failed to add truck");
      });
  };

  // ❌ DELETE TRUCK
  const handleDeleteTruck = (truckNo) => {
    if (!window.confirm("Are you sure you want to delete this truck?")) return;

    api
      .delete(`/trucks/${truckNo}`)
      .then(() => {
        setTrucks(prev => prev.filter(t => t.truck_no !== truckNo));
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Delete failed");
      });
  };

  return (
    <>
      <h2>Truck List</h2>

      {isAdmin && (
        <div style={formBox}>
          <input
            placeholder="Truck No"
            value={form.truck_no}
            onChange={(e) => setForm({ ...form, truck_no: e.target.value })}
          />

          <input
            placeholder="Driver ID"
            value={form.driver_id}
            onChange={(e) => setForm({ ...form, driver_id: e.target.value })}
          />

          <select
            value={form.safety_bucket}
            onChange={(e) => setForm({ ...form, safety_bucket: e.target.value })}
          >
            <option>Green</option>
            <option>Yellow</option>
            <option>Red</option>
          </select>

          <button style={addBtn} onClick={handleAddTruck}>
            Add Truck
          </button>
        </div>
      )}

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Truck No</th>
            <th style={thStyle}>Driver ID</th>
            <th style={thStyle}>Safety</th>
            <th style={thStyle}>Trips</th>
            {isAdmin && <th style={thStyle}>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {trucks.length === 0 && (
            <tr>
              <td colSpan={isAdmin ? 5 : 4} style={tdStyle}>
                No trucks available
              </td>
            </tr>
          )}

          {trucks.map((truck, index) => (
            <tr key={index} style={trStyle}>
              <td
                style={tdStyle}
                onClick={() =>
                  navigate(`/dashboard/trucks/${truck.truck_no}`)
                }
              >
                {truck.truck_no}
              </td>

              <td
                style={tdStyle}
                onClick={() =>
                  navigate(`/dashboard/drivers/${truck.driver_id}`)
                }
              >
                {truck.driver_id}
              </td>

              <td
                style={{
                  ...tdStyle,
                  fontWeight: "600",
                  color:
                    truck.safety_bucket === "Green"
                      ? "green"
                      : truck.safety_bucket === "Yellow"
                      ? "orange"
                      : "red"
                }}
              >
                {truck.safety_bucket}
              </td>

              <td style={tdStyle}>{truck.trip_count}</td>

              {isAdmin && (
                <td style={tdStyle}>
                  <button
                    style={deleteBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteTruck(truck.truck_no);
                    }}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}



/* ---------- styles (UNCHANGED) ---------- */

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
  backgroundColor: "#ffffff"
};

const thStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  backgroundColor: "#f1f5f9",
  textAlign: "left"
};

const tdStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  cursor: "pointer"
};

const trStyle = {
  cursor: "pointer"
};

const formBox = {
  display: "flex",
  gap: "10px",
  marginBottom: "20px"
};

const addBtn = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer"
};

const deleteBtn = {
  background: "#dc2626",
  color: "#fff",
  border: "none",
  padding: "6px 10px",
  borderRadius: "4px",
  cursor: "pointer"
};