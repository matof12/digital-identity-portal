export const mockUser={
    id: '123456789',
    name: 'Mathias Fraga',
    email:'mathias.fraga@example.com',
    role:'admin',
    country:'Uruguay',
    createdAt: '2026-04-05T00:00:00Z',
}

export const mockDevices = [
  { id: "d1", name: "Chrome en Windows", lastSeen: "2026-04-29", active: true },
  { id: "d2", name: "Firefox en Ubuntu", lastSeen: "2026-04-20", active: false },
  { id: "d3", name: "Safari en iPhone", lastSeen: "2026-04-25", active: true },
];

export const mockActivities = Array.from({ length: 30 }, (_, i) => ({
  id: `e${i}`,
  event: ["Login exitoso", "Dispositivo eliminado", "Perfil actualizado", "Sesión cerrada"][i % 4],
  date: new Date(Date.now() - i * 86400000).toISOString(),
}));