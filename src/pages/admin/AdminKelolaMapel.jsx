import React, { useState, useEffect } from 'react';
import api from '../../lib/axios';

const AdminKelolaMapel = () => {
  const [jadwalList, setJadwalList] = useState([]);
  const [kelasList, setKelasList] = useState([]);
  const [mapelList, setMapelList] = useState([]);
  const [guruList, setGuruList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [formHari, setFormHari] = useState('');
  const [formMapel, setFormMapel] = useState('');
  const [formKelas, setFormKelas] = useState('');
  const [formGuru, setFormGuru] = useState('');
  const [formJamMulai, setFormJamMulai] = useState('');
  const [formJamSelesai, setFormJamSelesai] = useState('');
  const [formTipe, setFormTipe] = useState('Pelajaran Harian');
  const [saving, setSaving] = useState(false);

  const fetchAll = () => {
    setLoading(true);
    Promise.all([
      api.get('/admin/jadwal'),
      api.get('/admin/kelas'),
      api.get('/admin/mapel'),
      api.get('/admin/guru'),
    ])
      .then(([j, k, m, g]) => {
        setJadwalList(j.data);
        setKelasList(k.data);
        setMapelList(m.data);
        setGuruList(g.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchAll(); }, []);

  const handleSimpan = async () => {
    if (!formHari || !formMapel || !formKelas || !formGuru) {
      return alert('Lengkapi semua field');
    }
    setSaving(true);
    try {
      await api.post('/admin/jadwal', {
        hari: formHari,
        jam_mulai: formJamMulai || '07:00',
        jam_selesai: formJamSelesai || '08:30',
        kelas_id: formKelas,
        mapel_id: formMapel,
        guru_id: formGuru,
        tipe: formTipe === 'Ujian' ? 'Ujian' : 'Pelajaran',
      });
      setFormHari(''); setFormMapel(''); setFormKelas('');
      setFormGuru(''); setFormJamMulai(''); setFormJamSelesai('');
      fetchAll();
    } catch (err) {
      alert(err.response?.data?.error || 'Gagal menyimpan jadwal');
    } finally {
      setSaving(false);
    }
  };

  const handleNonaktifkan = async (id) => {
    try {
      await api.delete(`/admin/jadwal/${id}`);
      fetchAll();
    } catch {
      alert('Gagal menghapus jadwal');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-sans">

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
          Tambah Jadwal Baru
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <select
            value={formTipe}
            onChange={(e) => setFormTipe(e.target.value)}
            className="border border-gray-300 rounded-md p-2.5 text-sm w-full focus:outline-none focus:ring-1 focus:ring-gray-400 appearance-none bg-white"
          >
            <option>Pelajaran Harian</option>
            <option value="Ujian">Ujian</option>
          </select>

          <select
            value={formMapel}
            onChange={(e) => setFormMapel(e.target.value)}
            className="border border-gray-300 rounded-md p-2.5 text-sm w-full focus:outline-none focus:ring-1 focus:ring-gray-400 appearance-none bg-white"
          >
            <option value="">-- Pilih Mapel --</option>
            {mapelList.map((m) => (
              <option key={m.id} value={m.id}>{m.nama}</option>
            ))}
          </select>

          <select
            value={formKelas}
            onChange={(e) => setFormKelas(e.target.value)}
            className="border border-gray-300 rounded-md p-2.5 text-sm w-full focus:outline-none focus:ring-1 focus:ring-gray-400 appearance-none bg-white"
          >
            <option value="">-- Pilih Kelas --</option>
            {kelasList.map((k) => (
              <option key={k.id} value={k.id}>{k.nama}</option>
            ))}
          </select>

          <select
            value={formHari}
            onChange={(e) => setFormHari(e.target.value)}
            className="border border-gray-300 rounded-md p-2.5 text-sm w-full focus:outline-none focus:ring-1 focus:ring-gray-400 appearance-none bg-white"
          >
            <option value="">-- Pilih Hari --</option>
            {["Senin","Selasa","Rabu","Kamis","Jumat"].map((h) => (
              <option key={h}>{h}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <select
            value={formGuru}
            onChange={(e) => setFormGuru(e.target.value)}
            className="border border-gray-300 rounded-md p-2.5 text-sm w-full focus:outline-none focus:ring-1 focus:ring-gray-400 appearance-none bg-white"
          >
            <option value="">-- Pilih Guru --</option>
            {guruList.map((g) => (
              <option key={g.id} value={g.id}>{g.nama}</option>
            ))}
          </select>

          <div className="col-span-2 flex items-center gap-2">
            <input
              type="time"
              value={formJamMulai}
              onChange={(e) => setFormJamMulai(e.target.value)}
              className="border border-gray-300 rounded-md p-2.5 text-sm w-full focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            <span className="text-sm text-gray-500 px-2">Sampai</span>
            <input
              type="time"
              value={formJamSelesai}
              onChange={(e) => setFormJamSelesai(e.target.value)}
              className="border border-gray-300 rounded-md p-2.5 text-sm w-full focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>
        </div>

        <button
          onClick={handleSimpan}
          disabled={saving}
          className="bg-[#6B5048] hover:bg-[#5a423a] text-white text-sm font-medium py-2.5 px-6 rounded-md transition-colors disabled:opacity-60"
        >
          {saving ? 'Menyimpan...' : 'Simpan Jadwal'}
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
                <th className="py-4 px-6 text-sm font-semibold text-gray-800">Kelas</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-800">Mapel</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-800">Hari</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-800">Jam</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-800">Guru</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-800">Tipe</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-800">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan="7" className="py-10 text-center text-gray-400">Memuat data...</td></tr>
              ) : jadwalList.map((item, index) => (
                <tr key={item.id ?? index} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 text-sm font-medium text-gray-800">{item.kelas}</td>
                  <td className="py-4 px-6 text-sm font-bold text-gray-800">{item.mapel}</td>
                  <td className="py-4 px-6 text-sm font-bold text-gray-800">{item.hari}</td>
                  <td className="py-4 px-6 text-sm font-bold text-gray-800">{item.rentangWaktu}</td>
                  <td className="py-4 px-6 text-sm font-bold text-gray-800">{item.guru}</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-500 border border-green-200">
                      {item.tipe ?? 'Pelajaran'}
                    </span>
                  </td>
                  <td className="py-4 px-6 flex items-center gap-2">
                    <button className="flex items-center gap-1 px-3 py-1.5 border border-blue-200 text-blue-500 bg-blue-50 hover:bg-blue-100 rounded-md text-xs font-medium transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleNonaktifkan(item.id)}
                      className="flex items-center gap-1 px-3 py-1.5 border border-red-200 text-red-500 bg-red-50 hover:bg-red-100 rounded-md text-xs font-medium transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {!loading && jadwalList.length === 0 && (
                <tr><td colSpan="7" className="py-10 text-center text-gray-400">Belum ada data jadwal</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminKelolaMapel;