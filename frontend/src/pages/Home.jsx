import { Link } from "react-router-dom";
import heroImg from "./assets/hero.png";

export default function Home() {
  const role = localStorage.getItem("role");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const username = localStorage.getItem("username");

  return (
    <div style={page}>
      {/* NAVBAR */}
      <header style={nav}>
        <h2 style={logo}>XYZ LOGISTICS</h2>

        <div>
          {/* ===== BEFORE LOGIN ===== */}
          {!isLoggedIn && (
            <>
              <Link to="/login" style={navLink}>
                Login
              </Link>

              <Link to="/register" style={navLink}>
                Register
              </Link>
            </>
          )}

          {/* ===== AFTER LOGIN ===== */}
          {isLoggedIn && (
            <div style={userBox}>
              <span style={userText}>
                👤 {username} {role === "admin" && "(Admin)"}
              </span>

              <Link to="/dashboard/trucks" style={navBtn}>
                Dashboard
              </Link>

              <button
                style={logoutBtn}
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/";
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* HERO */}
      <section style={hero}>
        <div style={heroOverlay}></div>

        <div style={heroContent}>
          <h1 style={heroTitle}>
            We Manage Transport <br /> with Precision & Care
          </h1>

          <p style={heroText}>
            A complete logistics management platform for
            fleet, drivers, trips, safety and payroll.
          </p>

          {/* GET STARTED / DASHBOARD */}
          {!isLoggedIn ? (
            <Link to="/login" style={primaryBtn}>
              Get Started
            </Link>
          ) : (
            <Link to="/dashboard/trucks" style={primaryBtn}>
              Go to Dashboard
            </Link>
          )}
        </div>
      </section>

      {/* FEATURES */}
      <section style={section}>
        <h2 style={sectionTitle}>Our Core Services</h2>

        <div style={features}>
          <Feature title="Fleet Management" icon="🚛" />
          <Feature title="Driver Performance" icon="👷" />
          <Feature title="Safety & Compliance" icon="🛡️" />
          <Feature title="Real-time Tracking" icon="🗺️" />
        </div>
      </section>

      {/* FOOTER */}
      <footer style={footer}>
        © 2026 XYZ Logistics. All rights reserved.
      </footer>
    </div>
  );
}

/* COMPONENT */
function Feature({ title, icon }) {
  return (
    <div style={featureCard}>
      <div style={featureIcon}>{icon}</div>
      <h4>{title}</h4>
      <p style={{ fontSize: "14px", color: "#475569" }}>
        Reliable and scalable logistics solutions for modern businesses.
      </p>
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  fontFamily: "Inter, Arial, sans-serif",
  color: "#0f172a",
  background: "#ffffff"
};

const nav = {
  display: "flex",
  justifyContent: "space-between",
  padding: "18px 60px",
  background: "#020617",
  alignItems: "center"
};

const logo = {
  color: "#ffffff",
  letterSpacing: "1px"
};

const navLink = {
  color: "#e5e7eb",
  marginRight: "20px",
  textDecoration: "none",
  fontWeight: "500"
};

const navBtn = {
  background: "#2563eb",
  color: "white",
  padding: "8px 18px",
  borderRadius: "6px",
  textDecoration: "none",
  fontWeight: "600"
};

const userBox = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  color: "#e5e7eb"
};

const userText = {
  fontSize: "14px",
  fontWeight: "500"
};

const logoutBtn = {
  background: "#dc2626",
  color: "white",
  border: "none",
  padding: "6px 14px",
  borderRadius: "6px",
  cursor: "pointer"
};

const hero = {
  minHeight: "90vh",
  display: "flex",
  alignItems: "center",
  padding: "0 10%",
  position: "relative",
  background: `url(${heroImg}) center/cover no-repeat`,
  color: "white"
};

const heroOverlay = {
  position: "absolute",
  inset: 0,
  background: "linear-gradient(90deg, rgba(2,6,23,0.85), rgba(2,6,23,0.6))"
};

const heroContent = {
  maxWidth: "560px",
  position: "relative",
  zIndex: 2
};

const heroTitle = {
  fontSize: "48px",
  marginBottom: "18px",
  lineHeight: "1.2",
  fontWeight: "800"
};

const heroText = {
  fontSize: "17px",
  marginBottom: "30px",
  opacity: 0.95
};

const primaryBtn = {
  background: "#2563eb",
  color: "white",
  padding: "14px 30px",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "700"
};

const section = {
  padding: "90px 10%"
};

const sectionTitle = {
  fontSize: "34px",
  marginBottom: "45px",
  textAlign: "center"
};

const features = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "30px"
};

const featureCard = {
  background: "white",
  padding: "32px",
  borderRadius: "14px",
  textAlign: "center",
  boxShadow: "0 15px 40px rgba(0,0,0,0.08)"
};

const featureIcon = {
  fontSize: "36px",
  marginBottom: "14px"
};

const footer = {
  background: "#020617",
  color: "#cbd5f5",
  textAlign: "center",
  padding: "18px"
};
