import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function TruckList() {
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";

  const [trucks, setTrucks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!role) {
      navigate("/");
      return;
    }

    api
      .get("/trucks")
      .then(res => setTrucks(res.data))
      .catch(err => console.error(err));
  }, [role, navigate]);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
        <h2 style={titleStyle}>Truck List</h2>

        {/* ADMIN ONLY */}
        {isAdmin && (
          <button style={addBtn} onClick={() => navigate("/trucks/new")}>
            + Add Truck
          </button>
        )}
      </div>

      <div style={tableContainer}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Truck No</th>
              <th style={thStyle}>Driver</th>
              <th style={thStyle}>Safety</th>
              <th style={thStyle}>Trips</th>

              {/* ADMIN ONLY */}
              {isAdmin && (
  <button
    style={{
      marginBottom: "15px",
      background: "#2563eb",
      color: "white",
      border: "none",
      padding: "8px 14px",
      borderRadius: "6px",
      cursor: "pointer"
    }}
    onClick={() => alert("Add Truck (Admin only)")}
  >
    + Add Truck
  </button>
)}

            </tr>
          </thead>

          <tbody>
            {trucks.map((t, i) => (
              <tr key={i} style={rowStyle}>
                <td
                  style={tdStyle}
                  onClick={() => navigate(`/trucks/${t.truck_no}`)}
                >
                  {t.truck_no}
                </td>

                <td style={tdStyle}>{t.driver_id}</td>

                <td
                  style={{
                    ...tdStyle,
                    fontWeight: "600",
                    color:
                      t.safety_bucket === "Green"
                        ? "#15803d"
                        : t.safety_bucket === "Yellow"
                        ? "#a16207"
                        : "#b91c1c"
                  }}
                >
                  {t.safety_bucket}
                </td>

                <td style={tdStyle}>{t.trip_count}</td>

                {/* ADMIN ONLY */}
                {isAdmin && (
                  <td style={tdStyle}>
                    <button
                      style={editBtn}
                      onClick={() => navigate(`/trucks/${t.truck_no}/edit`)}
                    >
                      Edit
                    </button>
                    <button
                      style={deleteBtn}
                      onClick={() => alert("Delete API later")}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ---------- Styles ---------- */

const titleStyle = {
  marginBottom: "16px"
};

const tableContainer = {
  background: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  overflowX: "auto"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse"
};

const thStyle = {
  padding: "14px",
  backgroundColor: "#f1f5f9",
  textAlign: "left",
  borderBottom: "2px solid #e5e7eb"
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #e5e7eb"
};

const rowStyle = {
  transition: "background 0.2s"
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
  marginRight: "8px",
  background: "#16a34a",
  color: "#fff",
  border: "none",
  padding: "6px 10px",
  borderRadius: "4px",
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