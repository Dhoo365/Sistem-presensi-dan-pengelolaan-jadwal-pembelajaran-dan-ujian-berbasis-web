import {
  FaCheckCircle,
  FaClock,
  FaCalendarAlt,
  FaBook,
} from "react-icons/fa";

const DashboardGuru = () => {
  const jadwalHariIni = [
    {
      jam: "07:00 - 08:30",
      kelas: "Kelas 1 - Matematika",
      status: "sudah",
    },
    {
      jam: "08:30 - 10:00",
      kelas: "Kelas 2 - Matematika",
      status: "sudah",
    },
    {
      jam: "11:00 - 12:00",
      kelas: "Kelas 4 - Matematika",
      status: "belum",
    },
  ];

  const jadwalBesok = [
    {
      jam: "07:00 - 08:30",
      kelas: "Kelas 3 - Seni Budaya",
    },
    {
      jam: "10:00 - 11:00",
      kelas: "Kelas 4 - IPA",
    },
  ];

  const getStatus = (status) => {
    if (status === "sudah") {
      return (
        <span className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
          Sudah Presensi <FaCheckCircle />
        </span>
      );
    }
    return (
      <span className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
        Belum Presensi <FaClock />
      </span>
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">

      {/* SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Mengajar Hari ini</p>
            <h2 className="text-xl font-bold">3 Kelas</h2>
          </div>
          <FaBook className="text-2xl text-gray-400" />
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Siswa</p>
            <h2 className="text-xl font-bold">90</h2>
          </div>
        </div>

        <div className="bg-green-200 p-4 rounded-xl shadow flex items-center justify-between">
          <div>
            <p className="text-sm">Sudah Presensi</p>
            <h2 className="text-xl font-bold">2</h2>
          </div>
          <FaCheckCircle />
        </div>

        <div className="bg-yellow-300 p-4 rounded-xl shadow flex items-center justify-between">
          <div>
            <p className="text-sm">Belum Presensi</p>
            <h2 className="text-xl font-bold">1</h2>
          </div>
          <FaClock />
        </div>
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2 bg-gray-200 rounded-xl shadow p-5">

          <h2 className="font-semibold text-lg mb-4">
            Jadwal Hari ini:
          </h2>

          <div className="space-y-4">
            {jadwalHariIni.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-bold">{item.jam}</p>
                  <p className="text-gray-600">{item.kelas}</p>
                </div>

                {getStatus(item.status)}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white rounded-xl shadow p-5">

          <div className="flex items-center gap-2 mb-4">
            <FaCalendarAlt />
            <h2 className="font-semibold">Jadwal Besok</h2>
          </div>

          <p className="text-sm text-gray-500 mb-4">2 Kelas</p>

          <div className="space-y-4">
            {jadwalBesok.map((item, i) => (
              <div
                key={i}
                className="bg-gray-100 rounded-xl p-4 shadow"
              >
                <p className="font-semibold">{item.jam}</p>
                <p className="text-gray-600">{item.kelas}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardGuru;