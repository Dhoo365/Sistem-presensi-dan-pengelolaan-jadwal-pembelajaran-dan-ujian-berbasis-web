import { useState } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
  FaMinusCircle,
  FaSearch,
} from "react-icons/fa";

const KelolaPresensi = () => {
  const [search, setSearch] = useState("");

  const [dataSiswa, setDataSiswa] = useState([
    { nama: "Nana", kelas: "Kelas 1", status: "Hadir" },
    { nama: "Jeman", kelas: "Kelas 1", status: "Hadir" },
    { nama: "Loren", kelas: "Kelas 1", status: "Sakit" },
    { nama: "Lino", kelas: "Kelas 1", status: "Izin" },
    { nama: "Malik", kelas: "Kelas 1", status: "Hadir" },
    { nama: "Gwen", kelas: "Kelas 1", status: "Hadir" },
  ]);

  const jadwal = [
    { waktu: "07:00 - 08:30", kelas: "Kelas 1 - Matematika" },
    { waktu: "08:30 - 10:00", kelas: "Kelas 2 - Matematika" },
    { waktu: "11:00 - 12:00", kelas: "Kelas 3 - Matematika" },
  ];

  const filtered = dataSiswa.filter((s) =>
    s.nama.toLowerCase().includes(search.toLowerCase())
  );

  const updateStatus = (index, value) => {
    const updated = [...dataSiswa];
    updated[index].status = value;
    setDataSiswa(updated);
  };

  const countStatus = (type) =>
    dataSiswa.filter((s) => s.status === type).length;

  const getStatusColor = (status) => {
    switch (status) {
      case "Hadir":
        return "bg-green-100 text-green-700";
      case "Izin":
        return "bg-yellow-100 text-yellow-700";
      case "Sakit":
        return "bg-red-100 text-red-700";
      case "Alpha":
        return "bg-gray-200 text-gray-600";
      default:
        return "";
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">

      {/* TANGGAL */}
      <div>
        <label className="block mb-2 font-semibold">Tanggal</label>
        <input
          type="date"
          className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm"
        />
      </div>

      {/* JADWAL */}
      <div className="overflow-x-auto custom-scrollbar cursor-grab active:cursor-grabbing">
        <div className="flex gap-4 min-w-max pb-2">
          {jadwal.map((j, i) => (
            <div
              key={i}
              className="min-w-[260px] bg-white rounded-xl shadow border border-gray-200 p-4"
            >
              <p className="font-semibold">{j.waktu}</p>
              <p className="text-sm text-gray-500 mb-3">{j.kelas}</p>

              <button className="w-full border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition">
                Absen Sekarang
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
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow border border-gray-300 overflow-hidden">

        <div className="max-h-[350px] overflow-y-auto custom-scrollbar">

          <table className="w-full text-sm border-collapse">

            {/* HEADER */}
            <thead>
              <tr className="bg-[#5b3a29] text-white">
                <th className="p-3 border border-gray-300 text-left">No</th>
                <th className="p-3 border border-gray-300 text-left">Nama Siswa</th>
                <th className="p-3 border border-gray-300 text-left">Kelas</th>
                <th className="p-3 border border-gray-300 text-left">Status</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {filtered.map((s, i) => (
                <tr key={i} className="hover:bg-gray-50 transition">
                  <td className="p-3 border border-gray-300">{i + 1}</td>

                  <td className="p-3 border border-gray-300 font-medium">
                    {s.nama}
                  </td>

                  <td className="p-3 border border-gray-300">
                    {s.kelas}
                  </td>

                  <td className="p-3 border border-gray-300">
                    <select
                      value={s.status}
                      onChange={(e) =>
                        updateStatus(i, e.target.value)
                      }
                      className={`px-3 py-1 rounded-md text-xs font-semibold cursor-pointer ${getStatusColor(
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
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* ACTION */}
      <div className="flex flex-wrap items-center gap-4">

        <button className="bg-[#6b4226] text-white px-6 py-2 rounded-lg shadow hover:opacity-90">
          Simpan Perubahan
        </button>

        <div className="flex gap-3 flex-wrap">
          <div className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <FaCheckCircle /> {countStatus("Hadir")} Hadir
          </div>

          <div className="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <FaExclamationCircle /> {countStatus("Izin")} Izin
          </div>

          <div className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <FaTimesCircle /> {countStatus("Sakit")} Sakit
          </div>

          <div className="bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <FaMinusCircle /> {countStatus("Alpha")} Alpha
          </div>
        </div>
      </div>
    </div>
  );
};

export default KelolaPresensi;