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

  const [tahunBaru, setTahunBaru] = React.useState("");
  const [ganjilMulai, setGanjilMulai] = React.useState("");
  const [ganjilSelesai, setGanjilSelesai] = React.useState("");
  const [genapMulai, setGenapMulai] = React.useState("");
  const [genapSelesai, setGenapSelesai] = React.useState("");

  return (
    <div className="space-y-8">
      {/* Section 1 : Manajemen Tahun Ajaran */}
    <section className="bg-[#DFDFDF] rounded-2xl p-6 border border-gray-300 shadow-sm">
      {/* Header */}
      <div className="flex items-start gap-3 mb-6">
        <CalendarIcon size={24} className="text-gray-700 mt-1" />

        <div>
          <h3 className="text-xl font-bold text-gray-800">
            Manajemen Tahun Ajaran
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Atur pergantian tahun ajaran dan periode semester dengan aman.
          </p>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* LEFT CONTENT */}
        <div className="xl:col-span-2 space-y-6">

          {/* Tahun Aktif + Tahun Baru */}
          <div className="grid md:grid-cols-2 gap-5">

            {/* Tahun Aktif */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <p className="text-sm text-gray-500 mb-2">
                Tahun Ajaran Aktif
              </p>

              <div className="flex items-center gap-3">
                <h2 className="text-4xl font-black text-gray-800 tracking-tight">
                  2025-2026
                </h2>

                <span className="text-xs font-bold px-3 py-1 rounded-full border border-[#60B873] text-[#60B873] bg-[#E4F5E8]">
                  Aktif
                </span>
              </div>
            </div>

            {/* Tahun Baru */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Tahun Ajaran Baru
              </label>

              <div className="flex items-center bg-[#F8F8F8] border border-gray-300 rounded-xl px-4 py-3">
                <CalendarIcon size={18} className="text-gray-500 mr-3" />

                                <select
                  value={tahunBaru}
                  onChange={(e) => setTahunBaru(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm font-semibold text-gray-800"
                >
                  <option value="">Pilih Tahun Ajaran</option>
                  <option value="2026-2027">2026-2027</option>
                  <option value="2027-2028">2027-2028</option>
                  <option value="2028-2029">2028-2029</option>
                </select>
              </div>
            </div>
          </div>

          {/* Semester */}
          <div className="grid md:grid-cols-2 gap-5">

            {/* Semester Ganjil */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-gray-800">
                  Semester Ganjil
                </h4>

                <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">
                  Semester 1
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">
                    Tanggal Mulai
                  </label>
                    <input
                      type="date"
                      value={ganjilMulai}
                      onChange={(e) => setGanjilMulai(e.target.value)}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#715445]/20"
                    />
                </div>

                <div>
                  <label className="text-xs text-gray-500 block mb-1">
                    Tanggal Selesai
                  </label>
                    <input
                      type="date"
                      value={ganjilSelesai}
                      onChange={(e) => setGanjilSelesai(e.target.value)}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#715445]/20"
                    />
                </div>
              </div>
            </div>

            {/* Semester Genap */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-gray-800">
                  Semester Genap
                </h4>

                <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">
                  Semester 2
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">
                    Tanggal Mulai
                  </label>
                    <input
                      type="date"
                      value={genapMulai}
                      onChange={(e) => setGenapMulai(e.target.value)}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#715445]/20"
                    />
                </div>

                <div>
                  <label className="text-xs text-gray-500 block mb-1">
                    Tanggal Selesai
                  </label>
                    <input
                      type="date"
                      value={genapSelesai}
                      onChange={(e) => setGenapSelesai(e.target.value)}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#715445]/20"
                    />
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* RIGHT PANEL */}
<div>
  <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm h-full flex flex-col">

    <h4 className="font-bold text-gray-800 mb-5">
      Ringkasan Proses
    </h4>

    {(() => {
      const tahunAktif = "2025-2026";
      const aktifAwal = 2025;

      const parseDate = (val) => {
        if (!val) return null;
        const d = new Date(val);
        return isNaN(d.getTime()) ? null : d;
      };

      const gMulai = parseDate(ganjilMulai);
      const gSelesai = parseDate(ganjilSelesai);
      const eMulai = parseDate(genapMulai);
      const eSelesai = parseDate(genapSelesai);

      let statusText = "";
      let statusColor = "";

      if (!tahunBaru) {
        statusText = "Pilih Tahun Ajaran Baru";
        statusColor = "text-red-500";
      } else {
        const baruAwal = parseInt(tahunBaru.split("-")[0]);
        const baruAkhir = parseInt(tahunBaru.split("-")[1]);

        const bulanGMulai = gMulai ? gMulai.getMonth() + 1 : 0;
        const bulanGSelesai = gSelesai ? gSelesai.getMonth() + 1 : 0;
        const bulanEMulai = eMulai ? eMulai.getMonth() + 1 : 0;
        const bulanESelesai = eSelesai ? eSelesai.getMonth() + 1 : 0;

        const durasiGanjil =
          gMulai && gSelesai
            ? Math.floor((gSelesai - gMulai) / (1000 * 60 * 60 * 24))
            : 0;

        const durasiGenap =
          eMulai && eSelesai
            ? Math.floor((eSelesai - eMulai) / (1000 * 60 * 60 * 24))
            : 0;

        const jedaSemester =
          gSelesai && eMulai
            ? Math.floor((eMulai - gSelesai) / (1000 * 60 * 60 * 24))
            : 0;

        /* =========================
           VALIDASI TAHUN AJARAN
        ========================= */
        if (
          isNaN(baruAwal) ||
          isNaN(baruAkhir) ||
          baruAwal <= aktifAwal ||
          baruAkhir !== baruAwal + 1
        ) {
          statusText = "Tahun Ajaran Tidak Valid";
          statusColor = "text-red-500";
        }

        /* =========================
           FIELD BELUM LENGKAP
        ========================= */
        else if (
          !ganjilMulai ||
          !ganjilSelesai ||
          !genapMulai ||
          !genapSelesai
        ) {
          statusText = "Lengkapi Periode Semester";
          statusColor = "text-orange-500";
        }

        /* =========================
           VALIDASI DASAR
        ========================= */
        else if (!gMulai || !gSelesai) {
          statusText = "Tanggal Semester Ganjil Salah";
          statusColor = "text-red-500";
        }

        else if (!eMulai || !eSelesai) {
          statusText = "Tanggal Semester Genap Salah";
          statusColor = "text-red-500";
        }

        else if (gMulai >= gSelesai) {
          statusText = "Rentang Semester Ganjil Tidak Valid";
          statusColor = "text-red-500";
        }

        else if (eMulai >= eSelesai) {
          statusText = "Rentang Semester Genap Tidak Valid";
          statusColor = "text-red-500";
        }

        else if (eMulai <= gSelesai) {
          statusText = "Jadwal Semester Bertabrakan";
          statusColor = "text-red-500";
        }

        /* =========================
           TAHUN HARUS SESUAI
        ========================= */
        else if (
          gMulai.getFullYear() !== baruAwal ||
          gSelesai.getFullYear() !== baruAwal
        ) {
          statusText = `Semester Ganjil Harus Tahun ${baruAwal}`;
          statusColor = "text-red-500";
        }

        else if (
          eMulai.getFullYear() !== baruAkhir ||
          eSelesai.getFullYear() !== baruAkhir
        ) {
          statusText = `Semester Genap Harus Tahun ${baruAkhir}`;
          statusColor = "text-red-500";
        }

        /* =========================
           VALIDASI SEKOLAH SWASTA
           FLEKSIBEL TAPI MASUK AKAL
        ========================= */

        /* Ganjil mulai Mei-Oktober */
        else if (bulanGMulai < 5 || bulanGMulai > 10) {
          statusText = "Awal Semester Ganjil Tidak Umum";
          statusColor = "text-red-500";
        }

        /* Ganjil selesai Nov-Feb */
        else if (![11, 12, 1, 2].includes(bulanGSelesai)) {
          statusText = "Akhir Semester Ganjil Perlu Dicek";
          statusColor = "text-red-500";
        }

        /* Genap mulai Jan-Apr */
        else if (![1, 2, 3, 4].includes(bulanEMulai)) {
          statusText = "Awal Semester Genap Tidak Umum";
          statusColor = "text-red-500";
        }

        /* Genap selesai Mei-Agustus */
        else if (![5, 6, 7, 8].includes(bulanESelesai)) {
          statusText = "Akhir Semester Genap Perlu Dicek";
          statusColor = "text-red-500";
        }

        /* Durasi semester */
        else if (durasiGanjil < 70 || durasiGanjil > 230) {
          statusText = "Durasi Semester Ganjil Tidak Logis";
          statusColor = "text-red-500";
        }

        else if (durasiGenap < 70 || durasiGenap > 230) {
          statusText = "Durasi Semester Genap Tidak Logis";
          statusColor = "text-red-500";
        }

        /* Jeda antar semester */
        else if (jedaSemester > 60) {
          statusText = "Jeda Antar Semester Terlalu Lama";
          statusColor = "text-orange-500";
        }

        else {
          statusText = "Data Valid & Siap Diproses";
          statusColor = "text-green-600";
        }
      }

      const tombolDisable =
        statusText !== "Data Valid & Siap Diproses";

      return (
        <>
          <div className="space-y-4 text-sm">

            <div className="flex justify-between border-b border-gray-100 pb-3">
              <span className="text-gray-500">Tahun Aktif</span>
              <span className="font-semibold text-gray-800">
                {tahunAktif}
              </span>
            </div>

            <div className="flex justify-between border-b border-gray-100 pb-3">
              <span className="text-gray-500">Tahun Baru</span>
              <span className="font-semibold text-gray-800">
                {tahunBaru || "-"}
              </span>
            </div>

            <div className="flex justify-between pb-1">
              <span className="text-gray-500">Status</span>
              <span className={`font-semibold ${statusColor}`}>
                {statusText}
              </span>
            </div>
          </div>

          <div className="mt-5 bg-[#F8F5F3] rounded-xl p-4 text-xs text-gray-600 leading-relaxed">
            Sistem akan menutup tahun ajaran aktif dan menjadikan
            tahun ajaran baru aktif setelah seluruh data valid.
          </div>

          <button
            disabled={tombolDisable}
            className={`mt-auto w-full py-3 rounded-xl font-bold transition-all shadow-sm flex items-center justify-center gap-2 mt-6 ${
              tombolDisable
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#715445] hover:bg-[#5E4236] text-white"
            }`}
          >
            <Plus size={16} />
            Tutup Tahun Ajaran & Buat Baru
          </button>
        </>
      );
    })()}
  </div>
</div>

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
            Unduh Template Excel
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
            Unggah Excel
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
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 text-sm outline-none gfocus:border-gray-500"
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