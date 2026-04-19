import { useState } from "react";
import { FaUserCircle, FaCheckCircle, FaClock } from "react-icons/fa";

const students = [
  { name: "Leonel", kelas: "Kelas 3" },
  { name: "Messi", kelas: "Kelas 1" },
  { name: "Alok", kelas: "Kelas 6" },
  { name: "Timothy", kelas: "Kelas 3" },
];

const subjects = [
  { name: "Matematika", teacher: "Ibu Rina" },
  { name: "Bahasa Indonesia", teacher: "Ibu Tesa" },
  { name: "IPA", teacher: "Bpk Tesa" },
];

const DashboardOrtu = () => {
  return (
    <div className="space-y-6">

      {/* ================= STUDENT LIST ================= */}
      <div className="overflow-visible">
  <div className="flex gap-4 overflow-x-auto overflow-y-visible py-2 px-2">
  {students.map((s, i) => (
    <div
      key={i}
      className={`
        relative
        min-w-[220px] bg-white rounded-xl p-4 flex items-center gap-3 border
        shadow-sm
        transition-transform duration-200 ease-in-out
        hover:scale-[1.03]
        origin-center
        hover:z-10
        cursor-pointer
        ${i === 0 ? "ml-1" : ""}
      `}
    >
      <FaUserCircle className="text-3xl text-gray-500" />

      <div>
        <p className="font-semibold">{s.name}</p>
        <p className="text-sm text-gray-500">{s.kelas}</p>
      </div>
    </div>
  ))}
</div>
</div>
      {/* ================= MAIN GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ================= LEFT SIDE ================= */}
        <div className="bg-gray-200 rounded-2xl shadow-inner p-4">

          <div className="bg-white rounded-xl shadow p-5 space-y-4">

            {/* HEADER */}
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <FaCheckCircle className="text-green-500" />
              </div>

              <div>
                <h2 className="font-semibold text-gray-700">
                  Status Kehadiran Hari Ini
                </h2>
                <p className="text-green-600 font-semibold text-sm">
                  3 Mapel + Hadir
                </p>
              </div>
            </div>

            {/* SUBJECT LIST */}
            {subjects.map((s, i) => (
              <div
                key={i}
                className="
                  flex justify-between items-center
                  bg-gray-100 rounded-lg p-3 shadow-sm
                  transition hover:bg-gray-200
                "
              >
                {/* LEFT */}
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  <div>
                    <p className="font-medium">{s.name}</p>
                    <p className="text-xs text-gray-500">{s.teacher}</p>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-2">
                  <span className="bg-gray-200 text-xs px-2 py-1 rounded">
                    07:02
                  </span>
                  <button className="bg-blue-400 text-white px-2 py-1 rounded text-xs hover:bg-blue-500 transition">
                    ▶
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* CHECK IN */}
          <div className="mt-4 bg-blue-100 text-blue-700 rounded-xl p-4 flex items-center gap-2 shadow">
            <FaClock />
            <span className="font-medium">Check-in: 07:02</span>
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="bg-white rounded-xl shadow p-5">

          {/* HEADER */}
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#5a3e36] text-white p-2 rounded-lg">
              📅
            </div>
            <h2 className="font-semibold text-gray-700">
              Kehadiran Bulan Ini
            </h2>
          </div>

          {/* LIST */}
          <div className="space-y-3">
            <div className="flex justify-between bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition">
              <span className="text-green-600 font-medium">Hadir</span>
              <span>17 hari</span>
            </div>

            <div className="flex justify-between bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition">
              <span className="text-yellow-600 font-medium">Izin</span>
              <span>2 hari</span>
            </div>

            <div className="flex justify-between bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition">
              <span className="text-red-600 font-medium">Sakit</span>
              <span>1 hari</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOrtu;