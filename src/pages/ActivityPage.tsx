import { useEffect, useState } from "react";
import { getActivity } from "../services/activityServices";
import "../styles/ActivityPage.scss";

const eventClassMap: Record<string, string> = {
  "Login exitoso": "login",
  "Dispositivo eliminado": "device-deleted",
  "Perfil actualizado": "profile-updated",
  "Sesión cerrada": "logout",
};

export default function ActivityPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    getActivity(page, 10).then(({ items, total }) => {
      setItems(items);
      setTotal(total);
      setLoading(false);
    });
  }, [page]);

  const totalPages = Math.ceil(total / 10);

  return (
    <div className="activity-container">
      <h2 className="section-title">Activity Log</h2>

      <div className="activity-list">
        {loading ? (
          <p className="loading">Cargando...</p>
        ) : items.map((e) => (
          <div key={e.id} className="activity-item">
            <div className="event-info">
              <span className={`event-badge ${eventClassMap[e.event] ?? "default"}`}>
                {e.event}
              </span>
            </div>
            <span className="event-date">
              {new Date(e.date).toLocaleDateString("es-UY", { day: "2-digit", month: "short", year: "numeric" })}
            </span>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          className="pagination-btn"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          ← Anterior
        </button>
        <span className="pagination-info">Página {page} de {totalPages}</span>
        <button
          className="pagination-btn"
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}