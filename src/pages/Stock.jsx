import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import api from "../api/api";

function StockMovements() {
  const [movements, setMovements] = useState([]);
  const [products, setProducts] = useState([]);
  const [batches, setBatches] = useState([]);

  const [form, setForm] = useState({
    productId: "",
    batchId: "",
    quantity: "",
    movementType: "INBOUND",
    fromLocationId: "",
    toLocationId: "",
  });

  // Load stock movements + products
  useEffect(() => {
    api.get("/stocks").then((res) => setMovements(res.data));
    api.get("/products").then((res) => setProducts(res.data));
  }, []);

  // Load batches when product changes
  useEffect(() => {
    if (form.productId) {
      api
        .get(`/batches/${form.productId}`)
        .then((res) => setBatches(res.data));
    } else {
      setBatches([]);
    }
  }, [form.productId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        productId: Number(form.productId),
        batchId: form.batchId ? Number(form.batchId) : null,
        quantity: Number(form.quantity),
        movementType: form.movementType,
        fromLocationId: form.fromLocationId
          ? Number(form.fromLocationId)
          : null,
        toLocationId: form.toLocationId
          ? Number(form.toLocationId)
          : null,
      };

      const res = await api.post("/stocks", payload);

      // Prepend new movement
      setMovements((prev) => [res.data, ...prev]);

      // Reset form
      setForm({
        productId: "",
        batchId: "",
        quantity: "",
        movementType: "INBOUND",
        fromLocationId: "",
        toLocationId: "",
      });
      setBatches([]);
    } catch (err) {
      console.error("Stock movement failed:", err.response?.data || err);
      alert(err.response?.data?.error || "Failed to create stock movement");
    }
  };

  return (
    <DashboardLayout>
      <h1>Stock Movements</h1>

      {/* Create Movement */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
        <select
          name="productId"
          value={form.productId}
          onChange={handleChange}
          required
        >
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <select
          name="batchId"
          value={form.batchId}
          onChange={handleChange}
          required={
            form.movementType === "INBOUND" ||
            form.movementType === "OUTBOUND"
          }
        >
          <option value="">Select Batch</option>
          {batches.map((b) => (
            <option key={b.id} value={b.id}>
              {b.batchNumber} (qty: {b.quantity})
            </option>
          ))}
        </select>

        <input
          name="quantity"
          type="number"
          min="1"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          required
        />

        <select
          name="movementType"
          value={form.movementType}
          onChange={handleChange}
        >
          <option value="INBOUND">INBOUND</option>
          <option value="OUTBOUND">OUTBOUND</option>
          <option value="INTERNAL">INTERNAL</option>
        </select>

        <button>Add Movement</button>
      </form>

      {/* Movement Log */}
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Product</th>
            <th>Batch</th>
            <th>Type</th>
            <th>Qty</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {movements.length === 0 ? (
            <tr>
              <td colSpan="5">No movements yet</td>
            </tr>
          ) : (
            movements.map((m) => (
              <tr key={m.id}>
                <td>{m.product?.name}</td>
                <td>{m.batch?.batchNumber || "—"}</td>
                <td>{m.movementType}</td>
                <td>{m.quantity}</td>
                <td>{new Date(m.createdAt || m.timestamp).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </DashboardLayout>
  );
}

export default StockMovements;
