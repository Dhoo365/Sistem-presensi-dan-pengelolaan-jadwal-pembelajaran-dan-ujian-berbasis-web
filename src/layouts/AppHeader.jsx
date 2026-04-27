// AppHeader.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import api from "../lib/axios";

export default function AppHeader({
  isSidebarOpen,
  setIsSidebarOpen,
  openMobileSidebar,
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

      setClock(
        now.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }) + " WITA"
      );

      setDateNow(
        now.toLocaleDateString("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      );
    };

    updateTime();

    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const pageMeta = {
    "/admin": {
      title: "Beranda",
      desc: "Panel administrator",
    },
    "/admin/murid": {
      title: "Kelola Murid",
      desc: "Manajemen data siswa",
    },
    "/admin/guru": {
      title: "Kelola Guru",
      desc: "Manajemen tenaga pengajar",
    },
    "/admin/mapel": {
      title: "Kelola Mapel",
      desc: "Manajemen mata pelajaran",
    },
    "/admin/kelas": {
      title: "Kelola Kelas",
      desc: "Manajemen data kelas",
    },
    "/admin/jadwal": {
      title: "Kelola Jadwal",
      desc: "Atur jadwal pembelajaran",
    },
    "/admin/akun": {
      title: "Kelola Akun",
      desc: "Manajemen akun pengguna",
    },
  };

  const current = pageMeta[location.pathname] || {
    title: "Dashboard",
    desc: "Sistem akademik sekolah",
  };

  const nama = user?.nama || "Memuat...";
  const role = user?.role || "admin";
  const avatar = nama.charAt(0).toUpperCase();

  return (
    <header className="mb-4 md:mb-6 rounded-3xl border border-white/60 bg-gradient-to-r from-[#f5f5f5] via-[#ececec] to-[#f8f8f8] shadow-md px-4 sm:px-5 md:px-7 py-4">

      <div className="flex items-center justify-between gap-4">

        {/* LEFT */}
        <div className="flex items-center gap-3 min-w-0">

          {/* MOBILE BUTTON */}
          <button
            onClick={openMobileSidebar}
            className="w-11 h-11 rounded-2xl bg-white shadow border border-gray-200 flex items-center justify-center lg:hidden"
          >
            <Menu size={22} />
          </button>

          {/* DESKTOP BUTTON */}
          <button
            onClick={() =>
              setIsSidebarOpen(!isSidebarOpen)
            }
            className="w-11 h-11 rounded-2xl bg-white shadow border border-gray-200 hidden lg:flex items-center justify-center"
          >
            <Menu size={22} />
          </button>

          {/* TITLE */}
          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl md:text-3xl font-bold text-gray-800 truncate">
              {current.title}
            </h1>

            <p className="text-xs md:text-sm text-gray-500 truncate hidden sm:block">
              {current.desc}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          {/* DATE */}
          <div className="hidden md:block text-right">
            <p className="text-sm font-bold text-gray-700">
              {clock}
            </p>

            <p className="text-xs text-gray-500 capitalize">
              {dateNow}
            </p>
          </div>

          {/* USER */}
          <div className="flex items-center gap-2 sm:gap-3 border-l border-gray-300 pl-3 sm:pl-5">

            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gray-800 text-white font-bold flex items-center justify-center">
              {avatar}
            </div>

            <div className="hidden sm:block">
              <p className="text-[10px] uppercase text-gray-400 font-semibold">
                {role}
              </p>

              <p className="text-sm font-bold text-gray-800 max-w-[160px] truncate">
                {nama}
              </p>
            </div>

          </div>
        </div>

      </div>
    </header>
  );
}