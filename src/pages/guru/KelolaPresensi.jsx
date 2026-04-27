import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../../lib/axios";
import { todayManado } from "../../utils/timezone";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
  FaMinusCircle,
  FaSearch,
} from "react-icons/fa";

const KelolaPresensi = () => {
  const location = useLocation();

  const [search, setSearch] = useState("");
  const [jadwal, setJadwal] = useState([]);
  const [tertunda, setTertunda] = useState([]);

  const [selectedJadwal, setSelectedJadwal] =
    useState(null);

  const [dataSiswa, setDataSiswa] = useState([]);
  const [loadingSiswa, setLoadingSiswa] =
    useState(false);

  const [autoDone, setAutoDone] =
    useState(false);

const defaultTanggal =
  location.state?.tanggal ||
  todayManado();

  const [tanggal, setTanggal] =
    useState(defaultTanggal);

  /* =========================
     INIT
  ========================= */
  useEffect(() => {
    fetchTertunda();
  }, []);

  useEffect(() => {
    fetchJadwal();
  }, [tanggal]);

  /* =========================
     API
  ========================= */
  const fetchTertunda = async () => {
    try {
      const res = await api.get(
        "/guru/presensi-tertunda"
      );

      setTertunda(res.data || []);
    } catch (err) {
      console.error(
        "Gagal ambil tertunda",
        err
      );
    }
  };

  const fetchJadwal = async () => {
    try {
      const res = await api.get(
        `/guru/kelas-ajar?tanggal=${tanggal}`
      );

      setJadwal(res.data || []);
      setSelectedJadwal(null);
      setDataSiswa([]);
    } catch (err) {
      console.error(
        "Gagal ambil jadwal",
        err
      );
    }
  };

  /* =========================
     AUTO PILIH DARI BERANDA
  ========================= */
useEffect(() => {
  const autoOpen = async () => {
    if (!jadwal.length) return;
    if (autoDone) return;

    const targetId =
      location.state?.autoSelect?.id_jadwal;

    if (!targetId) return;

    const found = jadwal.find(
      (j) =>
        String(j.id_jadwal) === String(targetId)
    );

    if (!found) return;

    await handleAbsenSekarang(found);
    setAutoDone(true);
  };

  autoOpen();
}, [jadwal]);

  /* =========================
     LOAD SISWA
  ========================= */
  const handleAbsenSekarang =
    async (j) => {
      setSelectedJadwal(j);
      setLoadingSiswa(true);

      try {
        const res = await api.get(
          `/guru/siswa-kelas/${j.id_jadwal}?tanggal=${tanggal}`
        );

        setDataSiswa(res.data || []);
      } catch (err) {
        console.error(
          "Gagal ambil siswa",
          err
        );
      } finally {
        setLoadingSiswa(false);
      }
    };

  const bukaTertunda = (j) => {
    setTanggal(j.tanggal);
    setAutoDone(true);

    setTimeout(() => {
      handleAbsenSekarang(j);
    }, 400);
  };

  /* =========================
     SIMPAN
  ========================= */
  const simpanPresensi =
    async () => {
      if (
        !selectedJadwal ||
        dataSiswa.length === 0
      ) {
        return alert(
          "Pilih jadwal dulu."
        );
      }

      try {
        await api.post(
          "/guru/presensi",
          {
            tanggal,
            id_jadwal:
              selectedJadwal.id_jadwal,
            kelas_id:
              selectedJadwal.kelas_id,
            id_mapel:
              selectedJadwal.id_mapel,
            presensi: dataSiswa,
          }
        );

        alert(
          "Presensi berhasil disimpan."
        );

        fetchJadwal();
        fetchTertunda();
      } catch (err) {
        console.error(
          "Gagal simpan",
          err
        );

        alert(
          "Gagal menyimpan presensi."
        );
      }
    };

  /* =========================
     UTIL
  ========================= */
  const filtered =
    dataSiswa.filter((s) =>
      s.nama
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  const updateStatus = (
    index,
    value
  ) => {
    const temp = [...dataSiswa];
    temp[index].status = value;
    setDataSiswa(temp);
  };

  const countStatus = (type) =>
    dataSiswa.filter(
      (x) => x.status === type
    ).length;

  const getStatusColor = (
    status
  ) => {
    switch (status) {
      case "Hadir":
        return "bg-green-100 text-green-700";
      case "Izin":
        return "bg-yellow-100 text-yellow-700";
      case "Sakit":
        return "bg-red-100 text-red-700";
      case "Alpha":
        return "bg-gray-200 text-gray-700";
      default:
        return "";
    }
  };

  const badgeJadwal = (status) => {
    if (status === "sudah") {
      return (
        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
          Sudah
        </span>
      );
    }

    if (status === "terlambat") {
      return (
        <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">
          Terlambat
        </span>
      );
    }

    return (
      <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
        Belum
      </span>
    );
  };

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">

      {/* TERTUNDA */}
      {tertunda.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">

          <h2 className="font-semibold text-red-700 mb-3">
            Presensi Tertunda ({tertunda.length})
          </h2>

          <div className="space-y-3">
            {tertunda.map((j, i) => (
              <div
                key={i}
                className="bg-white rounded-lg p-3 border flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">
                    {j.tanggal}
                  </p>

                  <p className="text-sm text-gray-500">
                    {j.waktu} • {j.kelas}
                  </p>
                </div>

                <button
                  onClick={() =>
                    bukaTertunda(j)
                  }
                  className="px-4 py-2 bg-red-600 text-white rounded-lg"
                >
                  Isi Sekarang
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TANGGAL */}
      <div>
        <label className="block mb-2 font-semibold">
          Tanggal
        </label>

        <input
          type="date"
          value={tanggal}
          onChange={(e) => {
            setTanggal(
              e.target.value
            );
            setAutoDone(false);
          }}
          className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm"
        />
      </div>

      {/* JADWAL */}
      <div className="overflow-x-auto">
        <div className="flex gap-4 min-w-max pb-2">

          {jadwal.length === 0 && (
            <p className="text-gray-500 text-sm">
              Tidak ada jadwal
              mengajar di tanggal ini.
            </p>
          )}

          {jadwal.map((j, i) => (
            <div
              key={i}
              className={`min-w-[270px] bg-white rounded-xl shadow border p-4 ${
                selectedJadwal?.id_jadwal ===
                j.id_jadwal
                  ? "border-[#5b3a29] ring-2 ring-[#5b3a29]"
                  : "border-gray-200"
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold">
                  {j.waktu}
                </p>

                {badgeJadwal(
                  j.status_presensi
                )}
              </div>

              <p className="text-sm text-gray-500 mb-3">
                {j.kelas}
              </p>

              <button
                onClick={() =>
                  handleAbsenSekarang(
                    j
                  )
                }
                className="w-full border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition"
              >
                {j.status_presensi ===
                "sudah"
                  ? "Edit Presensi"
                  : "Absen Sekarang"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SEARCH */}
      <div className="relative w-full max-w-md">
        <FaSearch className="absolute left-3 top-3 text-gray-400" />

        <input
          type="text"
          placeholder="Cari nama siswa..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <div className="max-h-[350px] overflow-y-auto">

          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#5b3a29] text-white">
                <th className="p-3 text-left">No</th>
                <th className="p-3 text-left">Nama Siswa</th>
                <th className="p-3 text-left">Kelas</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {loadingSiswa ? (
                <tr>
                  <td
                    colSpan="4"
                    className="p-4 text-center"
                  >
                    Memuat data siswa...
                  </td>
                </tr>
              ) : filtered.length > 0 ? (
                filtered.map((s, i) => (
                  <tr
                    key={i}
                    className="border-t"
                  >
                    <td className="p-3">
                      {i + 1}
                    </td>

                    <td className="p-3 font-medium">
                      {s.nama}
                    </td>

                    <td className="p-3">
                      {s.kelas}
                    </td>

                    <td className="p-3">
                      <select
                        value={s.status}
                        onChange={(e) =>
                          updateStatus(
                            i,
                            e.target.value
                          )
                        }
                        className={`px-3 py-1 rounded-md text-xs font-semibold ${getStatusColor(
                          s.status
                        )}`}
                      >
                        <option value="Hadir">Hadir</option>
                        <option value="Izin">Izin</option>
                        <option value="Sakit">Sakit</option>
                        <option value="Alpha">Alpha</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="p-4 text-center text-gray-500"
                  >
                    Pilih jadwal untuk melihat daftar siswa.
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>

      {/* ACTION */}
      <div className="flex flex-wrap items-center gap-4">

        <button
          onClick={simpanPresensi}
          disabled={
            !selectedJadwal ||
            dataSiswa.length === 0
          }
          className={`px-6 py-2 rounded-lg text-white ${
            !selectedJadwal ||
            dataSiswa.length === 0
              ? "bg-gray-400"
              : "bg-[#6b4226]"
          }`}
        >
          Simpan Perubahan
        </button>

        <div className="flex gap-3 flex-wrap">

          <div className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <FaCheckCircle />
            {countStatus("Hadir")} Hadir
          </div>

          <div className="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <FaExclamationCircle />
            {countStatus("Izin")} Izin
          </div>

          <div className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <FaTimesCircle />
            {countStatus("Sakit")} Sakit
          </div>

          <div className="bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <FaMinusCircle />
            {countStatus("Alpha")} Alpha
          </div>

        </div>
      </div>
    </div>
  );
};

export default KelolaPresensi;