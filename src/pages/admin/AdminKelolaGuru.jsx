import React, { useState, useEffect } from 'react';
import {
  User,
  Search,
  ChevronDown,
  Plus,
  Pencil,
  Power,
  Trash2,
} from "lucide-react";
import api from '../../lib/axios';

export default function AdminKelolaGuru() {
  const [guruData, setGuruData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] =
  useState("aktif");

  const [formNama, setFormNama] = useState('');
  const [formNip, setFormNip] = useState('');
  const [saving, setSaving] = useState(false);

  const isAktif = (status) =>
    (status || '').toLowerCase().trim() === 'aktif';

  const fetchGuru = () => {
    setLoading(true);

    api.get("/admin/guru")
      .then((res) => {
        const data =
          (res.data || []).map(
            (g) => ({
              ...g,
              id:
                g.id_guru ||
                g.id,
              status: (
                g.status ||
                "nonaktif"
              )
                .toLowerCase()
                .trim(),
            })
          );

        setGuruData(data);
      })
      .catch(() => {})
      .finally(() =>
        setLoading(false)
      );
  };

  useEffect(() => {
    fetchGuru();
  }, []);

const handleTambah = async () => {
  if (!formNama.trim()) {
    return alert("Nama guru tidak boleh kosong");
  }

  setSaving(true);

  try {
    await api.post("/admin/guru", {
      nama: formNama,
      nip: formNip || "",
      status: "aktif",
    });

    setFormNama("");
    setFormNip("");

    fetchGuru();
  } catch (err) {
    alert(
      err.response?.data?.error ||
      "Gagal menambah guru"
    );
  } finally {
    setSaving(false);
  }
};

  const handleToggleStatus = async (guru) => {
    const newStatus = isAktif(guru.status)
      ? 'nonaktif'
      : 'aktif';

    try {
      await api.patch(
        `/admin/guru/${guru.id}/status`,
        { status: newStatus }
      );

      fetchGuru();
    } catch {
      alert('Gagal mengubah status');
    }
  };

  const handleHapusGuru =
  async (guru) => {
    const yakin =
      window.confirm(
        `Hapus guru ${guru.nama}?`
      );

    if (!yakin) return;

    try {
      await api.delete(
        `/admin/guru/${guru.id}`
      );

      fetchGuru();

    } catch (err) {
      alert(
        err.response?.data
          ?.error ||
          "Guru tidak bisa dihapus karena sudah pernah digunakan."
      );
    }
  };

const filtered =
  guruData.filter((g) => {
    const cocokCari =
      `${g.nama} ${g.nip}`
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );

    const cocokStatus =
      filterStatus ===
      "semua"
        ? true
        : g.status ===
          filterStatus;

    return (
      cocokCari &&
      cocokStatus
    );
  });

  const [editId, setEditId] =
  useState(null);

