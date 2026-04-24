import React, {
  useState,
  useEffect,
  useMemo
} from "react";

import {
  Users,
  GraduationCap,
  BookOpen,
  School,
  CalendarDays,
  User,
  CalendarCheck,
  CalendarRange,
  ChevronRight,
  Clock
} from "lucide-react";

import api from "../../lib/axios";


// =======================================
// STAT CARD
// =======================================

const StatCard = ({
  count,
  label,
  subLabel,
  icon: Icon,
  colorClass,
  iconBg
}) => (
  <div className={`${colorClass} rounded-2xl p-6 flex items-center gap-5 border shadow-sm transition-transform hover:scale-[1.02]`}>
    <div className={`${iconBg} p-4 rounded-xl text-white shadow-md`}>
      <Icon size={28} />
    </div>

    <div>
      <h3 className="text-3xl font-bold text-gray-800 leading-none">
        {count}
      </h3>

      <p className="font-bold text-gray-700 text-sm mt-1">
        {label}
      </p>

      <p className="text-[10px] text-gray-500 uppercase tracking-wider">
        {subLabel}
      </p>
    </div>
  </div>
);


// =======================================
// CARD JADWAL
// =======================================

const ScheduleCard = ({
  type,
  grade,
  day,
  subject,
  teacher,
  time,
  date
}) => {
  const isExam =
    String(type).toLowerCase() ===
    "ujian";

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-200 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">

      <div
        className={`absolute left-0 top-0 bottom-0 w-2 ${
          isExam
            ? "bg-[#E16766]"
            : "bg-[#60B873]"
        }`}
      />

      <div className="flex items-center gap-3 mb-4 pl-2">

        <span
          className={`text-[10px] font-bold px-2 py-1 rounded border uppercase ${
            isExam
              ? "bg-[#FCEAE9] text-[#E16766] border-[#E16766]"
              : "bg-[#E4F5E8] text-[#60B873] border-[#60B873]"
          }`}
        >
          {type}
        </span>

        <span className="font-bold text-sm text-gray-800">
          {grade}
        </span>

      </div>

      <div className="space-y-3 text-xs text-gray-600 pl-2">

        <div className="flex items-center gap-3 font-medium text-gray-800">
          <CalendarDays
            size={14}
            className="text-gray-400"
          />
          <span>
            {date
              ? `${day}, ${date}`
              : day}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <BookOpen
            size={14}
            className="text-gray-400"
          />
          <span>{subject}</span>
        </div>

        <div className="flex items-center gap-3">
          <User
            size={14}
            className="text-gray-400"
          />
          <span>{teacher}</span>
        </div>

        <div className="flex items-center gap-3">
          <Clock
            size={14}
            className="text-gray-400"
          />
          <span>{time}</span>
        </div>

      </div>
    </div>
  );
};


// =======================================
// MAIN
// =======================================

