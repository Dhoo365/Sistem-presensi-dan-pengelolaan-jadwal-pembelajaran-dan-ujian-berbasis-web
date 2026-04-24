import { useEffect, useState } from "react";
import {
  User,
  ChevronRight,
} from "lucide-react";

import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaUser,
} from "react-icons/fa";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
  LabelList
} from "recharts";

import api from "../../lib/axios";

const LihatPresensi = () => {
  const [students, setStudents] = useState([]);
  const [selectedAnak, setSelectedAnak] = useState(null);

  const [stats, setStats] = useState({
    hadir: 0,
    izin: 0,
    sakit: 0,
    alpha: 0,
    total: 0,
  });

  const [tableData, setTableData] = useState([]);
  const [chartData, setChartData] = useState([]);

  const [loading, setLoading] = useState(false);

  const [bulan, setBulan] = useState("");
  const [tahun, setTahun] = useState("");
  const [semester, setSemester] = useState("");
  const [hari, setHari] = useState("");

  /* ================= LOAD ANAK ================= */
  const loadAnak = async () => {
    try {
      const res = await api.get("/ortu/anak");
      const data = res.data || [];

      setStudents(data);

      if (data.length > 0) {
        setSelectedAnak(data[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= LOAD PRESENSI ================= */
  const loadPresensi = async (nis) => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      if (bulan) params.append("bulan", bulan);
      if (tahun) params.append("tahun", tahun);
      if (semester) params.append("semester", semester);
      if (hari) params.append("hari", hari);

      const res = await api.get(
        `/ortu/presensi/${nis}?${params.toString()}`
      );

      setStats(
        res.data?.stats || {
          hadir: 0,
          izin: 0,
          sakit: 0,
          alpha: 0,
          total: 0,
        }
      );

      setTableData(res.data?.riwayat || []);
      setChartData(res.data?.chartData || []);

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnak();
  }, []);

  useEffect(() => {
    if (selectedAnak?.nis) {
      loadPresensi(selectedAnak.nis);
    }
  }, [selectedAnak, bulan, tahun, semester, hari]);

  const statCards = [
    {
      title: "Hadir",
      value: stats.hadir,
      color: "bg-green-500",
      icon: <FaCheckCircle />,
    },
    {
      title: "Izin",
      value: stats.izin,
      color: "bg-yellow-400",
      icon: <FaClock />,
    },
    {
      title: "Sakit",
      value: stats.sakit,
      color: "bg-red-500",
      icon: <FaTimesCircle />,
    },
    {
      title: "Alpha",
      value: stats.alpha,
      color: "bg-gray-500",
      icon: <FaUser />,
    },
  ];

  return (
    <div className="space-y-6">

      {/* ================= PILIH ANAK ================= */}
      <div className="overflow-x-auto pb-1">
        <div className="flex gap-4 min-w-max">

          {students.map((s, i) => (
            <button
              key={i}
              onClick={() => setSelectedAnak(s)}
              className={`
                min-w-[240px] rounded-2xl border p-4 text-left
                transition-all duration-200 shadow-sm
                ${
                  selectedAnak?.nis === s.nis
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
                      selectedAnak?.nis === s.nis
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

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {statCards.map((s, i) => (
          <div
            key={i}
            className={`
              ${s.color}
              text-white rounded-2xl p-5 shadow-sm
              flex items-center justify-between
            `}
          >
            <div>
              <p className="text-sm opacity-90">
                {s.title}
              </p>

              <p className="text-2xl font-bold">
                {s.value}
              </p>
            </div>

            <div className="text-2xl opacity-90">
              {s.icon}
            </div>
          </div>
        ))}

      </div>

      {/* ================= CONTENT ================= */}
      {/* ================= FILTER ================= */}
<div className="bg-white rounded-2xl shadow-sm p-4">
  <div className="grid grid-cols-1 md:grid-cols-5 gap-3">

    {/* BULAN */}
    <select
      value={bulan}
      onChange={(e) => setBulan(e.target.value)}
      className="border rounded-xl px-4 py-2 bg-white"
    >
      <option value="">Semua Bulan</option>
      <option value="1">Januari</option>
      <option value="2">Februari</option>
      <option value="3">Maret</option>
      <option value="4">April</option>
      <option value="5">Mei</option>
      <option value="6">Juni</option>
      <option value="7">Juli</option>
      <option value="8">Agustus</option>
      <option value="9">September</option>
      <option value="10">Oktober</option>
      <option value="11">November</option>
      <option value="12">Desember</option>
    </select>

    {/* TAHUN */}
    <select
      value={tahun}
      onChange={(e) => setTahun(e.target.value)}
      className="border rounded-xl px-4 py-2 bg-white"
    >
      <option value="">Semua Tahun</option>
      <option value="2025">2025</option>
      <option value="2026">2026</option>
      <option value="2027">2027</option>
    </select>

    {/* SEMESTER */}
    <select
      value={semester}
      onChange={(e) => setSemester(e.target.value)}
      className="border rounded-xl px-4 py-2 bg-white"
    >
      <option value="">Semua Semester</option>
      <option value="ganjil">Ganjil</option>
      <option value="genap">Genap</option>
    </select>

    {/* HARI */}
    <select
      value={hari}
      onChange={(e) => setHari(e.target.value)}
      className="border rounded-xl px-4 py-2 bg-white"
    >
      <option value="">Semua Hari</option>
      <option value="Senin">Senin</option>
      <option value="Selasa">Selasa</option>
      <option value="Rabu">Rabu</option>
      <option value="Kamis">Kamis</option>
      <option value="Jumat">Jumat</option>
    </select>

    {/* RESET */}
    <button
      onClick={() => {
        setBulan("");
        setTahun("");
        setSemester("");
        setHari("");
      }}
      className="rounded-xl bg-[#5A3E36] text-white px-4 py-2"
    >
      Reset Filter
    </button>

  </div>
</div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ================= TABLE ================= */}
        <div className="bg-white rounded-2xl shadow-sm p-5">

          <h2 className="font-semibold text-gray-700 mb-4">
            Riwayat Presensi
          </h2>

          {loading ? (
            <div className="space-y-3">
              <div className="h-12 bg-gray-100 rounded-xl animate-pulse"></div>
              <div className="h-12 bg-gray-100 rounded-xl animate-pulse"></div>
              <div className="h-12 bg-gray-100 rounded-xl animate-pulse"></div>
            </div>
          ) : tableData.length > 0 ? (
            <div className="overflow-x-auto">

              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="pb-3">Tanggal</th>
                    <th>Hari</th>
                    <th>Jam</th>
                    <th>Mata Pelajaran</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {tableData.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b last:border-none"
                    >
                      <td className="py-3">
                        {row.tanggal}
                      </td>

                      <td>{row.hari}</td>

                      <td>{row.jam}</td>

                      <td>{row.mapel}</td>

                      <td>
                        <span
                          className={`
                            px-2 py-1 rounded-full text-xs font-medium text-white
                            ${
                              row.status?.toLowerCase() === "hadir"
                                ? "bg-green-500"
                                : row.status?.toLowerCase() === "izin"
                                ? "bg-yellow-500"
                                : row.status?.toLowerCase() === "sakit"
                                ? "bg-red-500"
                                : "bg-gray-500"
                            }
                          `}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          ) : (
            <div className="text-sm text-gray-400">
              Belum ada data presensi
            </div>
          )}
        </div>

        {/* ================= CHART ================= */}
<div className="bg-white rounded-2xl shadow-sm p-5">

  <div className="flex items-center justify-between mb-4">
    <h2 className="font-semibold text-gray-700">
      Statistik Presensi
    </h2>

    {/* legend */}
    <div className="flex flex-wrap gap-3 text-xs text-gray-500">
      <div className="flex items-center gap-1">
        <span className="w-3 h-3 rounded-sm bg-green-500"></span>
        Hadir
      </div>

      <div className="flex items-center gap-1">
        <span className="w-3 h-3 rounded-sm bg-yellow-400"></span>
        Izin
      </div>

      <div className="flex items-center gap-1">
        <span className="w-3 h-3 rounded-sm bg-red-500"></span>
        Sakit
      </div>

      <div className="flex items-center gap-1">
        <span className="w-3 h-3 rounded-sm bg-gray-500"></span>
        Alpha
      </div>
    </div>
  </div>

  {loading ? (
    <div className="h-72 bg-gray-100 rounded-xl animate-pulse"></div>
  ) : (
    <div className="w-full h-72">
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 10,
            left: -20,
            bottom: 5
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            opacity={0.18}
          />

          <XAxis
            dataKey="name"
            tick={{
              fontSize: 12,
              fill: "#6B7280"
            }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            allowDecimals={false}
            tick={{
              fontSize: 12,
              fill: "#6B7280"
            }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            cursor={{ fill: "rgba(0,0,0,0.03)" }}
            contentStyle={{
              borderRadius: "14px",
              border: "none",
              boxShadow:
                "0 10px 30px rgba(0,0,0,0.08)"
            }}
          />

          <Bar
            dataKey="value"
            radius={[10, 10, 0, 0]}
            animationDuration={700}
          >
            {chartData.map((entry, index) => {
              let fill = "#6B7280";

              if (entry.name === "Hadir")
                fill = "#22C55E";
              else if (entry.name === "Izin")
                fill = "#EAB308";
              else if (entry.name === "Sakit")
                fill = "#EF4444";
              else if (entry.name === "Alpha")
                fill = "#6B7280";

              return (
                <Cell
                  key={index}
                  fill={fill}
                />
              );
            })}

            <LabelList
              dataKey="value"
              position="top"
              style={{
                fontSize: 12,
                fill: "#374151",
                fontWeight: 600
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )}
</div>

      </div>
    </div>
  );
};

export default LihatPresensi;