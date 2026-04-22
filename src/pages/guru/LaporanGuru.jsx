import { useState } from "react";
import { FaDownload } from "react-icons/fa";

const KelolaPresensi = () => {
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

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-5">

      {/* FILTER + BUTTON */}
      <div className="flex flex-wrap justify-between items-center gap-4">

        {/* LEFT */}
        <div className="flex flex-wrap gap-3 items-center">

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Cari nama siswa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-lg border w-64 focus:outline-none focus:ring-2 focus:ring-[#6B4F3B]"
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

        {/* RIGHT BUTTON */}
        <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg shadow-sm text-sm font-medium transition">
          <FaDownload />
          Unduh PDF
        </button>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">

        <div className="max-h-[420px] overflow-y-auto">

          <table className="w-full border-collapse">

            {/* HEADER */}
            <thead className="bg-[#6B4F3B] text-white sticky top-0 z-10">
              <tr>
                <th className="p-3 border">No</th>
                <th className="p-3 border">Nama</th>
                <th className="p-3 border">Kelas</th>
                <th className="p-3 border">Hadir</th>
                <th className="p-3 border">Sakit</th>
                <th className="p-3 border">Izin</th>
                <th className="p-3 border">Alpha</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {data
                .filter((d) =>
                  d.nama.toLowerCase().includes(search.toLowerCase())
                )
                .map((d, i) => (
                  <tr
                    key={i}
                    className="text-center hover:bg-gray-50 transition"
                  >
                    <td className="p-3 border">{i + 1}</td>
                    <td className="p-3 border">{d.nama}</td>
                    <td className="p-3 border">{d.kelas}</td>

                    <td className="p-3 border text-green-600 font-semibold">
                      {d.hadir}
                    </td>

                    <td className="p-3 border text-red-500 font-semibold">
                      {d.sakit}
                    </td>

                    <td className="p-3 border text-yellow-500 font-semibold">
                      {d.izin}
                    </td>

                    <td className="p-3 border text-gray-500 font-semibold">
                      {d.alpha}
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

export default KelolaPresensi;