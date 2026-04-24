import React, { useState, useEffect } from "react";
import { Search, Plus } from "lucide-react";
import api from "../../lib/axios";

export default function AdminKelolaJadwal() {
  const [jadwalData, setJadwalData] = useState([]);
  const [kelasList, setKelasList] = useState([]);
  const [mapelList, setMapelList] = useState([]);
  const [guruList, setGuruList] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filterJenis, setFilterJenis] = useState("semua");
  const [filterKelas, setFilterKelas] = useState("semua");
  const [filterStatus, setFilterStatus] = useState("semua");

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const emptyForm = {
    jenis: "pelajaran",
    kelas: "",
    mapel: "",
    guru: "",
    hari: "",
    tanggal: "",
    mulai: "",
    selesai: "",
  };

  const [form, setForm] = useState(emptyForm);

  /* =============================
     FETCH
  ============================= */
  const fetchJadwal = async () => {
    try {
      setLoading(true);

      const res = await api.get("/admin/jadwal");
      setJadwalData(res.data || []);
    } catch (err) {
      console.log(err);
      setJadwalData([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMaster = async () => {
    try {
      const [kelasRes, mapelRes, guruRes] =
        await Promise.all([
          api.get("/admin/kelas"),
          api.get("/admin/mapel"),
          api.get("/admin/guru"),
        ]);

      setKelasList(kelasRes.data || []);
      setMapelList(mapelRes.data || []);
      setGuruList(guruRes.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchJadwal();
    fetchMaster();
  }, []);

  /* =============================
     CRUD
  ============================= */
  const bukaTambah = () => {
    setEditId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const bukaEdit = (item) => {
    setEditId(item.id);

    setForm({
      jenis: item.tipe,
      kelas: item.kelas,
      mapel: item.id_mapel,
      guru: item.id_guru,
      hari: item.hari || "",
      tanggal: item.tanggal || "",
      mulai: item.mulai?.slice(0, 5),
      selesai: item.selesai?.slice(0, 5),
    });

    setShowModal(true);
  };

  const handleSimpan = async () => {
    try {
      if (
        !form.kelas ||
        !form.mapel ||
        !form.guru ||
        !form.mulai ||
        !form.selesai
      ) {
        alert("Lengkapi data terlebih dahulu");
        return;
      }

      if (
        form.jenis === "pelajaran" &&
        !form.hari
      ) {
        alert("Pilih hari");
        return;
      }

      if (
        form.jenis === "ujian" &&
        !form.tanggal
      ) {
        alert("Pilih tanggal");
        return;
      }

      if (editId) {
        await api.put(
          `/admin/jadwal/${editId}`,
          form
        );
      } else {
        await api.post(
          "/admin/jadwal",
          form
        );
      }

      setShowModal(false);
      setEditId(null);
      setForm(emptyForm);

      fetchJadwal();
    } catch (err) {
      console.log(err);
      alert(
        err.response?.data?.error ||
          "Gagal simpan jadwal"
      );
    }
  };

  const ubahStatus = async (
    id,
    status
  ) => {
    try {
      await api.patch(
        `/admin/jadwal/${id}/status`,
        { status }
      );

      fetchJadwal();
    } catch (err) {
      console.log(err);
      alert("Gagal ubah status");
    }
  };

  const handleHapus = async (
    id
  ) => {
    if (
      !window.confirm(
        "Hapus jadwal ini?"
      )
    )
      return;

    try {
      await api.delete(
        `/admin/jadwal/${id}`
      );

      fetchJadwal();
    } catch (err) {
      console.log(err);
      alert("Gagal hapus jadwal");
    }
  };

  /* =============================
     FILTER
  ============================= */
 const filtered = jadwalData.filter((item) => {
  const cocokSearch =
    (item.mapel || "")
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    (item.guru || "")
      .toLowerCase()
      .includes(search.toLowerCase());

  const cocokJenis =
    filterJenis === "semua"
      ? true
      : item.tipe === filterJenis;

  const cocokKelas =
    filterKelas === "semua"
      ? true
      : String(item.kelas) === String(filterKelas);

  const cocokStatus =
    filterStatus === "semua"
      ? true
      : item.status === filterStatus;

  return (
    cocokSearch &&
    cocokJenis &&
    cocokKelas &&
    cocokStatus
  );
});

  return (
    <>
      <section className="space-y-6">

        {/* HEADER */}
<div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">

  <div className="flex flex-wrap xl:flex-nowrap items-center gap-4">

    {/* SEARCH */}
    <div className="relative flex-1 min-w-[280px]">

      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        placeholder="Cari mapel / guru..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full h-12 border border-gray-300 rounded-2xl pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#715445]/20"
      />

    </div>

    {/* FILTER JENIS */}
    <select
      value={filterJenis}
      onChange={(e) =>
        setFilterJenis(e.target.value)
      }
      className="h-12 min-w-[180px] px-4 border border-gray-300 rounded-2xl text-sm bg-white"
    >
      <option value="semua">
        Semua Jenis
      </option>
      <option value="pelajaran">
        Pelajaran
      </option>
      <option value="ujian">
        Ujian
      </option>
    </select>

    {/* FILTER KELAS */}
    <select
      value={filterKelas}
      onChange={(e) =>
        setFilterKelas(e.target.value)
      }
      className="h-12 min-w-[180px] px-4 border border-gray-300 rounded-2xl text-sm bg-white"
    >
      <option value="semua">
        Semua Kelas
      </option>

      {kelasList.map((k) => (
        <option
          key={k.id}
          value={k.id}
        >
          {k.nama}
        </option>
      ))}
    </select>

    {/* TAB STATUS */}
    <div className="flex items-center gap-2 shrink-0">

      <button
        onClick={() =>
          setFilterStatus("semua")
        }
        className={`h-12 px-4 rounded-2xl text-sm font-semibold transition ${
          filterStatus === "semua"
            ? "bg-[#715445] text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        Semua
      </button>

      <button
        onClick={() =>
          setFilterStatus("aktif")
        }
        className={`h-12 px-4 rounded-2xl text-sm font-semibold transition ${
          filterStatus === "aktif"
            ? "bg-green-600 text-white"
            : "bg-green-50 text-green-700 hover:bg-green-100"
        }`}
      >
        Aktif
      </button>

      <button
        onClick={() =>
          setFilterStatus("nonaktif")
        }
        className={`h-12 px-4 rounded-2xl text-sm font-semibold transition ${
          filterStatus === "nonaktif"
            ? "bg-red-600 text-white"
            : "bg-red-50 text-red-700 hover:bg-red-100"
        }`}
      >
        Nonaktif
      </button>

    </div>

    {/* BUTTON TAMBAH */}
    <button
      onClick={bukaTambah}
      className="h-12 px-6 bg-[#715445] text-white rounded-2xl font-semibold flex items-center gap-2 ml-auto shrink-0 hover:opacity-95 transition"
    >
      <Plus size={18} />
      Tambah Jadwal
    </button>

  </div>

</div>

        {/* TABLE */}
<div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">

  {/* HEADER TABLE */}
  <div className="px-6 py-5 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3">

    <div>
      <h3 className="text-xl font-bold text-gray-800">
        Daftar Jadwal
      </h3>

      <p className="text-sm text-gray-500 mt-1">
        {filtered.length} data ditemukan
      </p>
    </div>

  </div>

  {/* TABLE */}
  <div className="overflow-x-auto">

    <table className="w-full min-w-[1100px] text-sm">

      <thead className="bg-[#F8F8F8] border-b border-gray-200 text-gray-500 uppercase text-[11px] tracking-wide">

        <tr>
          <th className="px-6 py-4 text-left w-[60px]">
            No
          </th>

          <th className="px-6 py-4 text-left w-[120px]">
            Jenis
          </th>

          <th className="px-6 py-4 text-left w-[160px]">
            Hari / Tanggal
          </th>

          <th className="px-6 py-4 text-center w-[150px]">
            Jam
          </th>

          <th className="px-6 py-4 text-center w-[90px]">
            Kelas
          </th>

          <th className="px-6 py-4 text-left w-[220px]">
            Mata Pelajaran
          </th>

          <th className="px-6 py-4 text-left w-[220px]">
            Guru
          </th>

          <th className="px-6 py-4 text-center w-[320px]">
            Aksi
          </th>
        </tr>

      </thead>

      <tbody>

        {loading ? (
          <tr>
            <td
              colSpan="8"
              className="text-center py-12 text-gray-400"
            >
              Memuat data...
            </td>
          </tr>
        ) : filtered.length === 0 ? (
          <tr>
            <td
              colSpan="8"
              className="text-center py-12 text-gray-400"
            >
              Tidak ada data jadwal
            </td>
          </tr>
        ) : (
          filtered.map((item, index) => (
            <tr
              key={item.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition"
            >

              {/* NO */}
              <td className="px-6 py-4 font-semibold text-gray-700">
                {index + 1}
              </td>

              {/* JENIS */}
              <td className="px-6 py-4">

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                    item.tipe === "ujian"
                      ? "bg-red-50 text-red-600"
                      : "bg-green-50 text-green-600"
                  }`}
                >
                  {item.tipe}
                </span>

              </td>

              {/* HARI */}
              <td className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap">
                {item.tipe === "ujian"
                  ? item.tanggal
                  : item.hari}
              </td>

              {/* JAM */}
              <td className="px-6 py-4 text-center font-medium text-gray-700 whitespace-nowrap">
                {item.rentangWaktu}
              </td>

              {/* KELAS */}
              <td className="px-6 py-4 text-center font-semibold text-gray-700">
                {item.kelas}
              </td>

              {/* MAPEL */}
              <td className="px-6 py-4 font-medium text-gray-700">
                {item.mapel}
              </td>

              {/* GURU */}
              <td className="px-6 py-4 text-gray-700">
                {item.guru}
              </td>

              {/* AKSI */}
              <td className="px-6 py-4">

                <div className="flex justify-center items-center gap-2 whitespace-nowrap">

                  {/* EDIT */}
                  <button
                    onClick={() =>
                      bukaEdit(item)
                    }
                    className="min-w-[88px] px-4 py-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 text-xs font-bold hover:bg-blue-100 transition"
                  >
                    Edit
                  </button>

                  {/* STATUS */}
                  {item.status === "aktif" ? (
                    <button
                      onClick={() =>
                        ubahStatus(
                          item.id,
                          "nonaktif"
                        )
                      }
                      className="min-w-[110px] px-4 py-2 rounded-xl bg-red-50 text-red-600 border border-red-200 text-xs font-bold hover:bg-red-100 transition"
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
                        className="min-w-[88px] px-4 py-2 rounded-xl bg-green-50 text-green-600 border border-green-200 text-xs font-bold hover:bg-green-100 transition"
                      >
                        Aktifkan
                      </button>

                      <button
                        onClick={() =>
                          handleHapus(
                            item.id
                          )
                        }
                        className="min-w-[88px] px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition"
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

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

          <div className="bg-white w-full max-w-2xl rounded-3xl p-6 max-h-[90vh] overflow-y-auto">

            <h3 className="text-xl font-bold mb-5">
              {editId
                ? "Edit Jadwal"
                : "Tambah Jadwal"}
            </h3>

            <div className="grid md:grid-cols-2 gap-4">

              <select
                value={
                  form.jenis
                }
                onChange={(
                  e
                ) =>
                  setForm({
                    ...form,
                    jenis:
                      e.target
                        .value,
                  })
                }
                className="border rounded-2xl px-4 py-3"
              >
                <option value="pelajaran">
                  Pelajaran
                </option>
                <option value="ujian">
                  Ujian
                </option>
              </select>

              <select
                value={
                  form.kelas
                }
                onChange={(
                  e
                ) =>
                  setForm({
                    ...form,
                    kelas:
                      e.target
                        .value,
                  })
                }
                className="border rounded-2xl px-4 py-3"
              >
                <option value="">
                  Pilih Kelas
                </option>

                {kelasList.map(
                  (k) => (
                    <option
                      key={
                        k.id
                      }
                      value={
                        k.id
                      }
                    >
                      {k.nama}
                    </option>
                  )
                )}
              </select>

              <select
                value={
                  form.mapel
                }
                onChange={(
                  e
                ) =>
                  setForm({
                    ...form,
                    mapel:
                      e.target
                        .value,
                  })
                }
                className="border rounded-2xl px-4 py-3"
              >
                <option value="">
                  Pilih Mapel
                </option>

                {mapelList.map(
                  (m) => (
                    <option
                      key={
                        m.id
                      }
                      value={
                        m.id
                      }
                    >
                      {m.nama}
                    </option>
                  )
                )}
              </select>

              <select
                value={
                  form.guru
                }
                onChange={(
                  e
                ) =>
                  setForm({
                    ...form,
                    guru:
                      e.target
                        .value,
                  })
                }
                className="border rounded-2xl px-4 py-3"
              >
                <option value="">
                  Pilih Guru
                </option>

                {guruList.map(
                  (g) => (
                    <option
                      key={
                        g.id
                      }
                      value={
                        g.id
                      }
                    >
                      {g.nama}
                    </option>
                  )
                )}
              </select>

              {form.jenis ===
              "pelajaran" ? (
                <select
                  value={
                    form.hari
                  }
                  onChange={(
                    e
                  ) =>
                    setForm({
                      ...form,
                      hari:
                        e
                          .target
                          .value,
                    })
                  }
                  className="border rounded-2xl px-4 py-3"
                >
                  <option value="">
                    Pilih Hari
                  </option>

                  {[
                    "Senin",
                    "Selasa",
                    "Rabu",
                    "Kamis",
                    "Jumat",
                    "Sabtu",
                  ].map(
                    (
                      h
                    ) => (
                      <option
                        key={
                          h
                        }
                        value={
                          h
                        }
                      >
                        {h}
                      </option>
                    )
                  )}
                </select>
              ) : (
                <input
                  type="date"
                  value={
                    form.tanggal
                  }
                  onChange={(
                    e
                  ) =>
                    setForm({
                      ...form,
                      tanggal:
                        e
                          .target
                          .value,
                    })
                  }
                  className="border rounded-2xl px-4 py-3"
                />
              )}

              <input
                type="time"
                value={
                  form.mulai
                }
                onChange={(
                  e
                ) =>
                  setForm({
                    ...form,
                    mulai:
                      e.target
                        .value,
                  })
                }
                className="border rounded-2xl px-4 py-3"
              />

              <input
                type="time"
                value={
                  form.selesai
                }
                onChange={(
                  e
                ) =>
                  setForm({
                    ...form,
                    selesai:
                      e.target
                        .value,
                  })
                }
                className="border rounded-2xl px-4 py-3"
              />

            </div>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() =>
                  setShowModal(
                    false
                  )
                }
                className="px-5 py-3 rounded-2xl bg-gray-100"
              >
                Batal
              </button>

              <button
                onClick={
                  handleSimpan
                }
                className="px-6 py-3 rounded-2xl bg-[#715445] text-white"
              >
                {editId
                  ? "Update Jadwal"
                  : "Simpan Jadwal"}
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}