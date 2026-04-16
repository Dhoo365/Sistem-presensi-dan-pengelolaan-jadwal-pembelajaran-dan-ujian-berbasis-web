import React from 'react';
import { Menu, User, Search, ChevronDown, Plus, Pencil, Power } from 'lucide-react';

export default function AdminKelolaGuru() {
  // Data dummy bervariasi untuk menguji tata letak tabel
  const guruData = [
    { id: 'G001', nip: '198507232010011012', nama: 'Budi Setiawan, S.Pd', telepon: '081234567890', status: 'Aktif' },
    { id: 'G002', nip: '199009122015042008', nama: 'Andriano Darinding, S.Kom', telepon: '082345678901', status: 'Aktif' },
    { id: 'G003', nip: '-', nama: 'Eka Sepriadi', telepon: '083456789012', status: 'Honorer' },
    { id: 'G004', nip: '198203152008012015', nama: 'Siti Aminah, M.Pd', telepon: '084567890123', status: 'Aktif' },
    { id: 'G005', nip: '-', nama: 'Rina Melati', telepon: '085678901234', status: 'Nonaktif' },
  ];

  return (
    <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#ECEBEB]">
      <div className="flex-1 overflow-y-auto p-8 pb-20">

        {/* Header */}
        <header className="bg-[#DFDFDF] rounded-2xl p-6 flex justify-between items-center mb-6 border border-gray-300 shadow-sm">
          <div className="flex items-center gap-6">
            <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
              <Menu size={32} className="text-gray-600" />
            </button>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Kelola Guru</h2>
              <p className="text-gray-500 text-sm font-medium">Beranda &gt; Kelola Guru</p>
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
        <div className="bg-[#DFDFDF] rounded-2xl p-6 border border-gray-300 shadow-sm flex flex-col gap-4">

          {/* Top Bar: Search & Filter */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Cari Guru dari nama dan NIP..."
                className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-400 text-sm outline-none focus:border-gray-500 bg-white"
              />
              <Search size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
            <button className="bg-[#715445] hover:bg-[#5E4236] text-white text-sm font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-colors shadow-sm">
              Filter
              <ChevronDown size={18} />
            </button>
          </div>

          {/* Table Area */}
          <div className="bg-white rounded-xl border border-gray-300 w-full overflow-hidden flex-1">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-700 whitespace-nowrap">
                <thead className="bg-[#D3D3D3] text-[11px] uppercase text-gray-600 font-bold border-b border-gray-300">
                  <tr>
                    <th className="px-6 py-4 border-r border-gray-300 text-center w-24">ID GURU</th>
                    <th className="px-6 py-4 border-r border-gray-300 w-48">NIP</th>
                    <th className="px-6 py-4 border-r border-gray-300">NAMA GURU</th>
                    <th className="px-6 py-4 border-r border-gray-300 text-center w-40">NO. TELEPON</th>
                    <th className="px-6 py-4 border-r border-gray-300 text-center w-32">STATUS</th>
                    <th className="px-6 py-4 text-center w-48">AKSI</th>
                  </tr>
                </thead>
                <tbody>
                  {guruData.map((guru, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-3 border-r border-gray-200 text-center font-medium text-gray-900">{guru.id}</td>
                      <td className="px-6 py-3 border-r border-gray-200 font-mono text-xs">{guru.nip}</td>
                      <td className="px-6 py-3 border-r border-gray-200 font-medium">{guru.nama}</td>
                      <td className="px-6 py-3 border-r border-gray-200 text-center">{guru.telepon}</td>
                      <td className="px-6 py-3 border-r border-gray-200 text-center">
                        <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full border ${guru.status === 'Aktif' ? 'bg-[#E4F5E8] text-[#60B873] border-[#60B873]' :
                          guru.status === 'Honorer' ? 'bg-[#FFF3CD] text-[#856404] border-[#FFEEBA]' :
                            'bg-[#FCEAE9] text-[#E16766] border-[#E16766]'
                          }`}>
                          {guru.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-3 flex justify-center gap-2">
                        <button className="bg-[#E8F0FE] text-[#1A73E8] border border-[#1A73E8] hover:bg-blue-100 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors">
                          <Pencil size={14} />
                          Edit
                        </button>
                        <button className="bg-[#FCEAE9] text-[#E16766] border border-[#E16766] hover:bg-red-50 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors">
                          <Power size={14} />
                          Nonaktif
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Keadaan Kosong (Sebagai referensi jika tidak ada data) */}
            {guruData.length === 0 && (
              <div className="py-12 flex flex-col items-center justify-center text-gray-500">
                <User size={48} className="text-gray-300 mb-4" />
                <p className="font-medium">Belum ada data guru terdaftar</p>
              </div>
            )}
          </div>

          {/* Bottom Bar: Add Teacher Form */}
          <div className="bg-white rounded-xl border border-gray-300 p-4 mt-2">
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="ID (Cth: G001)"
                className="w-32 px-4 py-2.5 rounded-lg border border-gray-400 text-sm outline-none focus:border-gray-500 bg-white"
              />
              <input
                type="text"
                placeholder="Nama Lengkap & Gelar"
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-400 text-sm outline-none focus:border-gray-500 bg-white"
              />
              <input
                type="text"
                placeholder="NIP (Kosongkan jika Honorer)"
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-400 text-sm outline-none focus:border-gray-500 bg-white"
              />
              <input
                type="text"
                placeholder="No. Telepon"
                className="w-40 px-4 py-2.5 rounded-lg border border-gray-400 text-sm outline-none focus:border-gray-500 bg-white"
              />
              <button className="bg-[#4A342B] hover:bg-[#36251E] text-white text-sm font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap">
                <Plus size={16} />
                Tambah Guru
              </button>
            </div>
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