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
} from "recharts";

const stats = [
  {
    title: "Total Hadir",
    value: "28/30",
    color: "bg-teal-500",
    icon: <FaCheckCircle />,
  },
  {
    title: "Izin",
    value: "2/30",
    color: "bg-yellow-400",
    icon: <FaClock />,
  },
  {
    title: "Sakit",
    value: "1/30",
    color: "bg-red-500",
    icon: <FaTimesCircle />,
  },
  {
    title: "Alpha",
    value: "28/30",
    color: "bg-gray-400",
    icon: <FaUser />,
  },
];

const tableData = [
  {
    tanggal: "17 April 2026",
    hari: "Senin",
    jam: "09:00",
    mapel: "Matematika",
    status: "Hadir",
  },
  {
    tanggal: "18 April 2026",
    hari: "Selasa",
    jam: "09:00",
    mapel: "Bahasa Indonesia",
    status: "Izin",
  },
  {
    tanggal: "19 April 2026",
    hari: "Rabu",
    jam: "09:00",
    mapel: "Matematika",
    status: "Sakit",
  },
];

const chartData = [
  { name: "Hadir", value: 28 },
  { name: "Izin", value: 12 },
  { name: "Sakit", value: 1 },
];

const LihatPresensi = () => {
  return (
    <div className="space-y-6">

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className={`
              ${s.color} text-white rounded-xl p-4 flex items-center justify-between
              shadow-md
              transition-transform duration-200
              hover:scale-[1.02]
            `}
          >
            <div>
              <p className="text-sm">{s.title}</p>
              <p className="text-lg font-bold">{s.value}</p>
            </div>
            <div className="text-2xl">{s.icon}</div>
          </div>
        ))}
      </div>

      {/* ================= FILTER ================= */}
      <div className="flex flex-wrap gap-3">
        <select className="bg-white shadow px-4 py-2 rounded-lg border">
          <option>Januari</option>
        </select>

        <select className="bg-white shadow px-4 py-2 rounded-lg border">
          <option>Ganjil</option>
        </select>

        <select className="bg-white shadow px-4 py-2 rounded-lg border">
          <option>2024/2025</option>
        </select>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold mb-4">Riwayat Presensi</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="pb-2">Tanggal</th>
                  <th>Hari</th>
                  <th>Jam</th>
                  <th>Mata Pelajaran</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {tableData.map((row, i) => (
                  <tr key={i} className="border-t">
                    <td className="py-2">{row.tanggal}</td>
                    <td>{row.hari}</td>
                    <td>{row.jam}</td>
                    <td>{row.mapel}</td>
                    <td>
                      <span
                        className={`
                          px-2 py-1 rounded text-white text-xs
                          ${
                            row.status === "Hadir"
                              ? "bg-green-500"
                              : row.status === "Izin"
                              ? "bg-yellow-400"
                              : "bg-red-500"
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
        </div>

        {/* CHART */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold mb-4">Kehadiran Bulanan</h2>

          <div className="w-full h-64">
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LihatPresensi;