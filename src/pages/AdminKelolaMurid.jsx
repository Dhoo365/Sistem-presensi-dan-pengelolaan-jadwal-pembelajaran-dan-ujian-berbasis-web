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
  Calendar as CalendarIcon,
  CloudUpload,
  ClipboardList,
  Search,
  Filter,
  Pencil,
  Power,
  Plus,
  Download,
  Upload
} from 'lucide-react';

// Sub-komponen Sidebar (sebagai referensi tata letak visual)
const SidebarItem = ({ icon: Icon, label, active = false }) => (
  <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${active
    ? 'bg-[#E5E5E5] text-[#3B302B] font-bold shadow-sm'
    : 'text-gray-400 hover:bg-[#4A3D37] hover:text-white'
    }`}>
    <Icon size={20} />
    <span className="text-sm">{label}</span>
  </button>
);

export default function AdminKelolaMurid() {
  const muridData = [
    { nis: 'M001', nama: 'Agus', kelas: 'Kelas 1', status: 'Aktif', tanggal: 'Senin, 23 Mei 2026' },
    { nis: 'M002', nama: 'Budi', kelas: 'Kelas 1', status: 'Aktif', tanggal: 'Senin, 23 Mei 2026' },
    { nis: 'M003', nama: 'Cintra', kelas: 'Kelas 2', status: 'Aktif', tanggal: 'Senin, 23 Mei 2026' },
    { nis: 'M004', nama: 'Daniel', kelas: 'Kelas 2', status: 'aktif', tanggal: 'Senin, 23 Mei 2026' },
    { nis: 'M005', nama: 'Dio', kelas: 'Kelas 3', status: 'Aktif', tanggal: 'Senin, 23 Mei 2026' },
  ];

  return (
    <div className="space-y-8">
      {/* Section 1: Manajemen Tahun Ajaran */}
      <section className="bg-[#DFDFDF] rounded-2xl p-6 border border-gray-300 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <CalendarIcon size={24} className="text-gray-700" />
          <h3 className="font-bold text-xl text-gray-800">Manajemen Tahun Ajaran</h3>
        </div>
        <p className="text-sm text-gray-600 mb-5 ml-9">Pengaturan tahun ajaran dan manajemen kelas murid</p>

        <div className="flex items-center gap-4 ml-9">
          <div className="bg-white px-5 py-3 rounded-xl flex flex-col justify-center border border-gray-200 shadow-sm min-w-[200px]">
            <span className="text-xs text-gray-500 mb-1">Tahun Ajaran Aktif</span>
            <div className="flex items-center gap-3">
              <span className="font-black text-2xl text-gray-800">2025-2026</span>
              <span className="bg-[#E4F5E8] text-[#60B873] text-[10px] font-bold px-3 py-1 rounded-full border border-[#60B873]">Aktif</span>
            </div>
          </div>

          <div className="flex items-center bg-[#ECEBEB] border border-gray-300 rounded-lg px-4 py-3 h-full">
            <CalendarIcon size={16} className="text-gray-500 mr-2" />
            <select className="bg-transparent text-sm font-bold text-gray-700 outline-none pr-4">
              <option>2026-2027</option>
              <option>2027-2028</option>
            </select>
          </div>

          <button className="bg-[#715445] hover:bg-[#5E4236] text-white text-sm font-bold px-6 py-3 rounded-lg flex items-center gap-2 transition-colors shadow-sm">
            <Plus size={16} />
            Tutup Tahun Ajaran & Buat Tahun Baru
          </button>
        </div>
      </section>

      {/* Section 2: Upload Murid Dari CSV */}
      <section className="bg-[#DFDFDF] rounded-2xl p-6 border border-gray-300 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <CloudUpload size={24} className="text-gray-700" />
          <h3 className="font-bold text-xl text-gray-800">Upload Murid Dari CSV</h3>
        </div>
        <p className="text-sm text-gray-600 mb-5 ml-9">
          Upload data murid sekaligus menggunakan file CSV.<br />
          Format Wajib: <strong>NIS, NAMA, KELAS.</strong>
        </p>

        <div className="flex items-center gap-4 ml-9">
          <button className="bg-[#C5C5C5] hover:bg-[#B0B0B0] text-gray-800 text-sm font-bold px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors border border-gray-400">
            <Download size={16} />
            Unduh Template CSV
          </button>

          <div className="flex items-center bg-[#C5C5C5] border border-gray-400 rounded-lg overflow-hidden">
            <button className="bg-[#8A7B76] text-white text-sm font-bold px-4 py-2.5 flex items-center gap-2 hover:bg-[#736561] transition-colors">
              <Upload size={16} />
              Pilih File
            </button>
            <span className="text-xs text-gray-600 px-4">Tidak ada file yang dipilih</span>
          </div>

          <button className="bg-[#715445] hover:bg-[#5E4236] text-white text-sm font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors shadow-sm">
            <Upload size={16} />
            Unggah CSV
          </button>
        </div>
      </section>

      {/* Section 3: Daftar Murid */}
      <section className="bg-[#DFDFDF] rounded-2xl p-6 border border-gray-300 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <ClipboardList size={24} className="text-gray-700" />
          <h3 className="font-bold text-xl text-gray-800">Daftar Murid</h3>
        </div>
        <p className="text-sm text-gray-600 mb-5 ml-9">Upload data murid yang terdaftar di sistem</p>

        <div className="ml-9">
          {/* Search and Filters */}
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-80">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari NIS atau nama murid..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 text-sm outline-none focus:border-gray-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-[#E4F5E8] text-[#60B873] text-xs font-bold px-4 py-1.5 rounded-full border border-[#60B873] cursor-pointer">Aktif</span>
              <span className="bg-[#FCEAE9] text-[#E16766] text-xs font-bold px-4 py-1.5 rounded-full border border-[#E16766] cursor-pointer">Nonaktif</span>
              <span className="bg-[#EBE4F5] text-[#8460B8] text-xs font-bold px-4 py-1.5 rounded-full border border-[#8460B8] cursor-pointer">Lulus</span>
              <button className="bg-white border border-gray-400 text-gray-700 text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-2 hover:bg-gray-50">
                <Filter size={12} />
                Filter
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white border border-gray-300 rounded-lg overflow-hidden mb-4">
            <table className="w-full text-left text-sm text-gray-700">
              <thead className="bg-[#D3D3D3] text-[11px] uppercase text-gray-600 font-bold border-b border-gray-300">
                <tr>
                  <th className="px-6 py-3 border-r border-gray-300 text-center w-24">NIS</th>
                  <th className="px-6 py-3 border-r border-gray-300">NAMA</th>
                  <th className="px-6 py-3 border-r border-gray-300 text-center w-32">KELAS</th>
                  <th className="px-6 py-3 border-r border-gray-300 text-center w-32">STATUS</th>
                  <th className="px-6 py-3 border-r border-gray-300 text-center w-48">TANGGAL DAFTAR</th>
                  <th className="px-6 py-3 text-center">AKSI</th>
                </tr>
              </thead>
              <tbody>
                {muridData.map((murid, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-3 border-r border-gray-200 text-center">{murid.nis}</td>
                    <td className="px-6 py-3 border-r border-gray-200 font-medium">{murid.nama}</td>
                    <td className="px-6 py-3 border-r border-gray-200 text-center">{murid.kelas}</td>
                    <td className="px-6 py-3 border-r border-gray-200 text-center">
                      <span className="bg-[#E4F5E8] text-[#60B873] text-[10px] font-bold px-3 py-1 rounded-full border border-[#60B873] capitalize">
                        {murid.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 border-r border-gray-200 text-center text-xs">{murid.tanggal}</td>
                    <td className="px-6 py-3 flex justify-center gap-2">
                    <button className="bg-[#E8F0FE] text-[#1A73E8] border border-[#1A73E8] hover:bg-blue-100 px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1 transition-colors">
                      <Pencil size={12} />
                      Edit
                    </button>
                    <button className="bg-[#FCEAE9] text-[#E16766] border border-[#E16766] hover:bg-red-50 px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1 transition-colors">
                      <Power size={12} />
                      Nonaktifkan
                    </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Button */}
          <button className="w-full border-2 border-dashed border-gray-400 rounded-lg py-3 flex justify-center items-center gap-2 text-gray-600 font-bold text-sm hover:bg-gray-100 transition-colors">
            <Plus size={18} />
            Tambah Murid Baru
          </button>
        </div>
      </section>
      {/* FOOTER */}
      <footer className="bg-[#DFDFDF] border-t border-gray-300 py-4 px-8 flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest shrink-0">
        <p>© 2026 SD GMIM 12 MANADO. SEMUA HAK DILINDUNGI.</p>
        <p>SISTEM PRESENSI DAN PENJADWALAN V1.0.0</p>
      </footer>
    </div>
  );
}