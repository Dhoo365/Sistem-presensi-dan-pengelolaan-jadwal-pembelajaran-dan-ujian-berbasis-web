import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  School,
  CalendarDays,
  Settings,
  LogOut
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, href, active }) => (
  <Link
    to={href}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${active
      ? 'bg-[#E5E5E5] text-[#3B302B] font-bold shadow-sm'
      : 'text-white hover:bg-[#4A3D37] hover:text-white'
      }`}
  >
    <Icon size={20} />
    <span className="text-sm">{label}</span>
  </Link>
);

export default function NavbarAdmin() {
  // 2. Ambil path saat ini
  const location = useLocation();
  const currentPath = location.pathname;

  // 3. Konfigurasi data menu
  const menuUtama = [
    { label: "Beranda", icon: LayoutDashboard, href: "/admin" },
    { label: "Kelola Murid", icon: Users, href: "/admin/murid" },
    { label: "Kelola Guru", icon: GraduationCap, href: "/admin/guru" },
    { label: "Kelola Mapel", icon: BookOpen, href: "/admin/mapel" },
    { label: "Kelola Kelas", icon: School, href: "/admin/kelas" },
    { label: "Kelola Jadwal", icon: CalendarDays, href: "/admin/jadwal" },
    { label: "Kelola Akun", icon: Settings, href: "/admin/akun" },
  ];

  return (
    <aside className="w-72 bg-[#3B302B] flex flex-col h-full shrink-0 shadow-2xl">
      <div className="p-8 flex items-center gap-4">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#3B302B] font-black text-[10px] leading-tight text-center shadow-inner">
        </div>
        <div>
          <h1 className="text-white font-bold text-lg leading-tight">SD GMIM 12</h1>
          <p className="text-[11px] text-white font-medium tracking-widest uppercase">Sistem Presensi & Penjadwalan</p>
        </div>
      </div>

      <div className="flex-1 px-4 space-y-8 overflow-y-auto custom-scrollbar">
        <div>
          <p className="text-[11px] font-bold text-white mb-4 px-4 tracking-[0.2em]">MENU UTAMA</p>
          <nav className="space-y-1">
            {/* 4. Render menu secara dinamis */}
            {menuUtama.map((item) => (
              <SidebarItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                href={item.href}
                active={currentPath === item.href}
              />
            ))}
          </nav>
        </div>

        <div>
          <p className="text-[11px] font-bold text-gray-500 mb-4 px-4 tracking-[0.2em]">LAINNYA</p>
          <nav>
            <SidebarItem
              icon={LogOut}
              label="Keluar"
              href="/logout"
              active={currentPath === '/logout'}
            />
          </nav>
        </div>
      </div>
    </aside>
  );
}