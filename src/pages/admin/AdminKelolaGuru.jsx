import React, { useState, useEffect } from 'react';
import { Menu, User, Search, ChevronDown, Plus, Pencil, Power } from 'lucide-react';
import api from '../../lib/axios';

export default function AdminKelolaGuru() {
  const [guruData, setGuruData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Form tambah guru
  const [formId, setFormId] = useState('');
  const [formNama, setFormNama] = useState('');
  const [formNip, setFormNip] = useState('');
  const [formTelepon, setFormTelepon] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchGuru = () => {
    setLoading(true);
    api.get('/admin/guru')
      .then((res) => setGuruData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchGuru(); }, []);

  const handleTambah = async () => {
    if (!formNama.trim()) return alert('Nama guru tidak boleh kosong');
    setSaving(true);
    try {
      await api.post('/admin/guru', {
        id: formId || undefined,
        nip: formNip || '-',
        nama: formNama,
        telepon: formTelepon || '-',
        status: 'Aktif',
      });
      setFormId(''); setFormNama(''); setFormNip(''); setFormTelepon('');
      fetchGuru();
    } catch (err) {
      alert(err.response?.data?.error || 'Gagal menambah guru');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (guru) => {
    const newStatus = guru.status === 'Aktif' ? 'Nonaktif' : 'Aktif';
    try {
      await api.patch(`/admin/guru/${guru.id}/status`, { status: newStatus });
      fetchGuru();
    } catch {
      alert('Gagal mengubah status');
    }
  };

  const filtered = guruData.filter((g) =>
    `${g.nama} ${g.nip}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#DFDFDF] rounded-2xl p-6 border border-gray-300 shadow-sm flex flex-col gap-4">

      {/* Top Bar: Search & Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Cari Guru dari nama dan NIP..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
              {loading ? (
                <tr><td colSpan="6" className="py-10 text-center text-gray-400">Memuat data...</td></tr>
              ) : filtered.map((guru, index) => (
                <tr key={guru.id ?? index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 border-r border-gray-200 text-center font-medium text-gray-900">{guru.id?.toString().slice(0, 6) ?? '-'}</td>
                  <td className="px-6 py-3 border-r border-gray-200 font-mono text-xs">{guru.nip}</td>
                  <td className="px-6 py-3 border-r border-gray-200 font-medium">{guru.nama}</td>
                  <td className="px-6 py-3 border-r border-gray-200 text-center">{guru.telepon}</td>
                  <td className="px-6 py-3 border-r border-gray-200 text-center">
                    <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full border ${guru.status === 'Aktif' ? 'bg-[#E4F5E8] text-[#60B873] border-[#60B873]' :
                      guru.status === 'Honorer' ? 'bg-[#FFF3CD] text-[#856404] border-[#FFEEBA]' :
                        'bg-[#FCEAE9] text-[#E16766] border-[#E16766]'
                      }`}>
                      {(guru.status || '-').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-3 flex justify-center gap-2">
                    <button className="bg-[#E8F0FE] text-[#1A73E8] border border-[#1A73E8] hover:bg-blue-100 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors">
                      <Pencil size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleToggleStatus(guru)}
                      className="bg-[#FCEAE9] text-[#E16766] border border-[#E16766] hover:bg-red-50 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Power size={14} />
                      {guru.status === 'Aktif' ? 'Nonaktif' : 'Aktifkan'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Keadaan Kosong */}
        {!loading && filtered.length === 0 && (
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
            value={formId}
            onChange={(e) => setFormId(e.target.value)}
            className="w-32 px-4 py-2.5 rounded-lg border border-gray-400 text-sm outline-none focus:border-gray-500 bg-white"
          />
          <input
            type="text"
            placeholder="Nama Lengkap & Gelar"
            value={formNama}
            onChange={(e) => setFormNama(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-400 text-sm outline-none focus:border-gray-500 bg-white"
          />
          <input
            type="text"
            placeholder="NIP (Kosongkan jika Honorer)"
            value={formNip}
            onChange={(e) => setFormNip(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-400 text-sm outline-none focus:border-gray-500 bg-white"
          />
          <input
            type="text"
            placeholder="No. Telepon"
            value={formTelepon}
            onChange={(e) => setFormTelepon(e.target.value)}
            className="w-40 px-4 py-2.5 rounded-lg border border-gray-400 text-sm outline-none focus:border-gray-500 bg-white"
          />
          <button
            onClick={handleTambah}
            disabled={saving}
            className="bg-[#4A342B] hover:bg-[#36251E] text-white text-sm font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap disabled:opacity-60"
          >
            <Plus size={16} />
            {saving ? 'Menyimpan...' : 'Tambah Guru'}
          </button>
        </div>
      </div>
      {/* FOOTER */}
      <footer className="bg-[#DFDFDF] border-t border-gray-300 py-4 px-8 flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest shrink-0">
        <p>© 2026 SD GMIM 12 MANADO. SEMUA HAK DILINDUNGI.</p>
        <p>SISTEM PRESENSI DAN PENJADWALAN V1.0.0</p>
      </footer>
    </div>
  );
}
