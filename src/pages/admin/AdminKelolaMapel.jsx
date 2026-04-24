import React, { useEffect, useState } from "react";
import api from "../../lib/axios";
import {
  BookOpen,
  Search,
  Plus,
  Pencil,
  Power,
  Trash2,
  X,
  Check,
} from "lucide-react";

const AdminKelolaMapel = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [nama, setNama] = useState("");
  const [saving, setSaving] = useState(false);

  const [filter, setFilter] = useState("semua");
  const [search, setSearch] = useState("");

  const [showEdit, setShowEdit] = useState(false);
  const [editSaving, setEditSaving] = useState(false);

  const [editData, setEditData] = useState({
    id: "",
    nama: "",
  });

  /* =========================
     LOAD DATA
  ========================= */
  const loadData = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/mapel");
      setList(res.data || []);
    } catch {
      alert("Gagal mengambil data mapel");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  /* =========================
     TAMBAH
  ========================= */
  const tambahMapel = async () => {
    if (!nama.trim()) {
      return alert("Nama mapel wajib diisi");
    }

    try {
      setSaving(true);

      await api.post("/admin/mapel", {
        nama: nama.trim(),
      });

      setNama("");
      loadData();
    } catch (err) {
      alert(
        err.response?.data?.error ||
          "Gagal tambah mapel"
      );
    } finally {
      setSaving(false);
    }
  };

  /* =========================
     EDIT
  ========================= */
  const bukaEdit = (item) => {
    setEditData({
      id: item.id,
      nama: item.nama,
    });

    setShowEdit(true);
  };

  const simpanEdit = async () => {
    if (!editData.nama.trim()) {
      return alert("Nama mapel wajib diisi");
    }

    try {
      setEditSaving(true);

      await api.put(
        `/admin/mapel/${editData.id}`,
        {
          nama: editData.nama.trim(),
        }
      );

      setShowEdit(false);
      loadData();
    } catch {
      alert("Gagal update mapel");
    } finally {
      setEditSaving(false);
    }
  };

  /* =========================
     STATUS
  ========================= */
  const ubahStatus = async (
    id,
    status
  ) => {
    try {
      await api.patch(
        `/admin/mapel/${id}/status`,
        { status }
      );

      loadData();
    } catch {
      alert("Gagal update status");
    }
  };

  /* =========================
     HAPUS
  ========================= */
  const hapusMapel = async (id) => {
    const yakin = window.confirm(
      "Hapus mapel ini?"
    );

    if (!yakin) return;

    try {
      await api.delete(
        `/admin/mapel/${id}`
      );

      loadData();
    } catch {
      alert("Gagal hapus mapel");
    }
  };

  /* =========================
     FILTER
  ========================= */
  const hasil = list.filter((item) => {
    const cocokFilter =
      filter === "semua"
        ? true
        : item.status === filter;

    const cocokSearch =
      item.nama
        .toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||
      item.id
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );

    return (
      cocokFilter &&
      cocokSearch
    );
  });

  return (
    <>
    <section className="space-y-6">

      {/* TAMBAH MAPEL */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">

        <div className="flex flex-col lg:flex-row lg:items-end gap-4">

          <div className="flex-1">

            <h3 className="text-xl font-bold text-gray-800">
              Tambah Mata Pelajaran
            </h3>

            <p className="text-sm text-gray-500 mt-1 mb-4">
              Tambahkan mata pelajaran baru ke sistem.
            </p>

            <input
              type="text"
              value={nama}
              onChange={(e) =>
                setNama(e.target.value)
              }
              placeholder="Contoh: Matematika"
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#715445]/20"
            />

          </div>

          <button
            onClick={tambahMapel}
            disabled={saving}
            className="h-[48px] px-6 bg-[#715445] hover:bg-[#5E4236] text-white rounded-2xl font-semibold flex items-center justify-center gap-2 disabled:opacity-60 transition"
          >
            <Plus size={18} />

            {saving
              ? "Menyimpan..."
              : "Tambah Mapel"}
          </button>

        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">

        {/* HEADER TABLE */}
        <div className="px-6 py-5 border-b border-gray-200 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          <div>
            <h3 className="text-xl font-bold text-gray-800">
              Daftar Mata Pelajaran
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              {hasil.length} data ditemukan
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">

            {/* SEARCH */}
            <input
              type="text"
              placeholder="Cari mapel..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-[280px] max-w-full border border-gray-300 rounded-2xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#715445]/20"
            />

            {/* FILTER */}
            <div className="flex gap-2">

              {[
                "semua",
                "aktif",
                "nonaktif",
              ].map((x) => (
                <button
                  key={x}
                  onClick={() =>
                    setFilter(x)
                  }
                  className={`px-4 py-2 rounded-2xl text-sm font-semibold transition ${
                    filter === x
                      ? "bg-[#715445] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {x}
                </button>
              ))}

            </div>

          </div>
        </div>

        {/* TABLE CONTENT */}
        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-[#F8F8F8] border-b border-gray-200 text-gray-500 uppercase text-[11px]">

              <tr>
                <th className="px-6 py-4 text-left">
                  Kode
                </th>

                <th className="px-6 py-4 text-left">
                  Nama Mata Pelajaran
                </th>

                <th className="px-6 py-4 text-center">
                  Status
                </th>

                <th className="px-6 py-4 text-center">
                  Aksi
                </th>
              </tr>

            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-10 text-gray-400"
                  >
                    Memuat data...
                  </td>
                </tr>
              ) : hasil.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-10 text-gray-400"
                  >
                    Tidak ada data
                  </td>
                </tr>
              ) : (
                hasil.map((item, index) => (
                  <tr
                    key={item.id || index}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >

                    <td className="px-6 py-4 font-semibold text-gray-700">
                      {item.id}
                    </td>

                    <td className="px-6 py-4 font-medium text-gray-800">
                      {item.nama}
                    </td>

                    <td className="px-6 py-4 text-center">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          item.status === "aktif"
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-500"
                        }`}
                      >
                        {item.status}
                      </span>

                    </td>

                    <td className="px-6 py-4">

                      <div className="flex justify-center gap-2 flex-wrap">

                        <button
                          onClick={() =>
                            bukaEdit(item)
                          }
                          className="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 text-xs font-bold"
                        >
                          Edit
                        </button>

                        {item.status ===
                        "aktif" ? (
                          <button
                            onClick={() =>
                              ubahStatus(
                                item.id,
                                "nonaktif"
                              )
                            }
                            className="px-4 py-2 rounded-xl bg-red-50 text-red-600 border border-red-200 text-xs font-bold"
                          >
                            Nonaktifkan
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() =>
                                ubahStatus(
                                  item.id,
                                  "aktif"
                                )
                              }
                              className="px-4 py-2 rounded-xl bg-green-50 text-green-600 border border-green-200 text-xs font-bold"
                            >
                              Aktifkan
                            </button>

                            <button
                              onClick={() =>
                                hapusMapel(
                                  item.id
                                )
                              }
                              className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold"
                            >
                              Hapus
                            </button>
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
      </div>

    </section>

    {/* MODAL EDIT tetap punya kamu */}

      {/* MODAL EDIT */}
      {showEdit && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-6">

            <div className="flex items-center justify-between mb-5">

              <h3 className="text-xl font-bold text-gray-800">
                Edit Mata Pelajaran
              </h3>

              <button
                onClick={() =>
                  setShowEdit(
                    false
                  )
                }
                className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center"
              >
                <X size={18} />
              </button>

            </div>

            <input
              value={
                editData.nama
              }
              onChange={(e) =>
                setEditData({
                  ...editData,
                  nama:
                    e.target
                      .value,
                })
              }
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 mb-5 outline-none focus:ring-2 focus:ring-[#715445]/20"
              placeholder="Nama mapel"
            />

            <div className="grid grid-cols-2 gap-3">

              <button
                onClick={
                  simpanEdit
                }
                disabled={
                  editSaving
                }
                className="bg-[#715445] hover:bg-[#5E4236] text-white py-3 rounded-2xl font-semibold disabled:opacity-60"
              >
                {editSaving
                  ? "Menyimpan..."
                  : "Simpan"}
              </button>

              <button
                onClick={() =>
                  setShowEdit(
                    false
                  )
                }
                className="bg-gray-100 py-3 rounded-2xl font-semibold text-gray-700"
              >
                Batal
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
};

export default AdminKelolaMapel;



