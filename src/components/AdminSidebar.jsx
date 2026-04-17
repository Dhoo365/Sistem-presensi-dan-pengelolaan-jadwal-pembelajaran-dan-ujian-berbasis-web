import { NavLink } from "react-router-dom";
import logo from "../assets/foto/logo.png";

export default function AdminSidebar() {
  const menus = [
    { name: "Beranda", icon: "ti ti-home", path: "/admin" },
    { name: "Kelola Murid", icon: "ti ti-users", path: "/admin/murid" },
    { name: "Kelola Guru", icon: "ti ti-school", path: "/admin/guru" },
    { name: "Kelola Mapel", icon: "ti ti-book", path: "/admin/mapel" },
    { name: "Kelola Kelas", icon: "ti ti-layout-grid", path: "/admin/kelas" },
    { name: "Kelola Jadwal", icon: "ti ti-calendar-event", path: "/admin/jadwal" },
    { name: "Kelola Akun", icon: "ti ti-settings", path: "/admin/akun" },
  ];

  return (
    <aside className="w-[280px] min-h-screen bg-[#3B3128] text-white flex flex-col shadow-xl">

      {/* Header */}
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex items-center gap-4">

          {/* Logo */}
          <div className="w-14 h-14 flex items-center justify-center overflow-hidden shrink-0">
            <img
              src={logo}
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Text */}
          <div className="leading-tight">
            <h1 className="text-[17px] font-bold">SD GMIM 12</h1>
            <p className="text-xs text-white/70">
              Sistem Presensi & Jadwal
            </p>
          </div>
        </div>
      </div>

      {/* Menu Title */}
      <div className="px-5 pt-5 pb-2 text-[11px] font-semibold tracking-[2px] uppercase text-white/50">
        Menu Utama
      </div>

      {/* Menu */}
      <nav className="px-3 space-y-1">
        {menus.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-white text-[#8B5E3C] shadow-md"
                  : "text-white/85 hover:bg-white/10"
              }`
            }
          >
            <i className={`${item.icon} text-[20px]`}></i>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 pt-3 border-t border-white/10">
        <div className="px-2 pb-2 text-[11px] font-semibold tracking-[2px] uppercase text-white/50">
          LAINNYA
        </div>

        <button
          type="button"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-white hover:bg-red-500/20 transition"
        >
          <i className="ti ti-logout text-[20px]"></i>
          <span>Keluar</span>
        </button>
      </div>
    </aside>
  );
}