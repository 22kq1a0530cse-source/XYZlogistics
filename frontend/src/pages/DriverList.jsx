import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function DriverList() {
  const role = localStorage.getItem("role");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const isAdmin = role === "admin";

  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔹 ADMIN ADD FORM
  const [form, setForm] = useState({
    driver_id: "",
    license_no: ""
  });

  // 🔹 EDIT REMARKS STATE
  const [editingId, setEditingId] = useState(null);
  const [remarkText, setRemarkText] = useState("");

  // 🔐 Block guest access
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  // 📡 Fetch drivers
  const fetchDrivers = () => {
    api
      .get("/drivers")
      .then((res) => setDrivers(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  // ➕ ADD DRIVER (ADMIN)
  const handleAddDriver = () => {
    if (!form.driver_id || !form.license_no) {
      alert("Fill all fields");
      return;
    }

    api
      .post("/drivers", { ...form, role })
      .then(() => {
        setForm({ driver_id: "", license_no: "" });
        fetchDrivers();
      })
      .catch((err) =>
        alert(err.response?.data?.message || "Failed to add driver")
      );
  };

  // ✏️ SAVE REMARKS (ADMIN)
  const saveRemark = (driverId) => {
    api
      .put(`/drivers/${driverId}`, {
        remarks: remarkText,
        role
      })
      .then(() => {
        setEditingId(null);
        setRemarkText("");
        fetchDrivers();
      })
      .catch((err) =>
        alert(err.response?.data?.message || "Failed to update remark")
      );
  };

  return (
    <>
      <h2>Driver List</h2>

      {/* 🔐 ADMIN ADD FORM */}
      {isAdmin && (
        <div style={formBox}>
          <input
            placeholder="Driver ID"
            value={form.driver_id}
            onChange={(e) =>
              setForm({ ...form, driver_id: e.target.value })
            }
          />

          <input
            placeholder="License No"
            value={form.license_no}
            onChange={(e) =>
              setForm({ ...form, license_no: e.target.value })
            }
          />

          <button style={addBtn} onClick={handleAddDriver}>
            Add Driver
          </button>
        </div>
      )}

      {/* TABLE */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Driver ID</th>
            <th style={thStyle}>License No</th>
            <th style={thStyle}>Trips</th>
            <th style={thStyle}>Over-speed</th>
            <th style={thStyle}>Remarks</th>
            {isAdmin && <th style={thStyle}>Action</th>}
          </tr>
        </thead>

        <tbody>
          {loading && (
            <tr>
              <td colSpan="6" style={tdStyle}>Loading...</td>
            </tr>
          )}

          {!loading && drivers.length === 0 && (
            <tr>
              <td colSpan="6" style={tdStyle}>No drivers found</td>
            </tr>
          )}

          {drivers.map((d, i) => (
            <tr key={i}>
              <td
  style={{ ...tdStyle, cursor: "pointer", color: "#2563eb", fontWeight: "600" }}
  onClick={() => navigate(`/dashboard/drivers/${d.driver_id}`)}
>
  {d.driver_id}
</td>

              <td style={tdStyle}>{d.license_no}</td>
              <td style={tdStyle}>{d.trips || 0}</td>
              <td style={tdStyle}>{d.overspeed || 0}</td>

              {/* REMARKS */}
              <td style={tdStyle}>
                {editingId === d.driver_id ? (
                  <input
                    value={remarkText}
                    onChange={(e) => setRemarkText(e.target.value)}
                    placeholder="Type remark"
                  />
                ) : (
                  d.remarks || "—"
                )}
              </td>

              {/* ADMIN ACTION */}
              {isAdmin && (
                <td style={tdStyle}>
                  {editingId === d.driver_id ? (
                    <button
                      style={saveBtn}
                      onClick={() => saveRemark(d.driver_id)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      style={editBtn}
                      onClick={() => {
                        setEditingId(d.driver_id);
                        setRemarkText(d.remarks || "");
                      }}
                    >
                      Edit
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

/* ================= STYLES ================= */

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
  padding: "10px"
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

const editBtn = {
  background: "#f59e0b",
  color: "#fff",
  border: "none",
  padding: "6px 10px",
  borderRadius: "4px",
  cursor: "pointer"
};

const saveBtn = {
  background: "#16a34a",
  color: "#fff",
  border: "none",
  padding: "6px 10px",
  borderRadius: "4px",
  cursor: "pointer"
};
