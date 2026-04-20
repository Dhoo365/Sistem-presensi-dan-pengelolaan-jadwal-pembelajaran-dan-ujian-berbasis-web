import { NavLink } from "react-router-dom";
import logo from "../../assets/foto/logo.png";

export default function AdminSidebar({ isSidebarOpen }) {
  const menus = [
    { name: "Beranda", icon: "ti ti-home", path: "/ortu" },
    { name: "Lihat Presensi", icon: "ti ti-book", path: "/ortu/lihat-presensi" },
    { name: "Lihat Jadwal", icon: "ti ti-calendar-event", path: "/ortu/lihat-jadwal" },
  ];

  return (
    <aside className={`h-screen bg-[#3B3128] text-white flex flex-col shadow-xl transition-all duration-300 ease-in-out relative ${isSidebarOpen ? "w-[280px]" : "w-[85px]"}`}>
      {/* Header */}
      <div className={`${isSidebarOpen ? "px-5" : "px-3.5"} py-5 border-b border-white/10 h-[97px] overflow-hidden`}>
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
          <div className={`leading-tight transition-all duration-300 ${isSidebarOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10 pointer-events-none"}`}>
            <h1 className="text-[17px] font-bold whitespace-nowrap">SD GMIM 12</h1>
            <p className="text-xs text-white/70 whitespace-nowrap">
              Sistem Presensi & Jadwal
            </p>
          </div>
        </div>
      </div>

      {/* Menu Title */}
      <div className={`px-5 pt-5 pb-2 text-[11px] font-semibold tracking-[2px] uppercase text-white/50 transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0"}`}>
        {isSidebarOpen ? "Menu Utama" : "•"}
      </div>

      {/* Menu */}
      <nav className="px-3 space-y-1 flex-1 overflow-y-auto no-scrollbar">
        {menus.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            end={item.path === "/ortu"}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 group ${isActive
                ? "bg-white text-[#8B5E3C] shadow-md"
                : "text-white/85 hover:bg-white/10"
              }`
            }
          >
            <i className={`${item.icon} text-[22px] shrink-0 ${!isSidebarOpen && "mx-auto"}`}></i>
            <span className={`transition-all duration-300 whitespace-nowrap ${isSidebarOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10 pointer-events-none absolute"}`}>
              {item.name}
            </span>
            {/* Tooltip for collapsed state */}
            {!isSidebarOpen && (
              <div className="absolute left-full ml-4 px-2 py-1 bg-gray-800 text-white text-[11px] rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[100]">
                {item.name}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 pt-3 border-t border-white/10">
        <div className={`px-2 pb-2 text-[11px] font-semibold tracking-[2px] uppercase text-white/50 transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0"}`}>
          {isSidebarOpen ? "LAINNYA" : "•"}
        </div>

        <NavLink
          to={"/login"}
          type="button"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-white hover:bg-red-500/20 transition group relative"
        >
          <i className={`ti ti-logout text-[22px] shrink-0 ${!isSidebarOpen && "mx-auto"}`}></i>
          <span className={`transition-all duration-300 whitespace-nowrap ${isSidebarOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10 pointer-events-none absolute"}`}>
            Keluar
          </span>
          {!isSidebarOpen && (
            <div className="absolute left-full ml-4 px-2 py-1 bg-red-600 text-white text-[11px] rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[100]">
              Keluar
            </div>
          )}
        </NavLink>
      </div>
    </aside >
  );
}