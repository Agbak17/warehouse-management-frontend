import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/register", {
        email,
        password,
      });

      // Save token
      localStorage.setItem("token", res.data.token);

      // Redirect to dashboard
      navigate("/products");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
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
        <h1>Register</h1>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={submit}>
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

          <button style={{ width: "100%", padding: 10 }}>Create account</button>
        </form>

        <p style={{ textAlign: "center", marginTop: 12 }}>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