const [editForm, setEditForm] =
  useState({
    nama: "",
    nip: "",
  });

  const saveEdit = async () => {
  try {
    await api.put(`/admin/guru/${editId}`, {
  nama: editForm.nama,
  nip: editForm.nip,
});

    setEditId(null);

    fetchGuru();

  } catch (err) {
    alert(
      err.response?.data
        ?.error ||
        "Gagal update guru"
    );
  }
};

  return (
    <div className="bg-[#DFDFDF] rounded-2xl p-6 border border-gray-300 shadow-sm flex flex-col gap-4">

      {/* Top Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Cari Guru dari nama dan NIP..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-400 text-sm outline-none focus:border-gray-500 bg-white"
          />

          <Search
            size={20}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
        </div>
        <button
          onClick={() =>
            setFilterStatus(
              "aktif"
            )
          }
          className={`px-6 py-3 rounded-xl text-sm font-bold transition-colors ${
            filterStatus ===
            "aktif"
              ? "bg-[#715445] text-white"
              : "bg-white border border-gray-300 text-gray-700"
          }`}
        >
          Aktif
        </button>

        <button
          onClick={() =>
            setFilterStatus(
              "nonaktif"
            )
          }
          className={`px-6 py-3 rounded-xl text-sm font-bold transition-colors ${
            filterStatus ===
            "nonaktif"
              ? "bg-[#715445] text-white"
              : "bg-white border border-gray-300 text-gray-700"
          }`}
        >
          Nonaktif
  </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-300 w-full overflow-hidden flex-1">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700 whitespace-nowrap">
            <thead className="bg-[#D3D3D3] text-[11px] uppercase text-gray-600 font-bold border-b border-gray-300">
              <tr>
                <th className="px-6 py-4 border-r border-gray-300 text-center w-24">
                  ID GURU
                </th>
                <th className="px-6 py-4 border-r border-gray-300 w-48">
                  NIP
                </th>
                <th className="px-6 py-4 border-r border-gray-300">
                  NAMA GURU
                </th>
                <th className="px-6 py-4 border-r border-gray-300 text-center w-32">
                  STATUS
                </th>
                <th className="px-6 py-4 text-center w-48">
                  AKSI
                </th>
              </tr>
            </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="6"
                  className="py-10 text-center text-gray-400"
                >
                  Memuat data...
                </td>
              </tr>
            ) : (
              filtered.map((guru, index) => (
                <tr
                  key={guru.id || index}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  {/* ID */}
                  <td className="px-6 py-3 border-r border-gray-200 text-center font-medium text-gray-900">
                    {guru.id?.toString().slice(0, 6) || "-"}
                  </td>

                  {/* NIP */}
                  <td className="px-6 py-3 border-r border-gray-200 text-center">
                    {editId === guru.id ? (
                      <input
                        value={editForm.nip}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            nip: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      />
                    ) : (
                      guru.nip || "-"
                    )}
                  </td>

                  {/* NAMA */}
                  <td className="px-6 py-3 border-r border-gray-200 font-medium">
                    {editId === guru.id ? (
                      <input
                        value={editForm.nama}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            nama: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      />
                    ) : (
                      guru.nama
                    )}
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-3 border-r border-gray-200 text-center">
                    <span
                      className={`text-[10px] font-bold px-3 py-1.5 rounded-full border ${
                        isAktif(guru.status)
                          ? "bg-[#E4F5E8] text-[#60B873] border-[#60B873]"
                          : "bg-[#FCEAE9] text-[#E16766] border-[#E16766]"
                      }`}
                    >
                      {isAktif(guru.status)
                        ? "AKTIF"
                        : "NONAKTIF"}
                    </span>
                  </td>

                  {/* AKSI */}
                  <td className="px-6 py-3">
                    <div className="flex justify-center gap-2">

                      {editId === guru.id ? (
                        <>
                          <button
                            onClick={saveEdit}
                            className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold"
                          >
                            Simpan
                          </button>

                          <button
                            onClick={() =>
                              setEditId(null)
                            }
                            className="bg-gray-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold"
                          >
                            Batal
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setEditId(guru.id);
                              setEditForm({
                                nama: guru.nama || "",
                                nip: guru.nip || "",
                                telepon:
                                  guru.telepon || "",
                              });
                            }}
                            className="bg-[#E8F0FE] text-[#1A73E8] border border-[#1A73E8] px-3 py-1.5 rounded-lg text-xs font-bold"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleToggleStatus(guru)
                            }
                            className="bg-[#FCEAE9] text-[#E16766] border border-[#E16766] px-3 py-1.5 rounded-lg text-xs font-bold"
                          >
                            {isAktif(guru.status)
                              ? "Nonaktifkan"
                              : "Aktifkan"}
                          </button>

                          {!isAktif(guru.status) && (
                            <button
                              onClick={() =>
                                handleHapusGuru(guru)
                              }
                              className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold"
                            >
                              Hapus
                            </button>
                          )}
                        </>
                      )}

                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>  
          </table>
        </div>

        {!loading && filtered.length === 0 && (
          <div className="py-12 flex flex-col items-center justify-center text-gray-500">
            <User
              size={48}
              className="text-gray-300 mb-4"
            />
            <p className="font-medium">
              Belum ada data guru terdaftar
            </p>
          </div>
        )}
      </div>

      {/* Bottom Form */}
        <div className="bg-white rounded-xl border border-gray-300 p-4 mt-2">
  <div className="flex items-center gap-4">

    <input
      type="text"
      placeholder="Nama Lengkap & Gelar"
      value={formNama}
      onChange={(e) => setFormNama(e.target.value)}
      className="flex-1 px-4 py-2.5 rounded-lg border border-gray-400 text-sm outline-none"
    />

    <input
      type="text"
      placeholder="NIP (Kosongkan jika Honorer)"
      value={formNip}
      onChange={(e) => setFormNip(e.target.value)}
      className="flex-1 px-4 py-2.5 rounded-lg border border-gray-400 text-sm outline-none"
    />

    <button
      onClick={handleTambah}
      disabled={saving}
      className="bg-[#4A342B] hover:bg-[#36251E] text-white font-bold px-6 py-2.5 rounded-lg whitespace-nowrap"
    >
      {saving ? "Menyimpan..." : "Tambah Guru"}
    </button>

  </div>

  <p className="text-xs text-gray-500 mt-2">
    ID Guru dibuat otomatis oleh sistem.
  </p>
      </div>
    </div>
  );
}