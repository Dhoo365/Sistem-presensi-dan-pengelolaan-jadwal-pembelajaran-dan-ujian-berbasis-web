import React from 'react';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  School,
  CalendarDays,
  Settings,
  LogOut,
  Menu,
  User,
  CalendarCheck,
  CalendarRange,
  ChevronRight,
  Clock
} from 'lucide-react';

// Sub-komponen untuk Sidebar Link
const SidebarItem = ({ icon: Icon, label, active = false }) => (
  <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${active
    ? 'bg-[#E5E5E5] text-[#3B302B] font-bold shadow-sm'
    : 'text-gray-400 hover:bg-[#4A3D37] hover:text-white'
    }`}>
    <Icon size={20} />
    <span className="text-sm">{label}</span>
  </button>
);

// Sub-komponen untuk Statistik
const StatCard = ({ count, label, subLabel, icon: Icon, colorClass, iconBg }) => (
  <div className={`${colorClass} rounded-2xl p-6 flex items-center gap-5 border shadow-sm transition-transform hover:scale-[1.02]`}>
    <div className={`${iconBg} p-4 rounded-xl text-white shadow-md`}>
      <Icon size={28} />
    </div>
    <div>
      <h3 className="text-3xl font-bold text-gray-800 leading-none">{count}</h3>
      <p className="font-bold text-gray-700 text-sm mt-1">{label}</p>
      <p className="text-[10px] text-gray-500 uppercase tracking-wider">{subLabel}</p>
    </div>
  </div>
);

// Sub-komponen untuk Kartu Jadwal
const ScheduleCard = ({ type, grade, day, subject, teacher, time, date }) => {
  const isExam = type === 'Ujian';
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-200 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className={`absolute left-0 top-0 bottom-0 w-2 ${isExam ? 'bg-[#E16766]' : 'bg-[#60B873]'}`}></div>
      <div className="flex items-center gap-3 mb-4 pl-2">
        <span className={`text-[10px] font-bold px-2 py-1 rounded border uppercase ${isExam
          ? 'bg-[#FCEAE9] text-[#E16766] border-[#E16766]'
          : 'bg-[#E4F5E8] text-[#60B873] border-[#60B873]'
          }`}>
          {type}
        </span>
        <span className="font-bold text-sm text-gray-800">{grade}</span>
      </div>
      <div className="space-y-3 text-xs text-gray-600 pl-2">
        <div className="flex items-center gap-3 font-medium text-gray-800">
          <CalendarDays size={14} className="text-gray-400" />
          <span>{date ? `${day}, ${date}` : day}</span>
        </div>
        <div className="flex items-center gap-3">
          <BookOpen size={14} className="text-gray-400" />
          <span>{subject}</span>
        </div>
        <div className="flex items-center gap-3">
          <User size={14} className="text-gray-400" />
          <span>{teacher}</span>
        </div>
        <div className="flex items-center gap-3">
          <Clock size={14} className="text-gray-400" />
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
};

const AdminBeranda = () => {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          count="2"
          label="Murid Aktif"
          subLabel="Total Murid"
          icon={Users}
          colorClass="bg-[#FDEEDC] border-orange-200"
          iconBg="bg-[#F2A65A]"
        />
        <StatCard
          count="4"
          label="Guru Aktif"
          subLabel="Total Tenaga Pengajar"
          icon={GraduationCap}
          colorClass="bg-[#C8E8D2] border-green-300"
          iconBg="bg-[#5CB874]"
        />
        <StatCard
          count="6"
          label="Mapel Aktif"
          subLabel="Total Mata Pelajaran"
          icon={BookOpen}
          colorClass="bg-[#BBD0E3] border-blue-300"
          iconBg="bg-[#518CB8]"
        />
        <StatCard
          count="12"
          label="Kelas Aktif"
          subLabel="Total Ruang Kelas"
          icon={School}
          colorClass="bg-[#DABEFF] border-purple-300"
          iconBg="bg-[#A366FF]"
        />
      </div>

      {/* Jadwal Hari Ini */}
      <section className="bg-[#DFDFDF] rounded-2xl p-6 border border-gray-300 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <CalendarCheck size={24} className="text-gray-700" />
          <h3 className="font-bold text-xl text-gray-800">Jadwal Hari Ini</h3>
          <span className="ml-2 bg-white/50 border border-gray-400 text-gray-700 text-[10px] font-bold px-3 py-1 rounded-full">
            RABU, 21 MEI 2026
          </span>
        </div>

        <div className="bg-white h-24 min-h-0 md:min-h-24 rounded-2xl py-20 flex flex-col items-center justify-center border border-gray-200 shadow-inner space-y-6jj ">
          <div className="bg-gray-50 p-6 rounded-full mb-4">
            <CalendarRange size={34} className="text-gray-300" />
          </div>
          <div>
            <p className="text-gray-400 font-bold text-base">Tidak Ada Jadwal Untuk Hari Ini</p>
          </div>
        </div>
      </section>

      {/* Jadwal Minggu Ini */}
      <section className="bg-[#DFDFDF] rounded-2xl p-6 border border-gray-300 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <CalendarRange size={24} className="text-gray-700" />
            <h3 className="font-bold text-xl text-gray-800">Jadwal Minggu Ini</h3>
          </div>
          <button className="flex items-center gap-2 bg-white/50 border border-gray-400 hover:bg-white text-gray-700 text-xs font-bold px-4 py-2 rounded-full transition-all">
            Lihat Semua Jadwal <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <ScheduleCard
            type="Pelajaran"
            grade="Kelas 1"
            day="Senin"
            subject="Bahasa Inggris"
            teacher="Andriano Darinding"
            time="08:18 - 10:50"
          />
          <ScheduleCard
            type="Pelajaran"
            grade="Kelas 2"
            day="Senin"
            subject="Sastra Mesin"
            teacher="Budi Setiawan"
            time="08:18 - 10:50"
          />
          <ScheduleCard
            type="Ujian"
            grade="Kelas 3"
            day="Senin"
            date="23 Mei 2026"
            subject="Sastra Mesin"
            teacher="Budi Setiawan"
            time="08:18 - 10:50"
          />
          <ScheduleCard
            type="Ujian"
            grade="Kelas 4"
            day="Senin"
            date="23 Mei 2026"
            subject="Rekayasa Perangkat Lunak"
            teacher="Eka Sepriadi"
            time="08:18 - 10:50"
          />
        </div>
      </section>
    </div>
  );
};

export default AdminBeranda;