import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import api from "../api/api";

function Locations() {
  const [locations, setLocations] = useState([]);
  const [name, setName] = useState("");
  const [locationType, setLocationType] = useState("");

  useEffect(() => {
    api.get("/locations").then((res) => setLocations(res.data));
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    const res = await api.post("/locations", { name, locationType });
    setLocations([...locations, res.data]);
    setName("");
    setLocationType("");
  };

  return (
    <DashboardLayout>
      <h1>Locations</h1>

      <form onSubmit={submit} style={{ marginBottom: 30 }}>
        <input
          placeholder="Location name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <select
          value={locationType}
          onChange={(e) => setLocationType(e.target.value)}
          required
        >
          <option value="">Select type</option>
          <option value="WAREHOUSE">Warehouse</option>
          <option value="COLD_ROOM">Cold Room</option>
          <option value="QUARANTINE">Quarantine</option>
          <option value="SHELF">Shelf</option>
        </select>

        <button>Add Location</button>
      </form>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((l) => (
            <tr key={l.id}>
              <td>{l.name}</td>
              <td>{l.locationType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
}

export default Locations;
