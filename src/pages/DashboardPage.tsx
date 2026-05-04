import { useEffect, useState } from "react";
import { getDevices } from "../services/devicesServices";
import { getActivity } from "../services/activityServices";
import "../styles/DashboardPage.scss";

export default function DashboardPage() {
  const [deviceCount, setDeviceCount] = useState(0);
  const [lastEvent, setLastEvent] = useState("");

  useEffect(() => {
    getDevices().then((d) => setDeviceCount(d.length));
    getActivity(1, 1).then(({ items }) => setLastEvent(items[0]?.event ?? ""));
  }, []);

  const cards = [
    { label: "Dispositivos registrados", value: deviceCount },
    { label: "Última actividad", value: lastEvent },
    { label: "Sesión", value: "Activa" },
  ];

  return (
    <div className="dashboard-container">
      <h2 className="section-title">Dashboard</h2>
      <div className="cards-grid">
        {cards.map((c) => (
          <div key={c.label} className="card">
            <p className="label">{c.label}</p>
            <p className="value">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}