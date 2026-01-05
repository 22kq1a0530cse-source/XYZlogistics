export default function SafetyDashboard() {
  const safetyData = [
    { driver_id: "D001", name: "Ravi", overspeed: 2, score: 85, status: "Good" },
    { driver_id: "D002", name: "Kumar", overspeed: 6, score: 65, status: "Warning" },
    { driver_id: "D003", name: "Suresh", overspeed: 10, score: 45, status: "Critical" }
  ];

  return (
    <>
      <h2>Safety & Over-Speed Dashboard</h2>

      <div style={cardGrid}>
        <SummaryCard title="Total Drivers" value="3" />
        <SummaryCard title="Over-speed Alerts" value="18" />
        <SummaryCard title="Safe Drivers" value="1" />
        <SummaryCard title="High-Risk Drivers" value="1" />
      </div>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Driver ID</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Over-speed</th>
            <th style={thStyle}>Safety Score</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {safetyData.map((d, i) => (
            <tr key={i}>
              <td style={tdStyle}>{d.driver_id}</td>
              <td style={tdStyle}>{d.name}</td>
              <td style={tdStyle}>{d.overspeed}</td>
              <td style={tdStyle}>{d.score}</td>
              <td style={{ ...tdStyle, fontWeight: "bold", color: statusColor(d.status) }}>
                {d.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

/* ---------- helpers ---------- */

function SummaryCard({ title, value }) {
  return (
    <div style={summaryCard}>
      <p style={{ fontSize: "14px", color: "#64748b" }}>{title}</p>
      <h3>{value}</h3>
    </div>
  );
}

/* ---------- styles ---------- */

const cardGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "15px",
  marginBottom: "25px"
};

const summaryCard = {
  border: "1px solid #e5e7eb",
  padding: "15px",
  borderRadius: "8px",
  backgroundColor: "#ffffff"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
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

const statusColor = (status) => {
  if (status === "Good") return "green";
  if (status === "Warning") return "orange";
  return "red";
};