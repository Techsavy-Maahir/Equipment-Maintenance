import { useEffect, useState } from "react";
import { api, handleApiError } from "../api";

export function EquipmentListPage() {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.getEquipment();
        setEquipment(data);
      } catch (err) {
        setError(handleApiError(err));
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p>Loading equipment...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px", color: "red" }}>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Equipment</h1>
      {equipment.length === 0 ? (
        <p>No equipment found.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Code</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Status</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Criticality</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Department</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Location</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Category</th>
            </tr>
          </thead>
          <tbody>
            {equipment.map((item) => (
              <tr key={item.id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.code}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.name}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.status}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.criticality}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.department.name}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.location.name}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.category.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}