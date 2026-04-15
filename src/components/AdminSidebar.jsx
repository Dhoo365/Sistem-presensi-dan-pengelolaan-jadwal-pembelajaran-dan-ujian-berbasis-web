import { NavLink } from "react-router-dom";
import "../styles/adminSidebar.css";
import logo from "../assets/foto/logo.png";

export default function AdminSidebar() {
  const menus = [
    { name: "Beranda", icon: "ti ti-home", path: "/admin" },
    { name: "Kelola Murid", icon: "ti ti-users", path: "/admin/murid" },
    { name: "Kelola Guru", icon: "ti ti-school", path: "/admin/guru" },
    { name: "Kelola Mapel", icon: "ti ti-book", path: "/admin/mapel" },
    { name: "Kelola Kelas", icon: "ti ti-device-desktop", path: "/admin/kelas" },
    { name: "Kelola Jadwal", icon: "ti ti-calendar-event", path: "/admin/jadwal" },
    { name: "Kelola Akun", icon: "ti ti-settings-2", path: "/admin/akun" },
  ];

  return (
    <aside className="admin-sidebar">

      {/* Header */}
      <div className="sidebar-brand">
        <img src={logo} alt="Logo" />
        <div className="brand-text">
          <h2>SD GMIM 12</h2>
          <p>Sistem Presensi & Penjadwalan</p>
        </div>
      </div>

      {/* Menu */}
      <div className="sidebar-section-title">MENU UTAMA</div>

      <nav className="sidebar-menu">
        {menus.map((item, i) => (
          <NavLink
            key={i}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <i className={item.icon}></i>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="sidebar-bottom">
        <div className="sidebar-divider"></div>
        <div className="sidebar-section-title">LAINNYA</div>

        <button className="logout-btn">
          <i className="ti ti-logout"></i>
          <span>Keluar</span>
        </button>
      </div>

    </aside>
  );
}