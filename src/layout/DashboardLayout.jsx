import { Link, useNavigate } from "react-router-dom";

function DashboardLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* SIDEBAR */}
      <aside
        style={{
          width: "220px",
          background: "#1e1e2f",
          color: "#fff",
          padding: "20px",
        }}
      >
        <h2>WMS</h2>

        <nav style={{ marginTop: "30px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <Link to="/dashboard" style={{ color: "#fff" }}>Dashboard</Link>
          <Link to="/products" style={{ color: "#fff" }}>Products</Link>
          <Link to="/batches" style={{ color: "#fff" }}>Batches</Link>
          <Link to="/suppliers" style={{ color: "#fff" }}>Suppliers</Link>
          <Link to="/stock" style={{ color: "#fff" }}>Stock Movements</Link>
          <Link to="/orders" style={{ color: "#fff" }}>Orders</Link>
          <Link to="/locations" style={{ color: "#fff" }}>Locations</Link>
        </nav>

        <button
          onClick={handleLogout}
          style={{
            marginTop: "40px",
            padding: "8px 12px",
            width: "100%",
            background: "#ff4d4d",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, padding: "20px" }}>
        {children}
      </main>

    </div>
  );
}

export default DashboardLayout;
