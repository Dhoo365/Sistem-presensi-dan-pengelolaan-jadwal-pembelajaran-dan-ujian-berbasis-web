import { useState, useEffect } from "react";
import {
  User,
  BookOpen,
  FileText,
  Clock3,
  ChevronRight,
} from "lucide-react";
import api from "../../lib/axios";

const hariList = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

const JadwalOrtu = () => {
  const [tab, setTab] = useState("pelajaran");
  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState(null);

  const [jadwal, setJadwal] = useState({
    pelajaran: {},
    ujian: {},
  });

  const [loading, setLoading] = useState(true);

  /* ================= LOAD ANAK ================= */
  const loadAnak = async () => {
    try {
      const res = await api.get("/ortu/anak");
      const data = res.data || [];

      setStudents(data);

      if (data.length > 0) {
        setSelected(data[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= LOAD JADWAL ================= */
const loadJadwal = async (nis) => {
  try {
    setLoading(true);

    const res = await api.get(`/ortu/jadwal/${nis}`);

    console.log("DATA JADWAL:");
    console.log(res.data);

    setTimeout(() => {
      setJadwal(
        res.data || {
          pelajaran: {},
          ujian: {},
        }
      );

      setLoading(false);
    }, 350);

  } catch (err) {
    console.log("ERROR JADWAL:");
    console.log(err);

    setJadwal({
      pelajaran: {},
      ujian: {},
    });

    setLoading(false);
  }
};

  useEffect(() => {
    loadAnak();
  }, []);

  useEffect(() => {
    if (selected?.nis) {
      loadJadwal(selected.nis);
    }
  }, [selected]);

  const data =
    tab === "pelajaran"
      ? jadwal.pelajaran
      : jadwal.ujian;

  return (
    <div className="space-y-6">

      {/* ================= PILIH ANAK ================= */}
      <div className="overflow-x-auto pb-1">
        <div className="flex gap-4 min-w-max">

          {students.map((s, i) => (
            <button
              key={i}
              onClick={() => setSelected(s)}
              className={`
                min-w-[240px] rounded-2xl border p-4 text-left
                transition-all duration-200 shadow-sm
                ${
                  selected?.nis === s.nis
                    ? "bg-white border-[#5A3E36] ring-2 ring-[#E8DDD8]"
                    : "bg-white border-gray-200 hover:border-gray-300"
                }
              `}
            >
              <div className="flex items-center gap-3">

                <div
                  className={`
                    w-11 h-11 rounded-xl flex items-center justify-center
                    ${
                      selected?.nis === s.nis
                        ? "bg-[#EEE7E4]"
                        : "bg-gray-100"
                    }
                  `}
                >
                  <User className="w-5 h-5 text-[#5A3E36]" />
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-gray-800">
                    {s.nama}
                  </p>

                  <p className="text-sm text-gray-500">
                    {s.kelas}
                  </p>
                </div>

                <ChevronRight className="w-4 h-4 text-gray-400" />

              </div>
            </button>
          ))}

        </div>
      </div>

      {/* ================= TAB ================= */}
      <div className="flex gap-3">

        <button
          onClick={() => setTab("pelajaran")}
          className={`
            px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition
            ${
              tab === "pelajaran"
                ? "bg-green-100 text-green-700 border border-green-200"
                : "bg-white text-gray-600 border border-gray-200"
            }
          `}
        >
          <BookOpen className="w-4 h-4" />
          Pelajaran
        </button>

        <button
          onClick={() => setTab("ujian")}
          className={`
            px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition
            ${
              tab === "ujian"
                ? "bg-red-100 text-red-700 border border-red-200"
                : "bg-white text-gray-600 border border-gray-200"
            }
          `}
        >
          <FileText className="w-4 h-4" />
          Ujian
        </button>

      </div>

      {/* ================= CONTAINER ================= */}
      <div className="bg-gray-200 rounded-2xl shadow-inner p-4">

        <div className="flex gap-4 overflow-x-auto pb-2">

          {hariList.map((hari) => {
            const items = data?.[hari] || [];

            return (
              <div
                key={hari}
                className="min-w-[285px] bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex-shrink-0"
              >
                {/* HEADER */}
                <div className="mb-4 pb-3 border-b border-gray-100">
                  <div className="flex justify-between items-center">

                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {hari}
                      </h3>

                      <p className="text-xs text-gray-500">
                        {items.length} Jadwal
                      </p>
                    </div>

                    <div className="w-9 h-9 rounded-xl bg-[#EEE7E4] flex items-center justify-center">
                      <Clock3 className="w-4 h-4 text-[#5A3E36]" />
                    </div>

                  </div>
                </div>

                {/* CONTENT */}
                <div className="space-y-3">

                  {loading ? (
                    <>
                      <div className="h-20 rounded-xl bg-gray-100 animate-pulse"></div>
                      <div className="h-20 rounded-xl bg-gray-100 animate-pulse"></div>
                    </>
                  ) : items.length > 0 ? (
                    items.map((item, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl bg-gray-50 border border-gray-100 p-3 hover:bg-gray-100 transition"
                      >
                        <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-100 text-blue-700 text-xs font-semibold">
                          <Clock3 className="w-3 h-3" />
                          {item.jam}
                        </div>

                        <p className="mt-2 font-semibold text-sm text-gray-800">
                          {item.mapel}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          {item.guru}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-xl bg-gray-50 border border-dashed border-gray-200 p-4 text-center">
                      <p className="text-sm text-gray-400">
                        Tidak ada jadwal
                      </p>
                    </div>
                  )}

                </div>
              </div>
            );
          })}

        </div>
      </div>

    </div>
  );
};

export default JadwalOrtu;