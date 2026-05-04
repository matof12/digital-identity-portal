import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/Layout.scss";

const links = [
  { to: "/", label: "Dashboard", icon: "⊞" },
  { to: "/profile", label: "Perfil", icon: "👤" },
  { to: "/devices", label: "Dispositivos", icon: "📱" },
  { to: "/activity", label: "Activity Log", icon: "📋" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className={`layout-wrapper ${isMenuOpen ? "menu-open" : ""}`}>
      {isMenuOpen && <div className="sidebar-backdrop" onClick={closeMenu} />}
      <aside className={`sidebar ${isMenuOpen ? "open" : ""}`}>
        <div className="logo">
          <span className="brand">interfase</span>
        </div>

        <nav>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              onClick={closeMenu}
              className={({ isActive }: { isActive: boolean }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <span className="icon">{l.icon}</span>
              <span className="label">{l.label}</span>
            </NavLink>
          ))}
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </aside>

      <div className="main-content">
        <header className="header">
          <button className="menu-toggle" onClick={() => setIsMenuOpen((open) => !open)} aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}>
            ☰
          </button>
          <span className="header-brand">interfase</span>
          <div className="user-avatar">MF</div>
        </header>

        <main>{children}</main>
      </div>
    </div>
  );
}