import { useLocation } from "react-router-dom";
import { Menu, User } from "lucide-react";

export default function AdminHeader({ isSidebarOpen, setIsSidebarOpen }) {
  const location = useLocation();

  // Mapping paths to titles and descriptions
  const pageMeta = {
    "/ortu": { title: "Beranda", desc: "Selamat Datang di Panel Orang Tua" },
    "/ortu/lihat-presensi": { title: "Lihat Presensi", desc: "Lihat Presensi Siswa" },
    "/ortu/lihat-jadwal": { title: "Lihat Jadwal", desc: "Lihat Jadwal Siswa" },
  };

  const currentMeta = pageMeta[location.pathname] || { title: "Panel Orang Tua", desc: "Management Sistem" };

  return (
    <header className="bg-[#DFDFDF] rounded-2xl p-6 flex justify-between items-center border border-gray-300 shadow-sm mb-8">
      <div className="flex items-center gap-6">
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
          className="p-2 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
          title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          <Menu size={32} className="text-gray-600" />
        </button>
        <div>
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">{currentMeta.title}</h2>
          <p className="text-gray-500 text-sm font-medium italic">{currentMeta.desc}</p>
        </div>
      </div>
      <div className="flex items-center gap-5 border-l-2 border-gray-400 pl-6">
        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-white ring-4 ring-gray-200">
          <User size={24} />
        </div>
        <div>
          <p className="font-bold text-gray-800 text-lg leading-none">Orang Tua</p>
          <p className="text-sm text-gray-500 font-medium mt-1">Asep Yanto Kurnawan</p>
        </div>
      </div>
    </header>
  );
}