const AdminBeranda = () => {
  const [stats, setStats] =
    useState({
      murid: "-",
      guru: "-",
      mapel: "-",
      kelas: "-",
    });

  const [jadwalHariIni, setJadwalHariIni] =
    useState([]);

  const [jadwalMinggu, setJadwalMinggu] =
    useState([]);

  const [loadingStats, setLoadingStats] =
    useState(true);

  const [loadingJadwal, setLoadingJadwal] =
    useState(true);

  const [showAllHari, setShowAllHari] =
    useState(false);

  const [showAllMinggu, setShowAllMinggu] =
    useState(false);


  const hariList = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];

  const tglFormatted =
    new Date().toLocaleDateString(
      "id-ID",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    ).toUpperCase();


  // =======================================
  // RANGE MINGGU
  // =======================================

  const rangeMinggu =
    useMemo(() => {
      const now =
        new Date();

      const day =
        now.getDay();

      const diff =
        day === 0
          ? -6
          : 1 - day;

      const monday =
        new Date(now);

      monday.setDate(
        now.getDate() + diff
      );

      const sunday =
        new Date(monday);

      sunday.setDate(
        monday.getDate() + 6
      );

      const format = (
        d
      ) =>
        d.toLocaleDateString(
          "id-ID",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          }
        );

      return `${format(
        monday
      )} - ${format(
        sunday
      )}`;
    }, []);


  // =======================================
  // FETCH
  // =======================================

  useEffect(() => {
    const fetchData =
      async () => {
        try {
          setLoadingStats(
            true
          );

          setLoadingJadwal(
            true
          );

          const [
            statsRes,
            hariRes,
            mingguRes,
          ] =
            await Promise.all([
              api.get(
                "/admin/dashboard"
              ),
              api.get(
                "/admin/jadwal/hari-ini"
              ),
              api.get(
                "/admin/jadwal/minggu-ini"
              ),
            ]);

          setStats(
            statsRes.data ||
              {}
          );

          setJadwalHariIni(
            hariRes.data ||
              []
          );

          setJadwalMinggu(
            mingguRes.data ||
              []
          );

        } catch (err) {
          console.log(
            err
          );
        } finally {
          setLoadingStats(
            false
          );

          setLoadingJadwal(
            false
          );
        }
      };

    fetchData();
  }, []);


  // =======================================
  // DISPLAY HARI
  // =======================================

  const displayHari =
    showAllHari
      ? jadwalHariIni
      : jadwalHariIni.slice(
          0,
          4
        );


  // =======================================
  // GROUP PER HARI
  // =======================================

  const urutHari = [
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
    "Minggu",
  ];

  const groupHari =
    urutHari.map(
      (hari) => ({
        hari,
        data:
          jadwalMinggu.filter(
            (j) =>
              j.hari ===
              hari
          ),
      })
    );


  return (
    <div className="space-y-8">

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          count={
            loadingStats
              ? "..."
              : stats.murid
          }
          label="Murid Aktif"
          subLabel="Total Murid"
          icon={Users}
          colorClass="bg-[#FDEEDC] border-orange-200"
          iconBg="bg-[#F2A65A]"
        />

        <StatCard
          count={
            loadingStats
              ? "..."
              : stats.guru
          }
          label="Guru Aktif"
          subLabel="Total Tenaga Pengajar"
          icon={GraduationCap}
          colorClass="bg-[#C8E8D2] border-green-300"
          iconBg="bg-[#5CB874]"
        />

        <StatCard
          count={
            loadingStats
              ? "..."
              : stats.mapel
          }
          label="Mapel Aktif"
          subLabel="Total Mata Pelajaran"
          icon={BookOpen}
          colorClass="bg-[#BBD0E3] border-blue-300"
          iconBg="bg-[#518CB8]"
        />

        <StatCard
          count={
            loadingStats
              ? "..."
              : stats.kelas
          }
          label="Kelas Aktif"
          subLabel="Total Ruang Kelas"
          icon={School}
          colorClass="bg-[#DABEFF] border-purple-300"
          iconBg="bg-[#A366FF]"
        />

      </div>


      {/* JADWAL HARI INI */}
      <section className="bg-[#DFDFDF] rounded-2xl p-6 border border-gray-300 shadow-sm">

        <div className="flex items-center gap-3 mb-6">

          <CalendarCheck
            size={24}
            className="text-gray-700"
          />

          <h3 className="font-bold text-xl text-gray-800">
            Jadwal Hari Ini
          </h3>

          <span className="ml-2 bg-white/50 border border-gray-400 text-gray-700 text-[10px] font-bold px-3 py-1 rounded-full">
            {tglFormatted}
          </span>

          {jadwalHariIni.length >
            4 && (
            <button
              onClick={() =>
                setShowAllHari(
                  !showAllHari
                )
              }
              className="ml-auto flex items-center gap-2 bg-white/50 border border-gray-400 hover:bg-white text-gray-700 text-xs font-bold px-4 py-2 rounded-full transition-all"
            >
              {showAllHari
                ? "Ringkas"
                : "Lihat Semua Jadwal"}

              <ChevronRight
                size={14}
              />
            </button>
          )}

        </div>

        {loadingJadwal ? (
          <div className="bg-white rounded-2xl py-20 flex flex-col items-center justify-center border border-gray-200 shadow-inner">
            <p className="text-gray-400 font-bold text-lg">
              Memuat jadwal...
            </p>
          </div>

        ) : displayHari.length ===
          0 ? (

          <div className="bg-white rounded-2xl py-20 flex flex-col items-center justify-center border border-gray-200 shadow-inner">
            <p className="text-gray-400 font-bold text-lg">
              Tidak Ada Jadwal Untuk Hari Ini
            </p>
          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

            {displayHari.map(
              (j) => (
                <ScheduleCard
                  key={j.id}
                  type={
                    j.tipe
                  }
                  grade={
                    j.kelas
                  }
                  day={
                    j.hari
                  }
                  subject={
                    j.mapel
                  }
                  teacher={
                    j.guru
                  }
                  time={
                    j.time
                  }
                />
              )
            )}

          </div>
        )}

      </section>


      {/* JADWAL MINGGU INI */}
      <section className="bg-[#DFDFDF] rounded-2xl p-6 border border-gray-300 shadow-sm">

        <div className="flex items-center justify-between mb-6">

          <div className="flex items-center gap-3">

            <CalendarRange
              size={24}
              className="text-gray-700"
            />

            <div>
              <h3 className="font-bold text-xl text-gray-800">
                Jadwal Minggu Ini
              </h3>

              <p className="text-xs text-gray-500 font-semibold">
                {rangeMinggu}
              </p>
            </div>

          </div>

          <button
            onClick={() =>
              setShowAllMinggu(
                !showAllMinggu
              )
            }
            className="flex items-center gap-2 bg-white/50 border border-gray-400 hover:bg-white text-gray-700 text-xs font-bold px-4 py-2 rounded-full transition-all"
          >
            {showAllMinggu
              ? "Ringkas"
              : "Lihat Semua Jadwal"}

            <ChevronRight
              size={14}
            />
          </button>

        </div>

        {loadingJadwal ? (
          <p className="text-gray-400 text-sm font-medium">
            Memuat jadwal...
          </p>

        ) : jadwalMinggu.length ===
          0 ? (

          <p className="text-gray-400 font-bold text-lg">
            Belum Ada Jadwal
          </p>

        ) : (

          <div className="space-y-6">

            {groupHari.map(
              ({
                hari,
                data,
              }) => {
                if (
                  data.length ===
                  0
                )
                  return null;

                const tampil =
                  showAllMinggu
                    ? data
                    : data.slice(
                        0,
                        2
                      );

                return (
                  <div
                    key={
                      hari
                    }
                  >
                    <h4 className="font-bold text-gray-700 mb-3">
                      {hari}
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

                      {tampil.map(
                        (
                          j
                        ) => (
                          <ScheduleCard
                            key={
                              j.id
                            }
                            type={
                              j.tipe
                            }
                            grade={
                              j.kelas
                            }
                            day={
                              j.hari
                            }
                            date={
                              j.tanggal
                            }
                            subject={
                              j.mapel
                            }
                            teacher={
                              j.guru
                            }
                            time={
                              j.time
                            }
                          />
                        )
                      )}

                    </div>
                  </div>
                );
              }
            )}

          </div>
        )}

      </section>

    </div>
  );
};

export default AdminBeranda;