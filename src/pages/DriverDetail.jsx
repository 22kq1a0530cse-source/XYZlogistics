import { useParams } from "react-router-dom";

const driverData = {
  D001: {
    name: "Ravi",
    license: "DL12345",
    totalTrips: 120,
    kilometers: 32000,
    hours: 1800,
    performance: 85,
    overspeed: 2,
    attendance: "92%",
    salary: "₹35,000"
  },
  D002: {
    name: "Kumar",
    license: "DL67890",
    totalTrips: 78,
    kilometers: 21000,
    hours: 1200,
    performance: 70,
    overspeed: 5,
    attendance: "85%",
    salary: "₹28,000"
  }
};

export default function DriverDetail() {
  const { driverId } = useParams();
  const driver = driverData[driverId];

  if (!driver) return <h3>Driver not found</h3>;

  return (
    <>
      <h2>Driver Details</h2>

      {/* Basic Info */}
      <div style={cardStyle}>
        <h3>Basic Information</h3>
        <p><b>Name:</b> {driver.name}</p>
        <p><b>License No:</b> {driver.license}</p>
      </div>

      {/* Trip Summary */}
      <div style={cardStyle}>
        <h3>Trip Summary</h3>
        <p><b>Total Trips:</b> {driver.totalTrips}</p>
        <p><b>Kilometers Travelled:</b> {driver.kilometers}</p>
        <p><b>Hours Driven:</b> {driver.hours}</p>
      </div>

      {/* Performance & Safety */}
      <div style={cardStyle}>
        <h3>Performance & Safety</h3>
        <p><b>Performance Score:</b> {driver.performance}</p>
        <p><b>Over-speed Alerts:</b> {driver.overspeed}</p>
      </div>

      {/* Attendance & Salary */}
      <div style={cardStyle}>
        <h3>Attendance & Salary</h3>
        <p><b>Attendance:</b> {driver.attendance}</p>
        <p><b>Salary:</b> {driver.salary}</p>
      </div>
    </>
  );
}

/* ----- styles ----- */

const cardStyle = {
  border: "1px solid #e5e7eb",
  padding: "15px",
  borderRadius: "8px",
  marginTop: "15px",
  backgroundColor: "#ffffff"
};