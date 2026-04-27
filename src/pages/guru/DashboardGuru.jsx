import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaClock,
  FaCalendarAlt,
  FaBook,
} from "react-icons/fa";
import api from "../../lib/axios";
import { todayManado } from "../../utils/timezone";



const DashboardGuru = () => {
  const navigate = useNavigate();

  const [jadwalHariIni, setJadwalHariIni] = useState([]);
  const [jadwalBesok, setJadwalBesok] = useState([]);

  const [stats, setStats] = useState({
    totalSiswa: 0,
    totalMengajar: 0,
    sudahPresensi: 0,
    belumPresensi: 0,
  });

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/guru/dashboard");

      setJadwalHariIni(
        res.data.jadwalHariIni || []
      );

      setJadwalBesok(
        res.data.jadwalBesok || []
      );

      setStats({
        totalSiswa:
          res.data.totalSiswa || 0,
        totalMengajar:
          res.data.totalMengajar || 0,
        sudahPresensi:
          res.data.sudahPresensi || 0,
        belumPresensi:
          res.data.belumPresensi || 0,
      });
    } catch (error) {
      console.error(
        "Gagal mendapatkan data dashboard",
        error
      );
    }
  };

  const getStatus = (status) => {
    if (status === "sudah") {
      return (
        <span className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
          Sudah Presensi
          <FaCheckCircle />
        </span>
      );
    }

    return (
      <span className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
        Belum Presensi
        <FaClock />
      </span>
    );
  };

const handleOpenPresensi = (item) => {
  navigate("/guru/presensi", {
    state: {
      autoSelect: item,
      tanggal: todayManado(),
    },
  });
};

  useEffect(() => {
  fetchDashboard();
}, []);


  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">

      {/* SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">
              Total Mengajar Hari ini
            </p>
            <h2 className="text-xl font-bold">
              {stats.totalMengajar} Kelas
            </h2>
          </div>

          <FaBook className="text-2xl text-gray-400" />
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">
              Total Siswa
            </p>
            <h2 className="text-xl font-bold">
              {stats.totalSiswa}
            </h2>
          </div>
        </div>

        <div className="bg-green-200 p-4 rounded-xl shadow flex items-center justify-between">
          <div>
            <p className="text-sm">
              Sudah Presensi
            </p>
            <h2 className="text-xl font-bold">
              {stats.sudahPresensi}
            </h2>
          </div>

          <FaCheckCircle />
        </div>

        <div className="bg-yellow-300 p-4 rounded-xl shadow flex items-center justify-between">
          <div>
            <p className="text-sm">
              Belum Presensi
            </p>
            <h2 className="text-xl font-bold">
              {stats.belumPresensi}
            </h2>
          </div>

          <FaClock />
        </div>
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2 bg-gray-200 rounded-xl shadow p-5">

          <h2 className="font-semibold text-lg mb-4">
            Jadwal Hari Ini
          </h2>

          <div className="space-y-4">
            {jadwalHariIni.length > 0 ? (
              jadwalHariIni.map(
                (item, i) => (
                  <div
                    key={i}
                    onClick={() =>
                      handleOpenPresensi(
                        item
                      )
                    }
                    className="bg-white rounded-xl shadow p-4 flex justify-between items-center cursor-pointer hover:shadow-lg hover:-translate-y-1 transition"
                  >
                    <div>
                      <p className="font-bold">
                        {item.jam}
                      </p>

                      <p className="text-gray-600">
                        {item.kelas}
                      </p>
                    </div>

                    {getStatus(
                      item.status
                    )}
                  </div>
                )
              )
            ) : (
              <p className="text-gray-500 text-sm">
                Tidak ada jadwal
                hari ini.
              </p>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white rounded-xl shadow p-5">

          <div className="flex items-center gap-2 mb-4">
            <FaCalendarAlt />
            <h2 className="font-semibold">
              Jadwal Besok
            </h2>
          </div>

          <p className="text-sm text-gray-500 mb-4">
            {jadwalBesok.length} Kelas
          </p>

          <div className="space-y-4">
            {jadwalBesok.length > 0 ? (
              jadwalBesok.map(
                (item, i) => (
                  <div
                    key={i}
                    className="bg-gray-100 rounded-xl p-4 shadow"
                  >
                    <p className="font-semibold">
                      {item.jam}
                    </p>

                    <p className="text-gray-600">
                      {item.kelas}
                    </p>
                  </div>
                )
              )
            ) : (
              <p className="text-gray-500 text-sm">
                Tidak ada jadwal
                besok.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardGuru;