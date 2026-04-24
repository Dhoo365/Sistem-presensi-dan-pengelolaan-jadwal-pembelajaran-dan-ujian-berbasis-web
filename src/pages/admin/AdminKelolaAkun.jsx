import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Search,
  KeyRound,
  Power,
  Trash2,
  UserCog,
  Mail,
  Plus,
  X,
  Loader2
} from "lucide-react";
import api from "../../lib/axios";


export default function AdminKelolaAkun() {
  const [tab, setTab] = useState("guru");
  const [status, setStatus] = useState("semua");
  const [kelas, setKelas] = useState("semua");
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showBuat, setShowBuat] = useState(false);
  const [buatTarget, setBuatTarget] = useState(null);
  const [buatEmail, setBuatEmail] = useState("");
  const [buatLoading, setBuatLoading] = useState(false);

  const [showEmail, setShowEmail] = useState(false);
  const [emailTarget, setEmailTarget] = useState(null);
  const [emailBaru, setEmailBaru] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);

  // FIX 1: useCallback supaya load stabil di dependency array
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/admin/akun/${tab}`);
      setRows(Array.isArray(data) ? data : []);
    } catch {
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => {
    setRows([]);
    setSearch("");
    setStatus("semua");
    setKelas("semua");
    load();
  }, [load]);

const filtered = useMemo(() => {
  return rows.filter((r) => {
    const txt =
      `${r.nama || ""} ${r.email || ""} ${r.nip || ""} ${r.kelas || ""}`
      .toLowerCase();

    const okSearch =
      txt.includes(search.toLowerCase());

    const rowStatus =
      (r.status || "").toLowerCase();

    const okStatus =
      status === "semua"
        ? rowStatus !== "dihapus"
        : rowStatus === status.toLowerCase();

    const okKelas =
      kelas === "semua" ||
      String(r.kelas) === String(kelas);

    return okSearch && okStatus && okKelas;
  });
}, [rows, search, status, kelas]);

  const resetPass = async (id) => {
    if (!window.confirm("Reset password akun ini ke default?")) return;
    try {
      await api.post(`/admin/akun/${id}/reset`);
      alert("Password berhasil direset");
    } catch {
      alert("Gagal reset password");
    }
  };

  const ubahStatus = async (r) => {
    // FIX 2: cegah aksi jika belum punya akun
    if (!r.email) return alert("Akun login belum dibuat.");
    try {
      await api.patch(`/admin/akun/${r.id}/status`, {
        status: r.status === "aktif" ? "nonaktif" : "aktif",
      });
      load();
    } catch {
      alert("Gagal ubah status akun");
    }
  };

  // FIX 3: hanya satu fungsi hapus (duplikat dihapus)
  const hapus = async (r) => {
    if (!r.email) return alert("Belum ada akun yang perlu dihapus.");
    if (!window.confirm(`Yakin hapus akun "${r.nama}"?`)) return;
    try {
      await api.delete(`/admin/akun/${r.id}`);
      load();
    } catch {
      alert("Gagal hapus akun");
    }
  };

  const bukaBuatAkun = (r) => {
    setBuatTarget({ id: r.id, nama: r.nama, type: tab });
    setBuatEmail("");
    setShowBuat(true);
  };

  // FIX 4: fungsi untuk buat akun baru (guru atau ortu)
  const simpanBuatAkun = async () => {
    if (!buatEmail.trim() || !buatEmail.includes("@")) {
      return alert("Masukkan email yang valid");
    }
    setBuatLoading(true);
    try {
      await api.post(`/admin/akun/${buatTarget.type}/${buatTarget.id}`, {
        email: buatEmail.trim(),
        nama: buatTarget.nama,
      });
      setShowBuat(false);
      load();
    } catch (err) {
      alert(err?.response?.data?.error || "Gagal membuat akun");
    } finally {
      setBuatLoading(false);
    }
  };

  const simpanEmail = async () => {
  if (!emailBaru.trim() || !emailBaru.includes("@")) {
    return alert("Masukkan email valid");
  }

  setEmailLoading(true);

  try {
    await api.patch(
      `/admin/akun/${emailTarget.id}/email`,
      {
        email: emailBaru.trim()
      }
    );

    alert("Email berhasil diperbarui");

    setShowEmail(false);
    load();

  } catch (err) {
    alert(
      err?.response?.data?.error ||
      "Gagal ganti email"
    );
  } finally {
    setEmailLoading(false);
  }
};

const restore = async (id) => {
  try {
    await api.patch(`/admin/akun/${id}/restore`);
    load();
  } catch {
    alert("Gagal memulihkan akun");
  }
};

  return (
    <>
      <main className="flex-1 min-h-screen bg-[#f5f5f5] p-8">
        <div className="inline-flex rounded-2xl border border-black/20 bg-white p-1 mb-6 shadow-sm">
          {["guru", "ortu"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition ${
                tab === t ? "bg-[#715445] text-white" : "text-black/70 hover:bg-black/5"
              }`}
            >
              {t === "guru" ? "Akun Guru" : "Akun Orang Tua"}
            </button>
          ))}
        </div>

        <section className="rounded-3xl border border-black/20 bg-white shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-black/10 flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl border border-black/15 flex items-center justify-center">
              <UserCog size={20} className="text-black/80" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-black/90">
                {tab === "guru" ? "Kelola Akun Guru" : "Kelola Akun Orang Tua"}
              </h1>
              <p className="text-sm text-black/55">Manajemen akun login pengguna sistem</p>
            </div>
          </div>

          <div className="p-6 border-b border-black/10 flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[260px]">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nama, email..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-black/15 bg-white outline-none focus:border-black/40"
              />
            </div>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-4 py-3 rounded-2xl border border-black/15 text-black/75"
            >
              <option value="semua">Semua Status</option>
              <option value="aktif">Aktif</option>
              <option value="nonaktif">Nonaktif</option>
              <option value="dihapus">Arsip</option>
            </select>

            {tab === "ortu" && (
              <select
                value={kelas}
                onChange={(e) => setKelas(e.target.value)}
                className="px-4 py-3 rounded-2xl border border-black/15 text-black/75"
              >
                <option value="semua">Semua Kelas</option>
                {[1, 2, 3, 4, 5, 6].map((k) => (
                  <option key={k} value={k}>Kelas {k}</option>
                ))}
              </select>
            )}
          </div>

          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/10 bg-black/[0.02]">
                  <th className="px-6 py-4 text-left font-semibold text-black/70">Nama</th>
                  <th className="px-6 py-4 text-left font-semibold text-black/70">
                    {tab === "guru" ? "NIP" : "Kelas"}
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-black/70">Akun Login</th>
                  <th className="px-6 py-4 text-left font-semibold text-black/70">Status</th>
                  <th className="px-6 py-4 text-left font-semibold text-black/70">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5" className="px-6 py-10 text-center text-black/45">Memuat data...</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan="5" className="px-6 py-10 text-center text-black/45">Tidak ada data</td></tr>
                ) : (
                  filtered.map((r, i) => (
                    <tr key={`${r.id}-${i}`} className="border-b border-black/5 hover:bg-black/[0.02]">
                      <td className="px-6 py-4 font-medium text-black/85">{r.nama}</td>
                      <td className="px-6 py-4 text-black/55 text-xs">
                        {tab === "guru" ? r.nip || "-" : r.kelas ? `Kelas ${r.kelas}` : "-"}
                      </td>

                      {/* FIX 5: badge status akun login yang informatif */}
                      <td className="px-6 py-4">
                        {r.email ? (
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
                            Sudah dibuat
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-black/40 border border-black/10">
                            Belum ada akun
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                          r.status === "aktif"
                            ? "border-black/15 text-black/75 bg-black/[0.03]"
                            : "border-black/10 text-black/45 bg-black/[0.02]"
                        }`}>
                          {r.status}
                        </span>
                      </td>

                      {/* FIX 6: aksi berbeda tergantung sudah punya akun atau belum */}
                      <td className="px-6 py-4">
                        <div className="flex gap-2 flex-wrap">

                          {r.status === "dihapus" ? (
                            <button
                              title="Pulihkan"
                              onClick={() => restore(r.id)}
                              className="w-9 h-9 rounded-xl border border-green-200 text-green-600 flex items-center justify-center hover:bg-green-50"
                            >
                              ↺
                            </button>
                          ) : (
                            <>
                              {/* Ganti Email */}
                              <button
                                title={r.email ? "Ganti Email" : "Buat Akun"}
                                onClick={() => {
                                  if (r.email) {
                                    setEmailTarget(r);
                                    setEmailBaru("");
                                    setShowEmail(true);
                                  } else {
                                    bukaBuatAkun(r);
                                  }
                                }}
                                className="w-9 h-9 rounded-xl border border-black/10 flex items-center justify-center hover:bg-black/5"
                              >
                                <Mail size={16} />
                              </button>

                              {/* Reset Password */}
                              <button
                                title="Reset Password"
                                onClick={() => resetPass(r.id)}
                                className="w-9 h-9 rounded-xl border border-black/10 flex items-center justify-center hover:bg-black/5"
                              >
                                <KeyRound size={16} />
                              </button>

                              {/* Aktif / Nonaktif */}
                              <button
                                title={r.status === "aktif" ? "Nonaktifkan" : "Aktifkan"}
                                onClick={() => ubahStatus(r)}
                                className="w-9 h-9 rounded-xl border border-black/10 flex items-center justify-center hover:bg-black/5"
                              >
                                <Power size={16} />
                              </button>

                              {/* Arsipkan */}
                              <button
                                title="Arsipkan Akun"
                                onClick={() => hapus(r)}
                                className="w-9 h-9 rounded-xl border border-red-200 text-red-600 flex items-center justify-center hover:bg-red-50"
                              >
                                <Trash2 size={16} />
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
        </section>
      </main>

      {/* Modal Buat Akun */}
      {showEmail && emailTarget && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-6">

            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-xl font-bold">
                  Ganti Email
                </h3>
                <p className="text-sm text-gray-500">
                  {emailTarget.nama}
                </p>
              </div>

              <button
                onClick={() => setShowEmail(false)}
                className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>

            <input
              type="email"
              value={emailBaru}
              onChange={(e) =>
                setEmailBaru(e.target.value)
              }
              placeholder="emailbaru@gmail.com"
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 mb-5"
            />

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={simpanEmail}
                disabled={emailLoading}
                className="bg-black text-white py-3 rounded-2xl font-semibold"
              >
                {emailLoading
                  ? "Menyimpan..."
                  : "Simpan"}
              </button>

              <button
                onClick={() => setShowEmail(false)}
                className="bg-gray-100 py-3 rounded-2xl font-semibold"
              >
                Batal
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Modal Buat Akun */}
      {showBuat && buatTarget && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-6">

            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-xl font-bold">
                  Buat Akun Login
                </h3>
                <p className="text-sm text-gray-500">
                  {buatTarget.nama}
                </p>
              </div>

              <button
                onClick={() => setShowBuat(false)}
                className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>

            <input
              type="email"
              value={buatEmail}
              onChange={(e) => setBuatEmail(e.target.value)}
              placeholder="email@gmail.com"
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 mb-3"
            />

            <p className="text-xs text-gray-500 mb-5">
              Password default: 12345678
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={simpanBuatAkun}
                disabled={buatLoading}
                className="bg-black text-white py-3 rounded-2xl font-semibold"
              >
                {buatLoading ? "Membuat..." : "Buat Akun"}
              </button>

              <button
                onClick={() => setShowBuat(false)}
                className="bg-gray-100 py-3 rounded-2xl font-semibold"
              >
                Batal
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}