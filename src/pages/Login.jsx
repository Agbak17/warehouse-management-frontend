import { useState } from "react";
import api from "../api/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      // Save token
      localStorage.setItem("token", res.data.token);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
      console.error(err);
    }
  };

  return (
    <div 
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        alignItems: "center",     // vertical center
        justifyContent: "center", // horizontal center
        background: "#fafafa",
      }}
    >
      <div style={{
          maxWidth: 400,
          padding: 24,
          border: "1px solid #ddd",
          borderRadius: 8,
        }}>
        <h2 style={{ textAlign: "center" }}>Login</h2>

        {error && (
          <p style={{ color: "red", marginBottom: 10 }}>{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: 8,
                marginBottom: 12,
              }}
            />
          </div>

          <div style={{ marginTop: 10 }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: 8,
                marginBottom: 12,
              }}
            />
          </div>

          <button style={{ width: "100%", padding: 10 }}>Login</button>
          <p style={{ textAlign: "center", marginTop: 10 }}>Don’t have an account? <Link to="/register">Register</Link></p>

        </form>
      </div>
    </div>
  );
}

export default Login;
