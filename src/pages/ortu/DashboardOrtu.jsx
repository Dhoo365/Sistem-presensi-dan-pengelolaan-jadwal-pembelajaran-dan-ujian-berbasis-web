import { useState } from "react";
import Sidebar from "../../components/ortu/SidebarOrtu";
import { FaUserCircle, FaCheckCircle, FaCalendarAlt } from "react-icons/fa";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* MAIN */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6">


        {/* STUDENT */}
        <div className="flex gap-4 overflow-x-auto">
          {["Leonel", "Messi", "Alok", "Timothy"].map((name, i) => (
            <div key={i} className="min-w-[200px] bg-white shadow rounded-xl p-4 flex items-center gap-3">
              <FaUserCircle className="text-3xl text-gray-500" />
              <div>
                <p className="font-semibold">{name}</p>
                <p className="text-sm text-gray-500">Kelas {i + 1}</p>
              </div>
            </div>
          ))}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow p-5">
              <div className="flex items-center gap-2 mb-3">
                <FaCheckCircle className="text-green-500" />
                <h2 className="font-semibold">Status Kehadiran Hari Ini</h2>
              </div>
              <p className="text-green-600 font-semibold">
                +Hadir <span className="text-gray-500">Matematika</span>
              </p>
              <div className="mt-3 bg-gray-100 px-3 py-2 rounded inline-block text-sm">
                Check-in: 07:02
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-5">
              <div className="flex items-center gap-2 mb-3">
                <FaCalendarAlt />
                <h2 className="font-semibold">Jadwal Hari Ini</h2>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>07:02 - Matematika</span>
                  <span className="bg-blue-100 px-2 rounded text-sm">Ibu Rina</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="font-semibold mb-4">Kehadiran Bulan Ini</h2>
            <div className="space-y-3">
              <div className="flex justify-between bg-gray-100 p-3 rounded">
                <span className="text-green-600">Hadir</span>
                <span>17 hari</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;