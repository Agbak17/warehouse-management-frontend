import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import api from "../api/api";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    api.get("/suppliers").then((res) => setSuppliers(res.data));
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    const res = await api.post("/suppliers", { name, email, phone });
    setSuppliers([...suppliers, res.data]);

    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <DashboardLayout>
      <h1>Suppliers</h1>

      <form onSubmit={submit} style={{ marginBottom: 30 }}>
        <input
          placeholder="Supplier name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button>Add Supplier</button>
      </form>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email || "—"}</td>
              <td>{s.phone || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
}

export default Suppliers;
