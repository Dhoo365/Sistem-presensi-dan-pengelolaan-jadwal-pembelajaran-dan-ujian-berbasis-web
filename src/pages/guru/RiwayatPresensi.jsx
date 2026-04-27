import { useState, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";
import api from "../../lib/axios";

const LIMIT = 15;

const RiwayatPresensi = () => {
  const [tanggal, setTanggal] = useState("");
  const [kelas, setKelas] = useState("");
  const [mapel, setMapel] = useState("");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  /* DETAIL */
  const [selected, setSelected] = useState(null);
  const [detail, setDetail] = useState([]);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const [cariNama, setCariNama] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    fetchRiwayat(true);
  }, []);

  const fetchRiwayat = async (reset = false) => {
    try {
      const currentPage = reset ? 1 : page;

      if (reset) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const res = await api.get(
        `/guru/riwayat?page=${currentPage}&limit=${LIMIT}`
      );

      const rows = res.data?.data || [];

      if (reset) {
        setData(rows);
        setPage(2);
      } else {
        setData((prev) => [...prev, ...rows]);
        setPage((prev) => prev + 1);
      }

      setHasMore(Boolean(res.data?.hasMore));
    } catch (err) {
      console.error("Gagal ambil riwayat", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const fetchDetail = async (item) => {
    try {
      setLoadingDetail(true);
      setSelected(item);

      const res = await api.get(
        `/guru/riwayat/${item.tanggal}/${item.id_jadwal}`
      );

      setDetail(res.data?.detail || []);
      setCariNama("");
      setFilterStatus("");
    } catch (err) {
      console.error("Gagal ambil detail", err);
      setDetail([]);
    } finally {
      setLoadingDetail(false);
    }
  };

  const listKelas = [...new Set(data.map((d) => d.kelas))];
  const listMapel = [...new Set(data.map((d) => d.mapel))];

  const getStatusStyle = (status) => {
    switch (status) {
      case "sudah":
        return "bg-green-100 text-green-700";
      case "belum":
        return "bg-yellow-100 text-yellow-700";
      case "tidak":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "sudah":
        return "Sudah Presensi";
      case "belum":
        return "Belum Presensi";
      case "tidak":
        return "Tidak Ada Presensi";
      default:
        return status;
    }
  };

  const getBadgeDetail = (status) => {
    const s = status?.toLowerCase();

    if (s === "hadir") return "bg-green-100 text-green-700";
    if (s === "izin") return "bg-yellow-100 text-yellow-700";
    if (s === "sakit") return "bg-blue-100 text-blue-700";

    return "bg-red-100 text-red-700";
  };

  const filtered = data.filter((d) => {
    return (
      (!tanggal || d.tanggal === tanggal) &&
      (!kelas || d.kelas === kelas) &&
      (!mapel || d.mapel === mapel)
    );
  });

  const filteredDetail = detail.filter((d) => {
    return (
      (!cariNama ||
        d.nama.toLowerCase().includes(cariNama.toLowerCase())) &&
      (!filterStatus ||
        d.status.toLowerCase() === filterStatus.toLowerCase())
    );
  });

  const total = detail.length;
  const hadir = detail.filter(
    (x) => x.status.toLowerCase() === "hadir"
  ).length;

  const izin = detail.filter(
    (x) => x.status.toLowerCase() === "izin"
  ).length;

  const sakit = detail.filter(
    (x) => x.status.toLowerCase() === "sakit"
  ).length;

  const alpha = detail.filter((x) => {
    const s = x.status.toLowerCase();
    return s === "alpha" || s === "alfa";
  }).length;

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      {/* FILTER */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sticky top-0 z-10">
        <div className="flex flex-wrap gap-3">
          <input
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-xl"
          />

          <select
            value={kelas}
            onChange={(e) => setKelas(e.target.value)}
            className="bg-[#6b4226] text-white px-4 py-2 rounded-xl"
          >
            <option value="">Semua Kelas</option>
            {listKelas.map((k, i) => (
              <option key={i} value={k}>
                {k}
              </option>
            ))}
          </select>

          <select
            value={mapel}
            onChange={(e) => setMapel(e.target.value)}
            className="bg-[#6b4226] text-white px-4 py-2 rounded-xl"
          >
            <option value="">Semua Mapel</option>
            {listMapel.map((m, i) => (
              <option key={i} value={m}>
                {m}
              </option>
            ))}
          </select>

          <button
            onClick={() => fetchRiwayat(true)}
            className="px-4 py-2 rounded-xl border border-gray-300 bg-white"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* LIST */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
        <div className="flex items-center justify-between gap-3 mb-4">
          <h2 className="font-semibold text-lg text-gray-800">
            Daftar Presensi
          </h2>

          <p className="text-sm text-gray-500">
            {filtered.length} data tampil
          </p>
        </div>

        <div className="space-y-3">
          {loading ? (
            <p className="text-sm text-gray-500">
              Memuat riwayat...
            </p>
          ) : filtered.length === 0 ? (
            <p className="text-sm text-gray-500">
              Tidak ada riwayat presensi.
            </p>
          ) : (
            filtered.map((item, i) => {
              const aktif =
                selected &&
                selected.tanggal === item.tanggal &&
                selected.id_jadwal === item.id_jadwal;

              return (
                <div
                  key={`${item.id_jadwal}-${item.tanggal}-${i}`}
                  onClick={() => fetchDetail(item)}
                  className={`rounded-2xl border p-4 cursor-pointer transition-all duration-200 flex items-center justify-between gap-4 hover:shadow-md hover:-translate-y-[1px] ${
                    aktif
                      ? "bg-[#6b4226]/[0.03] border-[#6b4226]/30 ring-1 ring-[#6b4226]/40"
                      : "bg-white border-gray-200"
                  }`}
                >
                  {/* kiri */}
                  <div className="w-[90px] shrink-0">
                    <p className="text-sm font-semibold text-gray-700">
                      {item.hari}
                    </p>

                    <p className="text-2xl font-bold text-gray-900 mt-1 leading-none">
                      {item.tanggal.split("-")[2]}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      {item.tanggal}
                    </p>
                  </div>

                  {/* tengah */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 truncate">
                      {item.kelas} - {item.mapel}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      {item.jam}
                    </p>
                  </div>

                  {/* kanan */}
                  <div className="text-right shrink-0">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                        item.status
                      )}`}
                    >
                      {getStatusText(item.status)}
                    </span>

                    <p className="text-xs text-gray-500 mt-2 whitespace-pre-line">
                      {item.info}
                    </p>
                  </div>

                  <FaChevronRight className="text-gray-400 shrink-0" />
                </div>
              );
            })
          )}
        </div>

        {/* LOAD MORE */}
        {!loading && hasMore && (
          <div className="pt-4">
            <button
              onClick={() => fetchRiwayat(false)}
              disabled={loadingMore}
              className="w-full bg-[#6b4226] text-white py-3 rounded-xl hover:opacity-90 transition disabled:opacity-60"
            >
              {loadingMore ? "Memuat..." : "Load More"}
            </button>
          </div>
        )}
      </div>

      {/* DETAIL */}
      {selected && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-5">
          {/* header */}
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Detail Presensi
            </h2>

            <p className="text-sm text-gray-700 mt-1">
              {selected.kelas} - {selected.mapel}
            </p>

            <p className="text-sm text-gray-500">
              {selected.hari}, {selected.tanggal} •{" "}
              {selected.jam}
            </p>
          </div>

          {/* statistik */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <Card title="Total" value={total} color="gray" />
            <Card title="Hadir" value={hadir} color="green" />
            <Card title="Izin" value={izin} color="yellow" />
            <Card title="Sakit" value={sakit} color="blue" />
            <Card title="Alpha" value={alpha} color="red" />
          </div>

          {/* filter detail */}
          <div className="flex flex-wrap gap-3">
            <input
              type="text"
              placeholder="Cari nama siswa..."
              value={cariNama}
              onChange={(e) => setCariNama(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-xl w-full md:w-[300px]"
            />

            <select
              value={filterStatus}
              onChange={(e) =>
                setFilterStatus(e.target.value)
              }
              className="border border-gray-300 px-4 py-2 rounded-xl"
            >
              <option value="">Semua Status</option>
              <option value="hadir">Hadir</option>
              <option value="izin">Izin</option>
              <option value="sakit">Sakit</option>
              <option value="alpha">Alpha</option>
            </select>
          </div>

          {/* table */}
          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-left">No</th>
                  <th className="p-3 text-left">NIS</th>
                  <th className="p-3 text-left">Nama</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {loadingDetail ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="p-5 text-center text-gray-500"
                    >
                      Memuat detail...
                    </td>
                  </tr>
                ) : filteredDetail.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="p-5 text-center text-gray-500"
                    >
                      Data tidak ditemukan.
                    </td>
                  </tr>
                ) : (
                  filteredDetail.map((item, i) => (
                    <tr
                      key={`${item.nis}-${i}`}
                      className="border-t border-gray-100 hover:bg-gray-50"
                    >
                      <td className="p-3">{i + 1}</td>
                      <td className="p-3">{item.nis}</td>
                      <td className="p-3 font-medium text-gray-800">
                        {item.nama}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getBadgeDetail(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

function Card({ title, value, color }) {
  const styles = {
    gray: "bg-gray-50 text-gray-800",
    green: "bg-green-50 text-green-700",
    yellow: "bg-yellow-50 text-yellow-700",
    blue: "bg-blue-50 text-blue-700",
    red: "bg-red-50 text-red-700",
  };

  return (
    <div
      className={`rounded-2xl p-4 text-center border border-gray-100 ${styles[color]}`}
    >
      <p className="text-xs opacity-70">{title}</p>
      <p className="text-2xl font-bold mt-1">
        {value}
      </p>
    </div>
  );
}

export default RiwayatPresensi;