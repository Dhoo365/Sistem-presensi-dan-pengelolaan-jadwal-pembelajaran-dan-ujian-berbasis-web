import React from 'react';
import { Menu, User, Search, ChevronDown, Plus } from 'lucide-react';

export default function AdminKelolaKelas() {
  // Data dummy sesuai dengan gambar
  const kelasData = [
    { no: 1, nama: '1a' },
    { no: 2, nama: '2b' },
    { no: 3, nama: '3' },
    { no: 4, nama: '4' },
    { no: 5, nama: '5' },
    { no: 6, nama: '6' },
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
              <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Kelola Kelas</h2>
              <p className="text-gray-500 text-sm font-medium">Beranda &gt; Kelola Kelas</p>
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

          {/* Top Controls */}
          <div className="p-6 border-b border-gray-300 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="relative w-80">
                <input
                  type="text"
                  placeholder="Cari kelas..."
                  className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-400 text-sm outline-none focus:border-gray-500 bg-white"
                />
                <Search size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>

              <button className="bg-[#715445] hover:bg-[#5E4236] text-white text-sm font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-colors">
                Tingkat
                <ChevronDown size={18} />
              </button>
            </div>

            <button className="bg-[#4A342B] hover:bg-[#36251E] text-white text-sm font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-colors">
              <Plus size={18} />
              Tambah Kelas
            </button>
          </div>

          {/* Table Area */}
          <div className="overflow-x-auto p-6">
            <table className="w-full text-center border-collapse border border-gray-300">
              <thead className="bg-[#4A342B] text-white">
                <tr>
                  <th className="px-6 py-4 border border-gray-300 font-semibold w-24">No</th>
                  <th className="px-6 py-4 border border-gray-300 font-semibold w-48 text-left pl-10">Nama Kelas</th>
                  <th className="px-6 py-4 border border-gray-300 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {kelasData.map((kelas, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-5 border border-gray-300 text-lg">{kelas.no}</td>
                    <td className="px-6 py-5 border border-gray-300 text-lg font-bold text-left pl-10">{kelas.nama}</td>
                    <td className="px-6 py-5 border border-gray-300">
                      <div className="flex justify-center">
                        <button className="bg-[#FDF2F2] text-[#E16766] border border-[#FAD7D7] hover:bg-red-50 px-6 py-2 rounded-lg text-sm font-semibold transition-colors">
                          Nonaktifkan
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
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