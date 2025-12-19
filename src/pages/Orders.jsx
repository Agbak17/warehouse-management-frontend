import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import api from "../api/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [supplierId, setSupplierId] = useState("");

  useEffect(() => {
    api.get("/orders").then((res) => setOrders(res.data));
    api.get("/suppliers").then((res) => setSuppliers(res.data));
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    const res = await api.post("/orders", {
      supplierId: Number(supplierId),
    });

    setOrders([...orders, res.data]);
    setSupplierId("");
  };

  return (
    <DashboardLayout>
      <h1>Purchase Orders</h1>

      <form onSubmit={submit} style={{ marginBottom: 30 }}>
        <select
          value={supplierId}
          onChange={(e) => setSupplierId(e.target.value)}
          required
        >
          <option value="">Select Supplier</option>
          {suppliers.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        <button>Create Order</button>
      </form>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Supplier</th>
            <th>Status</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.supplier?.name}</td>
              <td>{o.status}</td>
              <td>{new Date(o.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
}

export default Orders;
