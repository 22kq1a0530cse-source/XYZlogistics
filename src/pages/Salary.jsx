const salaryData = [
  {
    driver_id: "D001",
    name: "Ravi",
    trips: 120,
    distance: "32,000 km",
    salary: "₹35,000",
    status: "Paid"
  },
  {
    driver_id: "D002",
    name: "Kumar",
    trips: 78,
    distance: "21,000 km",
    salary: "₹28,000",
    status: "Pending"
  }
];

export default function Salary() {
  return (
    <>
      <h2>Driver Salary & Payments</h2>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Driver ID</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Trips</th>
            <th style={thStyle}>Distance</th>
            <th style={thStyle}>Salary</th>
            <th style={thStyle}>Payment Status</th>
          </tr>
        </thead>

        <tbody>
          {salaryData.map((s, i) => (
            <tr key={i}>
              <td style={tdStyle}>{s.driver_id}</td>
              <td style={tdStyle}>{s.name}</td>
              <td style={tdStyle}>{s.trips}</td>
              <td style={tdStyle}>{s.distance}</td>
              <td style={tdStyle}>{s.salary}</td>
              <td
                style={{
                  ...tdStyle,
                  fontWeight: "bold",
                  color: s.status === "Paid" ? "green" : "orange"
                }}
              >
                {s.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

/* styles */
const tableStyle = { width: "100%", borderCollapse: "collapse", marginTop: "20px" };
const thStyle = { border: "1px solid #ccc", padding: "10px", background: "#f1f5f9" };
const tdStyle = { border: "1px solid #ccc", padding: "10px" };