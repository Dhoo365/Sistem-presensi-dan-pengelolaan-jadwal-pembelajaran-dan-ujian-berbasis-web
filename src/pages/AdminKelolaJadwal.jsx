import React from 'react';
import { Menu, User, Search, ChevronDown, Plus, Pencil, Trash2, CalendarDays } from 'lucide-react';

export default function AdminKelolaJadwal() {
  const jadwalData = [
    { id: 1, hari: 'Senin', rentangWaktu: '08:15 - 09:45', kelas: '1a', mapel: 'Bahasa Indonesia', guru: 'Budi Setiawan' },
    { id: 2, hari: 'Senin', rentangWaktu: '09:45 - 11:15', kelas: '1a', mapel: 'Pendidikan Agama', guru: 'Andriano Darinding' },
    { id: 3, hari: 'Selasa', rentangWaktu: '08:15 - 09:45', kelas: '2b', mapel: 'Matematika', guru: 'Siti Aminah' },
    { id: 4, hari: 'Selasa', rentangWaktu: '10:00 - 11:30', kelas: '3', mapel: 'Ilmu Pengetahuan Alam', guru: 'Eka Sepriadi' },
    { id: 5, hari: 'Rabu', rentangWaktu: '08:15 - 09:45', kelas: '4', mapel: 'Bahasa Inggris', guru: 'Rina Melati' },
  ];

  return (
    <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#ECEBEB] font-sans">
      <div className="flex-1 overflow-hidden p-8 pb-20">

        {/* Header */}
        <header className="bg-[#DFDFDF] rounded-2xl p-6 flex justify-between items-center mb-6 border border-gray-300 shadow-sm">
          <div className="flex items-center gap-6">
            <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
              <Menu size={32} className="text-gray-600" />
            </button>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Kelola Jadwal</h2>
              <p className="text-gray-500 text-sm font-medium">Beranda &gt; Kelola Jadwal</p>
            </div>
          </div>
          <div className="flex items-center gap-5 border-l-2 border-gray-400 pl-6">
            <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-white ring-4 ring-gray-200">
              <User size={24} />
            </div>
            <div>
              <p className="font-bold text-gray-800 text-lg leading-none">Admin</p>
              <p className="text-sm text-gray-500 font-medium mt-1">Asep Yanto Kurnawan</p>
            </div>
          </div>
        </header>

        {/* Main Content Wrapper */}
        <div className="bg-white rounded-2xl border border-gray-300 shadow-sm overflow-hidden flex flex-col">

          {/* Top Controls: Search & Complex Filters */}
          <div className="p-6 border-b border-gray-300 flex justify-between items-center bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="relative w-72">
                <input
                  type="text"
                  placeholder="Cari mapel atau nama guru..."
                  className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-gray-400 text-sm outline-none focus:border-gray-500 bg-white"
                />
                <Search size={18} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>

              <button className="bg-white border border-gray-400 text-gray-700 hover:bg-gray-100 text-sm font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors">
                <CalendarDays size={16} />
                Semua Hari
                <ChevronDown size={16} className="ml-1" />
              </button>

              <button className="bg-white border border-gray-400 text-gray-700 hover:bg-gray-100 text-sm font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors">
                Pilih Kelas
                <ChevronDown size={16} className="ml-1" />
              </button>
            </div>

            <button className="bg-[#4A342B] hover:bg-[#36251E] text-white text-sm font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 transition-colors">
              <Plus size={18} />
              Tambah Jadwal Baru
            </button>
          </div>

          {/* Table Area */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-700 whitespace-nowrap border-collapse">
              <thead className="bg-[#4A342B] text-white">
                <tr>
                  <th className="px-6 py-4 border-r border-[#5E4236] font-semibold text-center w-20">No</th>
                  <th className="px-6 py-4 border-r border-[#5E4236] font-semibold w-32">Hari</th>
                  <th className="px-6 py-4 border-r border-[#5E4236] font-semibold text-center w-40">Jam</th>
                  <th className="px-6 py-4 border-r border-[#5E4236] font-semibold text-center w-24">Kelas</th>
                  <th className="px-6 py-4 border-r border-[#5E4236] font-semibold">Mata Pelajaran</th>
                  <th className="px-6 py-4 border-r border-[#5E4236] font-semibold">Guru Pengajar</th>
                  <th className="px-6 py-4 font-semibold text-center w-40">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {jadwalData.map((jadwal, index) => (
                  <tr key={jadwal.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 border-r border-gray-200 text-center font-medium">{index + 1}</td>
                    <td className="px-6 py-4 border-r border-gray-200 font-bold text-gray-900">{jadwal.hari}</td>
                    <td className="px-6 py-4 border-r border-gray-200 text-center font-mono text-xs">{jadwal.rentangWaktu}</td>
                    <td className="px-6 py-4 border-r border-gray-200 text-center font-bold text-[#4A342B]">
                      <span className="bg-[#F3EFEA] px-3 py-1 rounded border border-[#D5C8B8]">{jadwal.kelas}</span>
                    </td>
                    <td className="px-6 py-4 border-r border-gray-200 font-medium">{jadwal.mapel}</td>
                    <td className="px-6 py-4 border-r border-gray-200">{jadwal.guru}</td>
                    <td className="px-6 py-4 flex justify-center gap-2">
                      <button className="bg-[#E8F0FE] text-[#1A73E8] border border-[#1A73E8] hover:bg-blue-100 p-2 rounded-lg transition-colors" title="Edit Jadwal">
                        <Pencil size={16} />
                      </button>
                      <button className="bg-[#FCEAE9] text-[#E16766] border border-[#E16766] hover:bg-red-50 p-2 rounded-lg transition-colors" title="Hapus Jadwal">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}

                {jadwalData.length === 0 && (
                  <tr>
                    <td colSpan="7" className="py-12 text-center text-gray-500">
                      <CalendarDays size={48} className="mx-auto text-gray-300 mb-4" />
                      <p className="font-medium">Belum ada jadwal terdaftar</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>

      </div>

      {/* Footer */}
      <footer className="bg-[#DFDFDF] border-t border-gray-300 py-4 px-8 flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest shrink-0">
        <p>© 2026 SD GMIM 12 MANADO. SEMUA HAK DILINDUNGI.</p>
        <p>SISTEM PRESENSI DAN PENJADWALAN V1.0.0</p>
      </footer>
    </main>
  );
}