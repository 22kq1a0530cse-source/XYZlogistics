import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function TruckList() {
  const [trucks, setTrucks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/trucks")
      .then(res => setTrucks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <h2 style={titleStyle}>Truck List</h2>

      <div style={tableContainer}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Truck No</th>
              <th style={thStyle}>Driver</th>
              <th style={thStyle}>Safety</th>
              <th style={thStyle}>Trips</th>
            </tr>
          </thead>

          <tbody>
            {trucks.map((t, i) => (
              <tr
                key={i}
                style={rowStyle}
                onClick={() => navigate(`/trucks/${t.truck_no}`)}
              >
                <td style={tdStyle}>{t.truck_no}</td>
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
  cursor: "pointer",
  transition: "background 0.2s"
};
