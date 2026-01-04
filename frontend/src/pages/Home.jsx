import { Link } from "react-router-dom";
import heroImg from "./assets/hero.png";

export default function Home() {
  // ✅ ADDED (necessary)
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  // ✅ FIXED (return must be on same line)
  return (
    <div style={page}>

      {/* NAVBAR */}
      <header style={nav}>
        <h2 style={logo}>XYZ LOGISTICS</h2>

        <div>
          {/* ===== BEFORE LOGIN ===== */}
          {!role && (
            <>
              {/* Login */}
              <Link
                to="/login"
                style={navLink}
                onMouseEnter={(e) => (e.target.style.color = "#2563eb")}
                onMouseLeave={(e) => (e.target.style.color = "#e5e7eb")}
              >
                Login
              </Link>

              {/* Register */}
              <Link
                to="/register"
                style={navLink}
                onMouseEnter={(e) => (e.target.style.color = "#2563eb")}
                onMouseLeave={(e) => (e.target.style.color = "#e5e7eb")}
              >
                Register
              </Link>

              {/* Admin */}
              <Link to="/admin-login" style={navBtn}>
                Admin
              </Link>
            </>
          )}

          {/* ===== AFTER LOGIN (USER / ADMIN) ===== */}
          {role && (
            <div style={userBox}>
              <span style={userText}>
                👤 {username} {role === "admin" && "(Admin)"}
              </span>

              {/* Admin dashboard link */}
              {role === "admin" && (
                <Link to="/trucks" style={navBtn}>
                  Dashboard
                </Link>
              )}

              <button
                style={logoutBtn}
                onClick={() => {
                  localStorage.removeItem("role");
                  localStorage.removeItem("username");
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

          <Link to="/register" style={primaryBtn}>
            Get Started
          </Link>
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

      {/* LOGISTICS INFO */}
      <section style={{ ...section, background: "#f8fafc" }}>
        <div style={twoCol}>
          <div>
            <h2 style={sectionTitle}>Comprehensive Logistics</h2>
            <p style={text}>
              We help transport companies digitize operations,
              reduce manual work and increase safety through
              smart logistics software.
            </p>

            <ul style={list}>
              <li>✔ Live vehicle tracking</li>
              <li>✔ Driver optimization</li>
              <li>✔ Attendance & salary</li>
              <li>✔ Safety monitoring</li>
            </ul>
          </div>

          <img
            src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7"
            alt="truck"
            style={image}
          />
        </div>
      </section>

      {/* STATS */}
      <section style={stats}>
        <Stat value="145+" label="Branches" />
        <Stat value="60+" label="Vehicles" />
        <Stat value="5,200+" label="Drivers" />
      </section>

      {/* CTA */}
      <section style={cta}>
        <h2>Experience the Future of Logistics</h2>
        <Link to="/register" style={primaryBtn}>
          Request a Demo
        </Link>
      </section>

      {/* FOOTER */}
      <footer style={footer}>
        © 2026 XYZ Logistics. All rights reserved.
      </footer>

    </div>
  );
}

/* COMPONENTS */

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

function Stat({ value, label }) {
  return (
    <div>
      <h2>{value}</h2>
      <p>{label}</p>
    </div>
  );
}

/* ================= STYLES ================= */
/* 🔽 ALL YOUR EXISTING STYLES – UNCHANGED 🔽 */

const page = {
  fontFamily: "Inter, Arial, sans-serif",
  color: "#0f172a",
  background: "#ffffff"
};

/* NAV */
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

/* 🔹 ADDED styles (minimal & required only) */
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

/* HERO */
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

/* (rest of your styles remain unchanged) */


/* SECTIONS */
const section = {
  padding: "90px 10%"
};

const sectionTitle = {
  fontSize: "34px",
  marginBottom: "45px",
  textAlign: "center"
};

/* FEATURES */
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

/* TWO COLUMN */
const twoCol = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "60px",
  alignItems: "center"
};

const text = {
  fontSize: "16px",
  lineHeight: "1.8",
  marginBottom: "20px"
};

const list = {
  lineHeight: "2",
  paddingLeft: "0",
  listStyle: "none"
};

const image = {
  width: "100%",
  borderRadius: "16px"
};

/* STATS */
const stats = {
  background: "#020617",
  color: "white",
  display: "flex",
  justifyContent: "space-around",
  padding: "70px 10%",
  textAlign: "center"
};

/* CTA */
const cta = {
  padding: "90px 10%",
  textAlign: "center",
  background: "#0f172a",
  color: "white"
};

/* FOOTER */
const footer = {
  background: "#020617",
  color: "#cbd5f5",
  textAlign: "center",
  padding: "18px"
};