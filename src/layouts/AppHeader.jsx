import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import api from "../lib/axios";

export default function AppHeader({
  isSidebarOpen,
  setIsSidebarOpen
}) {
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [clock, setClock] = useState("");
  const [dateNow, setDateNow] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data } = await api.get("/auth/me");
        setUser(data.user);
      } catch (err) {
        console.log(err);
      }
    };

    loadUser();
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const jam = now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit"
      });

      const tanggal = now.toLocaleDateString(
        "id-ID",
        {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric"
        }
      );

      setClock(jam + " WITA");
      setDateNow(tanggal);
    };

    updateTime();

    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  const pageMeta = {
    "/admin": {
      title: "Beranda",
      desc: "Selamat datang di panel administrator"
    },
    "/admin/murid": {
      title: "Kelola Murid",
      desc: "Manajemen data siswa dan siswi"
    },
    "/admin/guru": {
      title: "Kelola Guru",
      desc: "Manajemen tenaga pengajar"
    },
    "/admin/akun": {
      title: "Kelola Akun",
      desc: "Manajemen hak akses pengguna"
    },

    "/ortu": {
      title: "Beranda",
      desc: "Panel orang tua"
    },
    "/ortu/lihat-presensi": {
      title: "Lihat Presensi",
      desc: "Pantau kehadiran anak"
    },
    "/ortu/lihat-jadwal": {
      title: "Lihat Jadwal",
      desc: "Jadwal pembelajaran anak"
    },

    "/guru": {
      title: "Beranda",
      desc: "Panel guru"
    }
  };

  const current =
    pageMeta[location.pathname] || {
      title: "Dashboard",
      desc: "Sistem akademik sekolah"
    };

  const roleMap = {
    admin: "Administrator",
    guru: "Guru",
    orangtua: "Orang Tua"
  };

  const nama = user?.nama || "Memuat...";
  const role = roleMap[user?.role] || "Pengguna";

  const avatar =
    nama.charAt(0).toUpperCase();

  return (
    <header className="mb-8 rounded-3xl border border-white/60 bg-gradient-to-r from-[#f5f5f5] via-[#ececec] to-[#f8f8f8] shadow-md px-7 py-5 flex justify-between items-center">

      {/* LEFT */}
      <div className="flex items-center gap-5">
        <button
          onClick={() =>
            setIsSidebarOpen(!isSidebarOpen)
          }
          className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-200 flex items-center justify-center hover:scale-105 transition"
        >
          <Menu
            size={24}
            className="text-gray-700"
          />
        </button>

        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            {current.title}
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            {current.desc}
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">

        {/* DATE TIME */}
        <div className="hidden md:block text-right">
          <p className="text-sm font-bold text-gray-700">
            {clock}
          </p>

          <p className="text-xs text-gray-500 mt-1 capitalize">
            {dateNow}
          </p>
        </div>

        {/* USER */}
        <div className="flex items-center gap-3 border-l border-gray-300 pl-5">
          <div className="w-12 h-12 rounded-2xl bg-gray-800 text-white font-bold text-lg flex items-center justify-center shadow">
            {avatar}
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              {role}
            </p>

            <p className="text-base font-bold text-gray-800 leading-tight">
              {nama}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}