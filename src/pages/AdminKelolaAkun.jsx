import React from 'react';
import { Menu, User, UserCog } from 'lucide-react';

export default function AdminKelolaAkun() {
  const akunOrangTua = [
    { id: 1, namaWali: 'Bpk. Jefri', waliDari: 'Andriano', username: 'Jefri_nichol' }
  ];

  return (
    <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#ECEBEB] font-sans">
      <div className="flex-1 overflow-hidden p-8 pb-20">

        {/* Header */}
        <header className="bg-[#DFDFDF] rounded-2xl p-6 flex justify-between items-center mb-8 border border-gray-300 shadow-sm">
          <div className="flex items-center gap-6">
            <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
              <Menu size={32} className="text-gray-600" />
            </button>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Kelola Akun</h2>
              <p className="text-gray-500 text-sm font-medium">Beranda &gt; Kelola Akun</p>
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

        {/* Navigation Tabs */}
        <div className="inline-flex items-center bg-[#DFDFDF] border border-gray-300 rounded-full p-1.5 mb-6 shadow-sm">
          <button className="px-6 py-2.5 text-sm font-bold text-gray-700 hover:text-gray-900 transition-colors">
            Kelola Akun Guru
          </button>
          <button className="px-6 py-2.5 text-sm font-bold text-gray-800 bg-[#ECEBEB] border border-gray-400 rounded-full shadow-sm">
            Kelola Akun Orang Tua
          </button>
        </div>

        {/* Main Content Card */}
        <div className="bg-[#DFDFDF] rounded-2xl p-6 border border-gray-300 shadow-sm flex flex-col gap-6">

          {/* Card Header */}
          <div className="flex items-start gap-3">
            <UserCog size={28} className="text-gray-700 mt-1" />
            <div>
              <h3 className="font-bold text-xl text-gray-800">Daftar Akun Orang Tua</h3>
              <p className="text-sm text-gray-600 font-medium">Manajemen akun wali guru</p>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-2xl border border-gray-300 overflow-hidden relative min-h-[300px] shadow-sm">
            {/* Green Left Accent */}
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#60B873]"></div>

            <div className="overflow-x-auto pl-4">
              <table className="w-full text-left text-sm text-gray-700 whitespace-nowrap">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-6 py-5 font-bold text-gray-500 uppercase tracking-wider text-xs">NAMA WALI</th>
                    <th className="px-6 py-5 font-bold text-gray-500 uppercase tracking-wider text-xs">WALI DARI</th>
                    <th className="px-6 py-5 font-bold text-gray-500 uppercase tracking-wider text-xs">USERNAME</th>
                    <th className="px-6 py-5 font-bold text-gray-500 uppercase tracking-wider text-xs text-center w-48">AKSI</th>
                  </tr>
                </thead>
                <tbody className="text-gray-800">
                  {akunOrangTua.map((akun) => (
                    <tr key={akun.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-bold">{akun.namaWali}</td>
                      <td className="px-6 py-4 font-bold">{akun.waliDari}</td>
                      <td className="px-6 py-4 font-bold">{akun.username}</td>
                      <td className="px-6 py-4 flex justify-center">
                        <button className="bg-[#E2E8F0] border border-gray-300 text-gray-800 hover:bg-gray-200 px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-sm">
                          Reset Password
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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