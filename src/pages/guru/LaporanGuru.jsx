import { useState } from "react";
import { FaDownload } from "react-icons/fa";

const LaporanPresensi = () => {
  const [kelas, setKelas] = useState("");
  const [mode, setMode] = useState("bulan");
  const [timeline, setTimeline] = useState("");
  const [search, setSearch] = useState("");

  const data = [
    { nama: "Nana", kelas: "Kelas 1", hadir: 20, sakit: 2, izin: 1, alpha: 0 },
    { nama: "Jeman", kelas: "Kelas 1", hadir: 18, sakit: 1, izin: 2, alpha: 1 },
    { nama: "Loren", kelas: "Kelas 1", hadir: 15, sakit: 3, izin: 1, alpha: 2 },
    { nama: "Lino", kelas: "Kelas 1", hadir: 19, sakit: 0, izin: 2, alpha: 1 },
    { nama: "Malik", kelas: "Kelas 1", hadir: 22, sakit: 1, izin: 0, alpha: 0 },
    { nama: "Gwen", kelas: "Kelas 1", hadir: 21, sakit: 1, izin: 1, alpha: 0 },
    
  ];

  const bulanList = [
    "Januari","Februari","Maret","April","Mei","Juni",
    "Juli","Agustus","September","Oktober","November","Desember"
  ];

  const semesterList = ["Ganjil", "Genap"];

  const filteredData = data.filter((d) =>
    d.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-5">

      {/* ================= FILTER ================= */}
      <div className="flex justify-between flex-wrap gap-4">

        <div className="flex flex-wrap gap-3">

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Cari nama siswa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6B4F3B]"
          />

          {/* KELAS */}
          <select
            value={kelas}
            onChange={(e) => setKelas(e.target.value)}
            className="px-4 py-2 rounded-lg bg-[#6B4F3B] text-white"
          >
            <option value="">Kelas</option>
            {[1,2,3,4,5,6].map(k => (
              <option key={k}>Kelas {k}</option>
            ))}
          </select>

          {/* MODE */}
          <select
            value={mode}
            onChange={(e) => {
              setMode(e.target.value);
              setTimeline("");
            }}
            className="px-4 py-2 rounded-lg bg-[#6B4F3B] text-white"
          >
            <option value="bulan">Per Bulan</option>
            <option value="semester">Per Semester</option>
          </select>

          {/* TIMELINE */}
          <select
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            className="px-4 py-2 rounded-lg bg-[#6B4F3B] text-white max-h-40 overflow-y-auto"
          >
            <option value="">Pilih</option>

            {mode === "bulan"
              ? bulanList.map((b) => <option key={b}>{b}</option>)
              : semesterList.map((s) => <option key={s}>{s}</option>)
            }
          </select>

        </div>

        {/* BUTTON */}
        <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg shadow-sm text-sm font-medium transition">
          <FaDownload />
          Unduh PDF
        </button>

      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-xl border border-gray-300 overflow-hidden shadow">

        <div className="max-h-[420px] overflow-y-auto">

          <table className="w-full text-sm border-separate border-spacing-0">

            {/* HEADER */}
            <thead className="bg-[#6B4F3B] text-white sticky top-0 z-10">
              <tr>
                <th className="p-3 border-r border-white/30">No</th>
                <th className="p-3 border-r border-white/30">Nama</th>
                <th className="p-3 border-r border-white/30">Kelas</th>
                <th className="p-3 border-r border-white/30 text-center">Hadir</th>
                <th className="p-3 border-r border-white/30 text-center">Sakit</th>
                <th className="p-3 border-r border-white/30 text-center">Izin</th>
                <th className="p-3 text-center">Alpha</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">

                  <td className="p-3 border-r border-b border-gray-300">
                    {index + 1}
                  </td>

                  <td className="p-3 border-r border-b border-gray-300">
                    {item.nama}
                  </td>

                  <td className="p-3 border-r border-b border-gray-300">
                    {item.kelas}
                  </td>

                  <td className="p-3 border-r border-b border-gray-300 text-center text-green-600 font-semibold">
                    {item.hadir}
                  </td>

                  <td className="p-3 border-r border-b border-gray-300 text-center text-red-500 font-semibold">
                    {item.sakit}
                  </td>

                  <td className="p-3 border-r border-b border-gray-300 text-center text-yellow-600 font-semibold">
                    {item.izin}
                  </td>

                  <td className="p-3 border-b border-gray-300 text-center text-gray-600 font-semibold">
                    {item.alpha}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
};

export default LaporanPresensi;