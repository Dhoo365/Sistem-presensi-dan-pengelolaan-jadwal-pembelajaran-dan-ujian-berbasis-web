import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Plus } from 'lucide-react';
import api from '../../lib/axios';

export default function AdminKelolaKelas() {
  const [kelasData, setKelasData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [formNama, setFormNama] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchKelas = () => {
    setLoading(true);
    api.get('/admin/kelas')
      .then((res) => setKelasData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchKelas(); }, []);

  const handleTambah = async () => {
    if (!formNama.trim()) return alert('Nama kelas tidak boleh kosong');
    setSaving(true);
    try {
      await api.post('/admin/kelas', { nama: formNama });
      setFormNama('');
      fetchKelas();
    } catch (err) {
      alert(err.response?.data?.error || 'Gagal menambah kelas');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (kelas) => {
    const newStatus = kelas.status === 'aktif' ? 'nonaktif' : 'aktif';
    try {
      await api.patch(`/admin/kelas/${kelas.id}/status`, { status: newStatus });
      fetchKelas();
    } catch {
      alert('Gagal mengubah status');
    }
  };

  const handleHapus = async (id) => {
  const yakin = window.confirm(
    "Hapus kelas ini?"
  );

  if (!yakin) return;

  try {
    await api.delete(
      `/admin/kelas/${id}`
    );

    fetchKelas();
  } catch (err) {
    alert(
      err.response?.data
        ?.error ||
        "Gagal hapus kelas"
    );
  }
};

  const [filterStatus,
  setFilterStatus] =
  useState("semua");


const filtered =
kelasData.filter((k) => {

  const cocokSearch =
    k.nama
      .toLowerCase()
      .includes(
        search.toLowerCase()
      );

  const cocokStatus =
    filterStatus ===
    "semua"
      ? true
      : String(k.status)
          .toLowerCase()
          .trim() ===
        filterStatus;

  return (
    cocokSearch &&
    cocokStatus
  );
});

  return (
    <div className="bg-white rounded-2xl border border-gray-300 shadow-sm overflow-hidden flex flex-col">
      {/* Top Controls */}
      <div className="p-6 border-b border-gray-300 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="relative w-80">
            <input
              type="text"
              placeholder="Cari kelas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-400 text-sm outline-none focus:border-gray-500 bg-white"
            />
            <Search size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
            <div className="flex gap-2">

            <button
            onClick={() =>
            setFilterStatus(
            "semua"
            )}
            className={`px-4 py-2 rounded-xl text-sm font-bold ${
            filterStatus ===
            "semua"
            ? "bg-[#4A342B] text-white"
            : "bg-gray-100"
            }`}
            >
            Semua
            </button>

            <button
            onClick={() =>
            setFilterStatus(
            "aktif"
            )}
            className={`px-4 py-2 rounded-xl text-sm font-bold ${
            filterStatus ===
            "aktif"
            ? "bg-green-600 text-white"
            : "bg-gray-100"
            }`}
            >
            Aktif
            </button>

            <button
            onClick={() =>
            setFilterStatus(
            "nonaktif"
            )}
            className={`px-4 py-2 rounded-xl text-sm font-bold ${
            filterStatus ===
            "nonaktif"
            ? "bg-red-600 text-white"
            : "bg-gray-100"
            }`}
            >
            Nonaktif
            </button>

            </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Nama kelas baru (cth: 1a)"
            value={formNama}
            onChange={(e) => setFormNama(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-400 text-sm outline-none bg-white w-52"
          />
          <button
            onClick={handleTambah}
            disabled={saving}
            className="bg-[#4A342B] hover:bg-[#36251E] text-white text-sm font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-colors disabled:opacity-60"
          >
            <Plus size={18} />
            {saving ? 'Menyimpan...' : 'Tambah Kelas'}
          </button>
        </div>
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
            {loading ? (
              <tr><td colSpan="3" className="py-10 text-gray-400">Memuat data...</td></tr>
            ) : filtered.map((kelas, index) => (
              <tr key={kelas.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-5 border border-gray-300 text-lg">{index + 1}</td>
                <td className="px-6 py-5 border border-gray-300 text-lg font-bold text-left pl-10">{kelas.nama}</td>
                <td className="px-6 py-5 border border-gray-300">
                <div className="flex justify-center gap-2">

                  <button
                    onClick={() =>
                      handleToggleStatus(kelas)
                    }
                    className={`px-6 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      kelas.status === "aktif"
                        ? "bg-[#FDF2F2] text-[#E16766] border border-[#FAD7D7] hover:bg-red-50"
                        : "bg-[#EAF7EE] text-[#2E7D32] border border-[#B7E1C0] hover:bg-green-50"
                    }`}
                  >
                    {kelas.status === "aktif"
                      ? "Nonaktifkan"
                      : "Aktifkan"}
                  </button>

                  {kelas.status !== "aktif" && (
                    <button
                      onClick={() =>
                        handleHapus(kelas.id)
                      }
                      className="bg-red-600 text-white hover:bg-red-700 px-6 py-2 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Hapus
                    </button>
                  )}

                </div>
                </td>
              </tr>
            ))}
            {!loading && filtered.length === 0 && (
              <tr><td colSpan="3" className="py-10 text-gray-400">Tidak ada data kelas</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}