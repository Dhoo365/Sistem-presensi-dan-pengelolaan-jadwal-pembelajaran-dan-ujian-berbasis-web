import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";

const RiwayatPresensi = () => {
  const [tanggal, setTanggal] = useState("");
  const [kelas, setKelas] = useState("");
  const [mapel, setMapel] = useState("");

  const data = [
    {
      hari: "Senin",
      tanggal: "2026-04-21",
      kelas: "Kelas 1",
      mapel: "Matematika",
      jam: "07:00 - 08:30",
      status: "sudah",
      info: "Diisi : 08:20\nOleh : Bapak Budi",
    },
    {
      hari: "Selasa",
      tanggal: "2026-04-22",
      kelas: "Kelas 2",
      mapel: "Matematika",
      jam: "10:00 - 11:30",
      status: "sudah",
      info: "Diisi : 10:10\nOleh : Bapak Budi",
    },
    {
      hari: "Rabu",
      tanggal: "2026-04-23",
      kelas: "Kelas 3",
      mapel: "IPA",
      jam: "07:00 - 08:30",
      status: "tidak",
      info: "Tidak ada data presensi di hari tersebut",
    },
    {
      hari: "Kamis",
      tanggal: "2026-04-24",
      kelas: "Kelas 2",
      mapel: "Seni Budaya",
      jam: "11:00 - 12:00",
      status: "belum",
      info: "Belum melakukan presensi",
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "sudah":
        return "bg-green-100 text-green-700";
      case "belum":
        return "bg-yellow-100 text-yellow-700";
      case "tidak":
        return "bg-red-100 text-red-700";
      default:
        return "";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "sudah":
        return "Sudah Presensi";
      case "belum":
        return "Belum Presensi";
      case "tidak":
        return "Tidak ada Presensi";
      default:
        return "";
    }
  };

  const filtered = data.filter((d) => {
    return (
      (!tanggal || d.tanggal === tanggal) &&
      (!kelas || d.kelas === kelas) &&
      (!mapel || d.mapel === mapel)
    );
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">

      {/* FILTER */}
      <div className="flex flex-wrap items-center gap-3">

        {/* TANGGAL */}
        <input
          type="date"
          value={tanggal}
          onChange={(e) => setTanggal(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg shadow-sm bg-white"
        />

        {/* KELAS */}
        <select
          value={kelas}
          onChange={(e) => setKelas(e.target.value)}
          className="bg-[#6b4226] text-white px-4 py-2 rounded-lg shadow cursor-pointer"
        >
          <option value="">Semua Kelas</option>
          <option>Kelas 1</option>
          <option>Kelas 2</option>
          <option>Kelas 3</option>
        </select>

        {/* MAPEL */}
        <select
          value={mapel}
          onChange={(e) => setMapel(e.target.value)}
          className="bg-[#6b4226] text-white px-4 py-2 rounded-lg shadow cursor-pointer"
        >
          <option value="">Semua Mapel</option>
          <option>Matematika</option>
          <option>IPA</option>
          <option>Seni Budaya</option>
        </select>
      </div>

      {/* CONTAINER */}
      <div className="bg-gray-200 rounded-xl shadow p-4">

        <h2 className="font-semibold text-lg mb-4">
          Daftar Presensi
        </h2>

        <div className="space-y-4">

          {filtered.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm border p-4 flex items-center justify-between hover:shadow-md transition"
            >

              {/* KIRI */}
              <div className="w-[120px]">
                <p className="font-semibold">{item.hari}</p>
                <p className="text-xl font-bold">
                  {item.tanggal.split("-")[2]}
                </p>
                <p className="text-sm text-gray-500">
                  {item.tanggal}
                </p>
              </div>

              {/* TENGAH */}
              <div className="flex-1 px-4">
                <p className="font-semibold">
                  {item.kelas} - {item.mapel}
                </p>
                <p className="text-sm text-gray-500">{item.jam}</p>
              </div>

              {/* STATUS */}
              <div className="flex items-center gap-4">
                <div
                  className={`px-3 py-1 rounded-lg text-xs font-semibold ${getStatusStyle(
                    item.status
                  )}`}
                >
                  {getStatusText(item.status)}
                </div>

                <div className="text-sm text-gray-500 whitespace-pre-line">
                  {item.info}
                </div>

                <FaChevronRight className="text-gray-400" />
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default RiwayatPresensi;