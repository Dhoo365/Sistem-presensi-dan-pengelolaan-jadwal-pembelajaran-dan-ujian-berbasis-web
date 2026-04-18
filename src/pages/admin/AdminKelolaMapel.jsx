import React from 'react';

const AdminKelolaMapel = () => {
  const dummyData = Array(6).fill({
    id: 'JH1005',
    kelas: '1',
    mapel: 'IPA',
    tanggal: 'Senin 17 April 2026',
    jam: '08:00 - 09:40',
    guru: 'Drs. Mohamad Luwisyah',
    status: 'AKTIF'
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-sans">

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
          Tambah Jadwal Baru
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <input type="text" placeholder="ID Jadwal (Contoh : J001)" className="border border-gray-300 rounded-md p-2.5 text-sm w-full focus:outline-none focus:ring-1 focus:ring-gray-400" />

          <select className="border border-gray-300 rounded-md p-2.5 text-sm w-full focus:outline-none focus:ring-1 focus:ring-gray-400 appearance-none bg-white">
            <option>Pelajaran Harian</option>
          </select>

          <select className="border border-gray-300 rounded-md p-2.5 text-sm w-full focus:outline-none focus:ring-1 focus:ring-gray-400 appearance-none bg-white">
            <option>-- Pilih Mapel --</option>
          </select>

          <select className="border border-gray-300 rounded-md p-2.5 text-sm w-full focus:outline-none focus:ring-1 focus:ring-gray-400 appearance-none bg-white">
            <option>-- Pilih Kelas --</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <select className="border border-gray-300 rounded-md p-2.5 text-sm w-full focus:outline-none focus:ring-1 focus:ring-gray-400 appearance-none bg-white">
            <option>-- Pilih Hari --</option>
          </select>

          <select className="border border-gray-300 rounded-md p-2.5 text-sm w-full focus:outline-none focus:ring-1 focus:ring-gray-400 appearance-none bg-white">
            <option>-- Pilih Guru --</option>
          </select>

          <div className="col-span-2 flex items-center gap-2">
            <input type="text" placeholder="12:30 PM" className="border border-gray-300 rounded-md p-2.5 text-sm w-full focus:outline-none focus:ring-1 focus:ring-gray-400" />
            <span className="text-sm text-gray-500 px-2">Sampai</span>
            <input type="text" placeholder="12:30 PM" className="border border-gray-300 rounded-md p-2.5 text-sm w-full focus:outline-none focus:ring-1 focus:ring-gray-400" />
          </div>
        </div>

        <button className="bg-[#6B5048] hover:bg-[#5a423a] text-white text-sm font-medium py-2.5 px-6 rounded-md transition-colors">
          Simpan Jadwal
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            Daftar Jadwal
          </h2>

          <div className="flex flex-wrap items-center gap-2 text-sm border border-gray-200 rounded-lg p-1 bg-gray-50">
            <button className="px-4 py-1.5 text-green-600 bg-green-50 border border-green-200 rounded-md font-medium">Aktif</button>
            <button className="px-4 py-1.5 text-red-500 hover:bg-gray-100 rounded-md font-medium">Nonaktif</button>
            <button className="px-4 py-1.5 text-blue-500 hover:bg-gray-100 rounded-md font-medium">Semua</button>
            <div className="w-px h-6 bg-gray-300 mx-1"></div>
            <button className="px-4 py-1.5 bg-[#3B82F6] text-white rounded-md font-medium">Tingkat</button>
            <button className="px-4 py-1.5 bg-[#6B5048] text-white rounded-md font-medium">Pelajaran</button>
            <button className="px-4 py-1.5 bg-[#DC2626] text-white rounded-md font-medium">Ujian</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-white">
                <th className="py-4 px-6 text-sm font-semibold text-gray-800">ID</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-800">Kelas</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-800">Mapel</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-800">Hari/Tanggal</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-800">Jam</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-800">Guru</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-800">Status</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-800">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dummyData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 text-sm font-medium text-gray-800">{item.id}</td>
                  <td className="py-4 px-6 text-sm text-gray-800">{item.kelas}</td>
                  <td className="py-4 px-6 text-sm font-bold text-gray-800">{item.mapel}</td>
                  <td className="py-4 px-6 text-sm font-bold text-gray-800">{item.tanggal}</td>
                  <td className="py-4 px-6 text-sm font-bold text-gray-800">{item.jam}</td>
                  <td className="py-4 px-6 text-sm font-bold text-gray-800">{item.guru}</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-500 border border-green-200">
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 flex items-center gap-2">
                    <button className="flex items-center gap-1 px-3 py-1.5 border border-blue-200 text-blue-500 bg-blue-50 hover:bg-blue-100 rounded-md text-xs font-medium transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                      Edit
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 border border-red-200 text-red-500 bg-red-50 hover:bg-red-100 rounded-md text-xs font-medium transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>
                      Nonaktifkan
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminKelolaMapel;