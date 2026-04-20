import { useState } from "react";
import {
  FaUserCircle,
  FaFolder,
  FaRegFileAlt,
} from "react-icons/fa";

const dataPelajaran = {
  Senin: [
    { jam: "08:00 - 09:30", mapel: "Seni Budaya", guru: "Pak Gusti"},
    { jam: "08:00 - 09:30", mapel: "PKN", guru: "Pak Harry"}
  ],  
  Selasa: [
    { jam: "08:00 - 09:30", mapel: "Bahasa Indonesia", guru: "Pak Ahmad" },
    { jam: "08:00 - 09:30", mapel: "Matematika", guru: "Ibu Merry" },
  ],
  Rabu: [
    { jam: "08:00 - 09:30", mapel: "Bahasa Inggris", guru: "Pak Amin" },
  ],
  Kamis: [
    { jam: "08:00 - 09:30", mapel: "PJOK", guru: "Pak Ahmad" },
    { jam: "08:00 - 09:30", mapel: "Prakarya", guru: "Ibu Merry" },
  ],
  Jumat: [
    { jam: "08:00 - 09:30", mapel: "Bahasa Indonesia", guru: "Pak Ahmad" },
  ],
};

const dataUjian = {
  Senin : [],  
  Selasa: [],
  Rabu: [],
  Kamis: [],
  Jumat: [],
};

const JadwalMingguContent = () => {
  const [activeTab, setActiveTab] = useState("pelajaran");
  const data = activeTab === "pelajaran" ? dataPelajaran : dataUjian;

  return (
    <div className="space-y-6">

      {/* TAB */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab("pelajaran")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
          ${activeTab === "pelajaran"
              ? "bg-green-200 text-green-800"
              : "bg-gray-200 text-gray-600"}`}
        >
          <FaFolder />
          Pelajaran
        </button>

        <button
          onClick={() => setActiveTab("ujian")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
          ${activeTab === "ujian"
              ? "bg-red-200 text-red-700"
              : "bg-gray-200 text-gray-600"}`}
        >
          <FaRegFileAlt />
          Ujian
        </button>
      </div>

      {/* CONTAINER */}
      <div className="bg-gray-200 rounded-2xl shadow-inner p-4">

        {/* 🔥 SCROLL AREA */}
        <div
          className="
            flex gap-4
            overflow-x-auto
            pb-4
            scroll-smooth
            cursor-grab active:cursor-grabbing
          "
        >
          {Object.keys(data).map((hari, i) => (
            <div
              key={i}
              className="
                min-w-[260px]
                flex-shrink-0
                bg-white rounded-xl shadow p-4
              "
            >
              {/* HEADER */}
              <div className="mb-3">
                <h2 className="font-semibold">{hari}</h2>
                <p className="text-xs text-orange-500">
                  18 April 2026
                </p>
              </div>

              {/* LIST */}
              <div className="space-y-3">
                {data[hari].length > 0 ? (
                  data[hari].map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-100 rounded-lg p-3 shadow-sm"
                    >
                      <p className="text-xs text-blue-600 font-medium">
                        {item.jam}
                      </p>

                      <p className="font-medium text-sm">
                        {item.mapel}
                      </p>

                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        <FaUserCircle />
                        {item.guru}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-400">
                    Tidak ada jadwal
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JadwalMingguContent;