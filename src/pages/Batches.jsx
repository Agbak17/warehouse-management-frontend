import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import api from "../api/api";

function Batches() {
  const [batches, setBatches] = useState([]);
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    api.get("/batches").then(res => setBatches(res.data));
    api.get("/products").then(res => setProducts(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await api.post("/batches", {
      productId,
      batchNumber,
      expiryDate,
      quantity,
    });

    setBatches([...batches, res.data]);
    setBatchNumber("");
    setExpiryDate("");
    setQuantity("");
  };

  return (
    <DashboardLayout>
      <h1>Batches</h1>

      <form onSubmit={handleSubmit}>
        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          required
        >
          <option value="">Select Product</option>
          {products.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        <input
          placeholder="Batch Number"
          value={batchNumber}
          onChange={(e) => setBatchNumber(e.target.value)}
          required
        />

        <input
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />

        <button>Add Batch</button>
      </form>

      <table border="1" cellPadding="8" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Batch</th>
            <th>Expiry</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {batches.map(b => (
            <tr key={b.id}>
              <td>{b.product.name}</td>
              <td>{b.batchNumber}</td>
              <td>{new Date(b.expiryDate).toLocaleDateString()}</td>
              <td>{b.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
}

export default Batches;
