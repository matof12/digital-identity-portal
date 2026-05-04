import { useEffect, useState } from "react";
import { getDevices, deleteDevice } from "../services/devicesServices";
import ConfirmModal from "../components/ConfirmModal";
import "../styles/DevicesPage.scss";

export default function DevicesPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [devices, setDevices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalDevice, setModalDevice] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    getDevices().then((d) => { setDevices(d); setLoading(false); });
  }, []);

  const handleDeleteClick = (id: string, name: string) => {
    setModalDevice({ id, name })  // abre el modal
  }

  const handleConfirm = async () => {
    if (!modalDevice) return
    await deleteDevice(modalDevice.id)
    setDevices((prev) => prev.filter((d) => d.id !== modalDevice.id))
    setModalDevice(null)  // cierra el modal
  }

  const handleCancel = () => {
    setModalDevice(null)  // cierra el modal sin hacer nada
  }

  if (loading) return <p className="loading">Cargando...</p>;

  return (
    <div className="devices-container">
      <h2 className="section-title">Dispositivos</h2>
      <div className="devices-card">
        {devices.length === 0 && (
          <p className="empty-state">No hay dispositivos registrados.</p>
        )}
        {devices.map((d) => (
          <div key={d.id} className="device-item">
            <div className="device-info">
              <div className={`status-indicator ${d.active ? "active" : "inactive"}`} />
              <div className="device-details">
                <p className="device-name">{d.name}</p>
                <p className="device-time">Última vez: {d.lastSeen}</p>
              </div>
            </div>
            <button className="delete-btn" onClick={() => handleDeleteClick(d.id, d.name)}>
              Eliminar
            </button>
          </div>
        ))}
      </div>

      {modalDevice && (
        <ConfirmModal
          message={`¿Estás seguro que querés eliminar "${modalDevice.name}"?`}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}