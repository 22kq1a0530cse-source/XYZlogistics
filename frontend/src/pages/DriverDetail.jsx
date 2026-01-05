import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";

export default function DriverDetail() {
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";
  const { driverId } = useParams();

  const [driver, setDriver] = useState(null);
  const [editMode, setEditMode] = useState(false); // ✅ NEW
  const [form, setForm] = useState({
    name: "",
    age: "",
    experience: ""
  });

  useEffect(() => {
    api.get(`/drivers/${driverId}`).then((res) => {
      setDriver(res.data);
      setForm({
        name: res.data.name || "",
        age: res.data.age || "",
        experience: res.data.experience || ""
      });
    });
  }, [driverId]);

  // ✅ SAVE PROFILE
  const saveProfile = () => {
    api
      .put(`/drivers/${driverId}/profile`, form)
      .then(() => api.get(`/drivers/${driverId}`))
      .then((res) => {
        setDriver(res.data);
        setEditMode(false); // ✅ SWITCH TO VIEW MODE
        alert("Profile updated");
      })
      .catch(() => alert("Update failed"));
  };

  if (!driver) return <h3>Loading...</h3>;

  return (
    <>
      <h2>Driver Details – {driver.driver_id}</h2>

      {/* ===== DETAILS TABLE ===== */}
      <table style={tableStyle}>
        <tbody>
          <tr>
            <th style={thStyle}>Driver ID</th>
            <td style={tdStyle}>{driver.driver_id}</td>
          </tr>

          <tr>
            <th style={thStyle}>Name</th>
            <td style={tdStyle}>
              {editMode ? (
                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />
              ) : (
                driver.name || "—"
              )}
            </td>
          </tr>

          <tr>
            <th style={thStyle}>Age</th>
            <td style={tdStyle}>
              {editMode ? (
                <input
                  value={form.age}
                  onChange={(e) =>
                    setForm({ ...form, age: e.target.value })
                  }
                />
              ) : (
                driver.age || "—"
              )}
            </td>
          </tr>

          <tr>
            <th style={thStyle}>Experience (Years)</th>
            <td style={tdStyle}>
              {editMode ? (
                <input
                  value={form.experience}
                  onChange={(e) =>
                    setForm({ ...form, experience: e.target.value })
                  }
                />
              ) : (
                driver.experience || "—"
              )}
            </td>
          </tr>

          <tr>
            <th style={thStyle}>Trips</th>
            <td style={tdStyle}>{driver.trips || 0}</td>
          </tr>

          <tr>
            <th style={thStyle}>Over-speed</th>
            <td style={tdStyle}>{driver.overspeed || 0}</td>
          </tr>

          <tr>
            <th style={thStyle}>Remarks</th>
            <td style={tdStyle}>{driver.remarks || "—"}</td>
          </tr>
        </tbody>
      </table>

      {/* ===== ACTION BUTTONS ===== */}
      {isAdmin && (
        <div style={{ marginTop: "15px" }}>
          {editMode ? (
            <button style={saveBtn} onClick={saveProfile}>
              Save Profile
            </button>
          ) : (
            <button style={editBtn} onClick={() => setEditMode(true)}>
              Edit Profile
            </button>
          )}
        </div>
      )}
    </>
  );
}

/* ================= STYLES ================= */

const tableStyle = {
  width: "100%",
  maxWidth: "500px",
  borderCollapse: "collapse",
  background: "#fff",
  marginTop: "15px"
};

const thStyle = {
  textAlign: "left",
  padding: "10px",
  border: "1px solid #e5e7eb",
  background: "#f1f5f9",
  width: "40%"
};

const tdStyle = {
  padding: "10px",
  border: "1px solid #e5e7eb"
};

const saveBtn = {
  background: "#16a34a",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer"
};

const editBtn = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer"
};
