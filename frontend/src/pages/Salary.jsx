import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function Salary() {
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const navigate = useNavigate();

  const [salaryData, setSalaryData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ADMIN FORM STATE
  const [driverId, setDriverId] = useState("");
  const [name, setName] = useState("");
  const [trips, setTrips] = useState("");
  const [distance, setDistance] = useState("");
  const [amount, setAmount] = useState("");

  // 🔐 PROTECT PAGE
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  // 📡 FETCH SALARY DATA
  const fetchSalary = () => {
    api
      .get("/salary")
      .then((res) => setSalaryData(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchSalary();
  }, []);

  // ➕ ADD SALARY (ADMIN ONLY)
  const handleAddSalary = () => {
    if (!driverId || !name || !trips || !distance || !amount) {
      alert("Fill all fields");
      return;
    }

    api
      .post("/salary", {
        driver_id: driverId,
        name,
        trips: Number(trips),
        distance_km: Number(distance),
        salary: Number(amount),
        status: "Pending",
        role
      })
      .then(() => {
        setDriverId("");
        setName("");
        setTrips("");
        setDistance("");
        setAmount("");
        fetchSalary();
      })
      .catch((err) =>
        alert(err.response?.data?.message || "Failed to add salary")
      );
  };

  // ✅ MARK PAID (ADMIN ONLY)
  const markPaid = (driverId) => {
    api
      .put(`/salary/${driverId}`, { role })
      .then(fetchSalary)
      .catch((err) =>
        alert(err.response?.data?.message || "Failed to update status")
      );
  };

  return (
    <>
      <h2>Driver Salary & Payments</h2>

      {/* 🔐 ADMIN ADD FORM */}
      {isAdmin && (
        <div style={formBox}>
          <h4>Add Salary Record</h4>

          <input
            style={input}
            placeholder="Driver ID"
            value={driverId}
            onChange={(e) => setDriverId(e.target.value)}
          />

          <input
            style={input}
            placeholder="Driver Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            style={input}
            type="number"
            placeholder="Trips"
            value={trips}
            onChange={(e) => setTrips(e.target.value)}
          />

          <input
            style={input}
            type="number"
            placeholder="Distance (km)"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />

          <input
            style={input}
            type="number"
            placeholder="Salary Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button style={addBtn} onClick={handleAddSalary}>
            + Add Salary
          </button>
        </div>
      )}

      {/* TABLE */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Driver ID</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Trips</th>
            <th style={thStyle}>Distance</th>
            <th style={thStyle}>Salary</th>
            <th style={thStyle}>Status</th>
            {isAdmin && <th style={thStyle}>Action</th>}
          </tr>
        </thead>

        <tbody>
          {loading && (
            <tr>
              <td colSpan="7" style={tdStyle}>Loading...</td>
            </tr>
          )}

          {!loading && salaryData.length === 0 && (
            <tr>
              <td colSpan="7" style={tdStyle}>No salary data</td>
            </tr>
          )}

          {salaryData.map((s, i) => (
            <tr key={i}>
              <td style={tdStyle}>{s.driver_id}</td>
              <td style={tdStyle}>{s.name}</td>
              <td style={tdStyle}>{s.trips}</td>
              <td style={tdStyle}>{s.distance_km} km</td>
              <td style={tdStyle}>₹{s.salary}</td>
              <td
                style={{
                  ...tdStyle,
                  fontWeight: "bold",
                  color: s.status === "Paid" ? "green" : "orange"
                }}
              >
                {s.status}
              </td>

              {/* ADMIN ONLY */}
              {isAdmin && (
                <td style={tdStyle}>
                  {s.status !== "Paid" && (
                    <button
                      style={payBtn}
                      onClick={() => markPaid(s.driver_id)}
                    >
                      Mark Paid
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

const formBox = {
  background: "#ffffff",
  padding: "15px",
  borderRadius: "8px",
  marginBottom: "20px",
  maxWidth: "420px"
};

const input = {
  width: "100%",
  padding: "8px",
  marginBottom: "10px",
  border: "1px solid #ccc",
  borderRadius: "4px"
};

const addBtn = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px"
};

const thStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  background: "#f1f5f9"
};

const tdStyle = {
  border: "1px solid #ccc",
  padding: "10px"
};

const payBtn = {
  background: "#16a34a",
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  borderRadius: "5px",
  cursor: "pointer"
};
