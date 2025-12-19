import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import api from "../api/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [barcode, setBarcode] = useState("");
  const [description, setDescription] = useState("");


  // Fetch products on load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <p>Loading products...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1>Products</h1>

      {/* Add Product Form */}
      <div style={{ marginTop: "20px", marginBottom: "40px" }}>
        <h3>Add New Product</h3>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const res = await api.post("/products", {
                name,
                brand,
                category,
                barcode,
                description,
              });
              setProducts([...products, res.data]); // Add new product to UI
              setName("");
              setBrand("");
              setCategory("");
              setBarcode("");
              setDescription("");
            } catch (err) {
              console.error("Error creating product:", err);
            }
          }}
        >
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            style={{ marginLeft: 10 }}
            type="text"
            placeholder="Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
          <input
            style={{ marginLeft: 10 }}
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            style={{ marginLeft: 10 }}
            type="text"
            placeholder="Barcode"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
          />
          <br />
          <textarea
            style={{ marginTop: "10px", width: "300px", height: "70px" }}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <button style={{ marginTop: "10px" }}>Add Product</button>
        </form>
      </div>


      <table border="1" cellPadding="8" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Barcode</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="4">No products yet.</td>
            </tr>
          ) : (
            products.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.brand || "—"}</td>
                <td>{p.category || "—"}</td>
                <td>{p.barcode || "—"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </DashboardLayout>
  );
}

export default Products;
