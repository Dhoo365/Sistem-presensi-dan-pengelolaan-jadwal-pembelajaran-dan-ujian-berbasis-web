import { useState, useEffect } from "react";
import api from "../../lib/axios";
import { FaFolder, FaRegFileAlt } from "react-icons/fa";
import { formatDateManado } from "../../utils/timezone";

const defaultPelajaran = {
  Senin: [],
  Selasa: [],
  Rabu: [],
  Kamis: [],
  Jumat: [],
  Sabtu: [],
};

const LihatJadwal = () => {
  const [activeTab, setActiveTab] = useState("pelajaran");
  const [dataPelajaran, setDataPelajaran] = useState(defaultPelajaran);
  const [dataUjian, setDataUjian] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJadwal();
  }, []);

  const fetchJadwal = async () => {
    try {
      const res = await api.get("/guru/jadwal");

      if (res.data) {
        setDataPelajaran(res.data.pelajaran || defaultPelajaran);
        setDataUjian(res.data.ujian || []);
      }
    } catch (err) {
      console.error("Gagal ambil jadwal:", err);
    } finally {
      setLoading(false);
    }
  };

const formatTanggal = (tgl) => {
  if (!tgl) return "-";
  return formatDateManado(`${tgl}T12:00:00`);
};

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        {/* TAB */}
        <div className="bg-white rounded-2xl p-1.5 shadow-sm border border-gray-200 flex gap-2 w-fit">
          <button
            onClick={() => setActiveTab("pelajaran")}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition
            ${
              activeTab === "pelajaran"
                ? "bg-[#4A342B] text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FaFolder />
            Pelajaran
          </button>

          <button
            onClick={() => setActiveTab("ujian")}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition
            ${
              activeTab === "ujian"
                ? "bg-[#4A342B] text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FaRegFileAlt />
            Ujian
          </button>
        </div>
      </div>

      {/* BODY */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5">
        {loading ? (
          <div className="py-16 text-center text-gray-500">
            Memuat jadwal...
          </div>
        ) : activeTab === "pelajaran" ? (
          <>
            {/* INFO */}
            <div className="mb-5">
              <h2 className="font-semibold text-[#4A342B]">
                Jadwal Pelajaran Mingguan
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Geser ke samping untuk melihat semua hari.
              </p>
            </div>

            {/* GRID HARI */}
            <div className="flex gap-4 overflow-x-auto pb-2">
              {Object.keys(dataPelajaran).map((hari) => (
                <div
                  key={hari}
                  className="min-w-[280px] max-w-[280px] bg-[#F8F6F3] rounded-2xl border border-gray-200 p-4 flex-shrink-0"
                >
                  <div className="pb-3 border-b border-gray-200 mb-4">
                    <h3 className="font-bold text-[#4A342B]">{hari}</h3>
                  </div>

                  <div className="space-y-3">
                    {dataPelajaran[hari]?.length > 0 ? (
                      dataPelajaran[hari].map((item, idx) => (
                        <div
                          key={idx}
                          className="bg-white rounded-xl p-3 border border-gray-200 shadow-sm"
                        >
                          <p className="text-xs font-bold text-blue-600">
                            {item.jam}
                          </p>

                          <p className="text-sm font-medium text-gray-800 mt-1 leading-snug">
                            {item.mapel}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-gray-400 py-4 text-center">
                        Tidak ada jadwal
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* INFO */}
            <div className="mb-5">
              <h2 className="font-semibold text-[#4A342B]">
                Jadwal Ujian Mendatang
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Menampilkan jadwal ujian aktif berdasarkan tanggal terdekat.
              </p>
            </div>

            {/* LIST UJIAN */}
            {dataUjian.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {dataUjian.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-gray-200 bg-[#F8F6F3] p-4 hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold text-red-600 uppercase tracking-wide">
                          Ujian
                        </p>

                        <p className="text-sm font-bold text-[#4A342B] mt-1 leading-snug">
                          {formatTanggal(item.tanggal)}
                        </p>
                      </div>

                      <div className="bg-white px-3 py-1 rounded-lg text-xs font-bold text-blue-600 border border-gray-200 whitespace-nowrap">
                        {item.jam}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm font-medium text-gray-800 leading-snug">
                        {item.mapel}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center text-gray-400">
                Tidak ada jadwal ujian
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LihatJadwal;