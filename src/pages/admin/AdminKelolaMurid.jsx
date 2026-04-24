import React from "react";
import api from "../../lib/axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  Calendar as CalendarIcon,
  CloudUpload,
  ClipboardList,
  Search,
  Filter,
  Plus,
  Download,
  Upload,
} from "lucide-react";

export default function AdminKelolaMurid() {
  /* ===============================
     STATE
  =============================== */
  const [tahunBaru, setTahunBaru] = React.useState("");
  const [ganjilMulai, setGanjilMulai] = React.useState("");
  const [ganjilSelesai, setGanjilSelesai] = React.useState("");
  const [genapMulai, setGenapMulai] = React.useState("");
  const [genapSelesai, setGenapSelesai] = React.useState("");
  const [tahunAktif, setTahunAktif] = React.useState("-");

  const [muridData, setMuridData] = React.useState([]);
  const [kelasList, setKelasList] = React.useState([]);

  const [loading, setLoading] = React.useState(true);
  const [uploadLoading, setUploadLoading] = React.useState(false);

  const [search, setSearch] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState("semua");
  const [filterKelas, setFilterKelas] = React.useState("semua");
  const [filterTahunLulus, setFilterTahunLulus] = React.useState("semua");

  const [excelFile, setExcelFile] = React.useState(null);

  const [showTambah, setShowTambah] = React.useState(false);

  const [formTambah, setFormTambah] = React.useState({
    nis: "",
    nama: "",
    kelas: "",
    nama_ortu: ""
  });

  const [editId, setEditId] = React.useState(null);

  const [editForm, setEditForm] = React.useState({
    nama: "",
    kelas: "",
    nama_ortu: ""
  });

  /* ===============================
     FETCH MASTER
  =============================== */
const fetchMaster = async () => {
  try {
    const kelasRes = await api
      .get("/admin/kelas/aktif")
      .catch(() => ({ data: [] }));

    setKelasList(
      kelasRes.data || []
    );

    const tahunRes = await api
      .get("/admin/tahun-ajaran/aktif")
      .catch(() => ({
        data: { id: "-" },
      }));

    setTahunAktif(
      tahunRes.data?.id || "-"
    );

  } catch (err) {
    console.log(err);
  }
};

  /* ===============================
     FETCH MURID
  =============================== */
  const fetchMurid = async () => {
    try {
      setLoading(true);

      const res = await api.get("/admin/murid");

      setMuridData(res.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMuridLulus = async () => {
    try {
      setLoading(true);

      const res = await api.get("/admin/murid/lulus");

      setMuridData(res.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRollover = async () => {
  try {
    const res = await api.post(
      "/admin/tahun-ajaran/rollover",
      {
        tahunBaru,
        semester1: {
          mulai: ganjilMulai,
          selesai: ganjilSelesai,
        },
        semester2: {
          mulai: genapMulai,
          selesai: genapSelesai,
        },
      }
    );

    await fetchMaster();
    await fetchMurid();

    alert(
      `Berhasil rollover\nNaik kelas: ${res.data.naikKelas}\nLulus: ${res.data.lulus}`
    );

  } catch (err) {
    console.log(err);

    alert(
      err.response?.data?.error ||
      "Gagal rollover"
    );
  }
  };

  /* ===============================
     INIT
  =============================== */
  React.useEffect(() => {
    fetchMaster();
  }, []);

  React.useEffect(() => {
    if (filterStatus === "lulus") {
      fetchMuridLulus();
    } else {
      fetchMurid();
    }
  }, [filterStatus]);

  /* ===============================
     ACTION
  =============================== */
  const toggleStatus = async (murid) => {
    try {
      const statusBaru =
        murid.status === "aktif" ? "nonaktif" : "aktif";

      await api.patch(
        `/admin/murid/${murid.nis}/status`,
        { status: statusBaru }
      );

      fetchMurid();
    } catch (err) {
      console.log(err);
    }
  };

  const saveEdit = async (nis) => {
    try {
      await api.patch(`/admin/murid/${nis}`, {
      nama: editForm.nama,
      kelas: Number(editForm.kelas),
      nama_ortu: editForm.nama_ortu
    });

      setEditId(null);
      fetchMurid();
    } catch (err) {
      console.log(err);
    }
  };

  const hapusMurid = async (nis) => {
    const yakin = window.confirm(
      "Yakin hapus murid ini?"
    );

    if (!yakin) return;

    try {
      await api.delete(`/admin/murid/${nis}`);
      fetchMurid();
    } catch (err) {
      console.log(err);
    }
  };

  const tambahMurid = async () => {
    try {
      await api.post("/admin/murid", {
        nis: formTambah.nis,
        nama: formTambah.nama,
        kelas_id: Number(formTambah.kelas),
        nama_ortu: formTambah.nama_ortu || null
      });

      setShowTambah(false);

      setFormTambah({
        nis: "",
        nama: "",
        kelas: "",
        nama_ortu: ""
      });

      fetchMurid();
    } catch (err) {
      console.log(err);
    }
  };

  const uploadExcel = async () => {
    try {
      if (!excelFile) {
        alert("Pilih file dulu");
        return;
      }

      setUploadLoading(true);

      const formData = new FormData();
      formData.append("file", excelFile);

      await api.post(
        "/admin/murid/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert("Upload berhasil");

      setExcelFile(null);
      fetchMurid();
    } catch (err) {
      console.log(err);
      alert("Upload gagal");
    } finally {
      setUploadLoading(false);
    }
  };

  const downloadTemplate = () => {
    const data = [

      {
        NIS: "M001",
        NAMA: "Rafael Kairupan",
        NAMA_ORANG_TUA: "Yanto Kairupan",
        KELAS: "2"
      },
      {
        NIS: "M002",
        NAMA: "Mikael Runtuwene",
        NAMA_ORANG_TUA: "Maria Runtuwene",
        KELAS: "2"
      }
    ];

    const worksheet =
      XLSX.utils.json_to_sheet(data);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Template"
    );

    const excelBuffer = XLSX.write(
      workbook,
      {
        bookType: "xlsx",
        type: "array",
      }
    );

    const fileData = new Blob(
      [excelBuffer],
      {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }
    );

    saveAs(
      fileData,
      "template_murid.xlsx"
    );
  };

  /* ===============================
     FILTER
  =============================== */
  const filteredData = muridData.filter(
    (m) => {
      const cocokSearch =
        `${m.nis} ${m.nama}`
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const cocokStatus =
        filterStatus === "semua"
          ? true
          : m.status === filterStatus;

      const cocokKelas =
        filterStatus === "lulus"
          ? true
          : filterKelas === "semua"
          ? true
          : String(m.kelas) ===
            String(filterKelas);

      const cocokTahun =
        filterStatus !== "lulus"
          ? true
          : filterTahunLulus ===
            "semua"
          ? true
          : String(m.tahun) ===
            String(filterTahunLulus);

      return (
        cocokSearch &&
        cocokStatus &&
        cocokKelas &&
        cocokTahun
      );
    }
  );

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
                  {tahunAktif}
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
                    onChange={(e) =>
                      setTahunBaru(
                        e.target.value
                      )
                    }
                    className="w-full bg-transparent outline-none text-sm font-semibold text-gray-800"
                  >
                    <option value="">
                      Pilih Tahun Ajaran
                    </option>

                    {(() => {
                      const awal =
                        parseInt(
                          tahunAktif.split("-")[0]
                        ) + 1;

                      const akhir =
                        awal + 1;

                      const nextYear =
                        `${awal}-${akhir}`;

                      return (
                        <option
                          value={nextYear}
                        >
                          {nextYear}
                        </option>
                      );
                    })()}
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

      const parseDate = (val) => {
        if (!val) return null;
        const d = new Date(val);
        return isNaN(d.getTime()) ? null : d;
      };

      const gMulai = parseDate(ganjilMulai);
      const gSelesai = parseDate(ganjilSelesai);
      const eMulai = parseDate(genapMulai);
      const eSelesai = parseDate(genapSelesai);
      const aktifAwal =
      parseInt(
        tahunAktif.split("-")[0]
      ) || 0;

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
           VALIDASI BULAN & DURASI
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
            onClick={handleRollover}
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

      {/* Section 2: Upload Murid Dari Excel */}
      <section className="bg-[#DFDFDF] rounded-2xl p-6 border border-gray-300 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <CloudUpload size={24} className="text-gray-700" />
          <h3 className="font-bold text-xl text-gray-800">Upload Murid Dari Excel</h3>
        </div>
        <p className="text-sm text-gray-600 mb-5 ml-9">
          Upload data murid sekaligus menggunakan file Excel.<br />
          Format Wajib: <strong>NIS, NAMA, NAMA_ORANG_TUA, KELAS.</strong>
        </p>

        <div className="flex items-center gap-4 ml-9">
          <button
          onClick={
          downloadTemplate
          }
          className="bg-[#C5C5C5] hover:bg-[#B0B0B0] text-gray-800 text-sm font-bold px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors border border-gray-400"
          >
          <Download size={16} />
          Unduh Template Excel
          </button>

          <div className="flex items-center bg-[#C5C5C5] border border-gray-400 rounded-lg overflow-hidden">

          <label className="bg-[#8A7B76] text-white text-sm font-bold px-4 py-2.5 flex items-center gap-2 hover:bg-[#736561] cursor-pointer">

          <Upload size={16} />
          Pilih File

          <input
          type="file"
          accept=".xlsx,.xls,.csv"
          hidden
          onChange={(e) =>
          setExcelFile(
          e.target.files[0]
          )}
          />

          </label>
          <span className="text-xs text-gray-700 px-4">
          {excelFile
          ? excelFile.name
          : "Tidak ada file dipilih"}
          </span>
          </div>

          <button
          onClick={uploadExcel}
          disabled={uploadLoading}
          className="bg-[#715445] hover:bg-[#5E4236] text-white text-sm font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
          >
          <Upload size={16} />

          {uploadLoading
          ? "Mengunggah..."
          : "Unggah Excel"}

          </button>
        </div>
      </section>

      {/* Section 3: Daftar Murid */}
    <section className="bg-[#DFDFDF] rounded-2xl p-6 border border-gray-300 shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <ClipboardList size={24} className="text-gray-700" />
        <h3 className="font-bold text-xl text-gray-800">
          Daftar Murid
        </h3>
      </div>

      <p className="text-sm text-gray-600 mb-5 ml-9">
        Upload data murid yang terdaftar di sistem
      </p>

      <div className="ml-9">

        {/* Search + Filter */}
        <div className="flex justify-between items-center mb-4 gap-4 flex-wrap">

          {/* Search */}
          <div className="relative w-80">
            <Search
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Cari NIS atau nama murid..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 text-sm outline-none focus:border-gray-500"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2 flex-wrap">

            <button
              onClick={() =>
                setFilterStatus("aktif")
              }
              className={`text-xs font-bold px-4 py-1.5 rounded-full border ${
                filterStatus === "aktif"
                  ? "bg-[#E4F5E8] text-[#60B873] border-[#60B873]"
                  : "bg-white text-gray-600 border-gray-300"
              }`}
            >
              Aktif
            </button>

            <button
              onClick={() =>
                setFilterStatus("nonaktif")
              }
              className={`text-xs font-bold px-4 py-1.5 rounded-full border ${
                filterStatus === "nonaktif"
                  ? "bg-[#FCEAE9] text-[#E16766] border-[#E16766]"
                  : "bg-white text-gray-600 border-gray-300"
              }`}
            >
              Nonaktif
            </button>

            <button
              onClick={() => {
                setFilterStatus("lulus");
                fetchMuridLulus();
              }}
              className={`text-xs font-bold px-4 py-1.5 rounded-full border ${
                filterStatus === "lulus"
                  ? "bg-[#EBE4F5] text-[#8460B8] border-[#8460B8]"
                  : "bg-white text-gray-600 border-gray-300"
              }`}
            >
              Lulus
            </button>

            <button
              onClick={() =>
                setFilterStatus("semua")
              }
              className={`text-xs font-bold px-4 py-1.5 rounded-full border flex items-center gap-2 ${
                filterStatus === "semua"
                  ? "bg-[#E8F0FE] text-[#1A73E8] border-[#1A73E8]"
                  : "bg-white text-gray-600 border-gray-300"
              }`}
            >
              <Filter size={12} />
              Semua
            </button>

            <select
              value={filterKelas}
              onChange={(e) =>
                setFilterKelas(
                  e.target.value
                )
              }
              className="px-4 py-1.5 rounded-full border border-gray-500 text-xs outline-none"
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


            {filterStatus ===
              "lulus" && (
              <select
                value={
                  filterTahunLulus
                }
                onChange={(e) =>
                  setFilterTahunLulus(
                    e.target.value
                  )
                }
                className="px-4 py-1.5 rounded-full border border-gray-500 text-xs outline-none"
              >
                <option value="semua">
                  Semua Tahun
                </option>

                <option value="2024">
                  2024
                </option>
                <option value="2025">
                  2025
                </option>
                <option value="2026">
                  2026
                </option>
              </select>
            )}
          </div>
        </div>

        {/* TABLE */}
      <div className="bg-white border border-gray-300 rounded-xl overflow-x-auto mb-4 shadow-sm">
        <table className="w-full min-w-[900px] text-sm text-gray-700">
          
<thead className="bg-[#D3D3D3] text-[11px] uppercase text-gray-700 font-bold">
  <tr>
    <th className="px-4 py-3 text-center border-r border-gray-300 w-28">
      NIS
    </th>

    <th className="px-4 py-3 text-left border-r border-gray-300 min-w-[220px]">
      Nama Murid
    </th>

    <th className="px-4 py-3 text-left border-r border-gray-300 min-w-[220px]">
      Nama Orang Tua
    </th>

    <th className="px-4 py-3 text-center border-r border-gray-300 w-28">
      Kelas
    </th>

    <th className="px-4 py-3 text-center border-r border-gray-300 w-36">
      Status
    </th>

    <th className="px-4 py-3 text-center w-48">
      Aksi
    </th>
  </tr>
</thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-8 text-gray-400"
                >
                  Memuat data...
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-8 text-gray-400"
                >
                  Tidak ada data murid
                </td>
              </tr>
          ) : (
            filteredData.map((murid, index) => (
            <tr
              key={murid.nis || index}
              className="border-t border-gray-200 hover:bg-gray-50"
            >
              {/* NIS */}
              <td className="px-4 py-3 text-center border-r border-gray-200 font-medium">
                {murid.nis}
              </td>

              {/* Nama Murid */}
              <td className="px-4 py-3 border-r border-gray-200">
                {editId === murid.nis ? (
                  <input
                    value={editForm.nama}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        nama: e.target.value
                      })
                    }
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  murid.nama
                )}
              </td>

              {/* Nama Orang Tua */}
              <td className="px-4 py-3 border-r border-gray-200">
                {editId === murid.nis ? (
                  <input
                    value={editForm.nama_ortu}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        nama_ortu: e.target.value
                      })
                    }
                    className="border px-2 py-1 rounded w-full"
                    placeholder="Nama Orang Tua"
                  />
                ) : (
                  murid.nama_ortu || "-"
                )}
              </td>

              {/* Kelas */}
              <td className="px-4 py-3 text-center border-r border-gray-200">
                {editId === murid.nis ? (
                  <select
                    value={editForm.kelas}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        kelas: e.target.value
                      })
                    }
                    className="border px-2 py-1 rounded text-sm"
                  >
                    {kelasList.map((k) => (
                      <option key={k.id} value={k.id}>
                        {k.nama}
                      </option>
                    ))}
                  </select>
                ) : (
                  String(murid.kelas).replace("Kelas ", "").trim()
                )}
              </td>

              {/* Status */}
              <td className="px-4 py-3 text-center border-r border-gray-200">
                <span
                  className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
                    murid.status === "aktif"
                      ? "bg-[#E4F5E8] text-[#60B873] border-[#60B873]"
                      : murid.status === "lulus"
                      ? "bg-[#EBE4F5] text-[#8460B8] border-[#8460B8]"
                      : "bg-[#FCEAE9] text-[#E16766] border-[#E16766]"
                  }`}
                >
                  {murid.status}
                </span>
              </td>

              {/* Aksi */}
              <td className="px-4 py-3">
                <div className="flex justify-center items-center gap-2 whitespace-nowrap">
                  {editId === murid.nis ? (
                    <>
                      <button
                        onClick={() => saveEdit(murid.nis)}
                        className="bg-[#E4F5E8] text-[#60B873] border border-[#60B873] px-5 py-1.5 rounded-full text-xs font-bold"
                      >
                        Simpan
                      </button>

                      <button
                        onClick={() => setEditId(null)}
                        className="bg-gray-100 text-gray-600 border border-gray-400 px-5 py-1.5 rounded-full text-xs font-bold"
                      >
                        Batal
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditId(murid.nis);
                          setEditForm({
                            nama: murid.nama,
                            kelas: String(murid.kelas)
                              .replace("Kelas ", "")
                              .trim(),
                            nama_ortu: murid.nama_ortu || ""
                          });
                        }}
                        className="bg-[#E8F0FE] text-[#1A73E8] border border-[#1A73E8] px-5 py-1.5 rounded-full text-xs font-bold"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => toggleStatus(murid)}
                        className="bg-[#FCEAE9] text-[#E16766] border border-[#E16766] px-5 py-1.5 rounded-full text-xs font-bold"
                      >
                        {murid.status === "aktif"
                          ? "Nonaktifkan"
                          : "Aktifkan"}
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

        {/* Add Button */}
        <button
          onClick={() =>
            setShowTambah(true)
          }
          className="w-full border-2 border-dashed border-gray-400 rounded-lg py-3 flex justify-center items-center gap-2 text-gray-600 font-bold text-sm hover:bg-gray-100 transition-colors"
        >
          <Plus size={18} />
          Tambah Murid Baru
        </button>

      </div>

      {showTambah && (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl p-6 w-[420px] space-y-4">

      <h3 className="text-xl font-bold">
      Tambah Murid
      </h3>

      <input
      placeholder="NIS"
      value={formTambah.nis}
      onChange={(e)=>
      setFormTambah({
      ...formTambah,
      nis:e.target.value
      })
      }
      className="w-full border p-3 rounded-xl"
      />

      <input
      placeholder="Nama"
      value={formTambah.nama}
      onChange={(e)=>
      setFormTambah({
      ...formTambah,
      nama:e.target.value
      })
      }
      className="w-full border p-3 rounded-xl"
      />

      <input
      placeholder="Nama Orang Tua"
      value={formTambah.nama_ortu}
      onChange={(e)=>
        setFormTambah({
          ...formTambah,
          nama_ortu:e.target.value
        })
      }
      className="w-full border p-3 rounded-xl"
    />

<select
  value={formTambah.kelas}
  onChange={(e) =>
    setFormTambah({
      ...formTambah,
      kelas:
        e.target.value,
    })
  }
  className="w-full border p-3 rounded-xl"
>
  <option value="">
    Pilih Kelas
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

      <div className="flex gap-3 pt-2">

      <button
      onClick={tambahMurid}
      className="flex-1 bg-[#715445] text-white py-3 rounded-xl font-bold"
      >
      Tambah
      </button>

      <button
      onClick={()=>
      setShowTambah(false)
      }
      className="flex-1 bg-gray-100 py-3 rounded-xl font-bold"
      >
      Batal
      </button>

      </div>

      </div>
      </div>
      )}
    </section>
    </div>
  );
}