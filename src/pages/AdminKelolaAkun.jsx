import React from 'react';
import { Menu, User, UserCog } from 'lucide-react';

export default function AdminKelolaAkun() {
  const akunOrangTua = [
    { id: 1, namaWali: 'Bpk. Jefri', waliDari: 'Andriano', username: 'Jefri_nichol' }
  ];

  return (
    <>
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
    </>
  );
}