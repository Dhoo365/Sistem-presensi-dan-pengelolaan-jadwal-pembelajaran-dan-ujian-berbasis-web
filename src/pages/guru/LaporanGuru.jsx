import { FaDownload } from "react-icons/fa";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import api from "../../lib/axios";
import {
  todayManado,
  monthManado,
  dateTimeManado
} from "../../utils/timezone";

export default function LaporanGuru() {
  const bulanNow = monthManado();

  const daftarBulan = [
    { id: "01", nama: "Januari" },
    { id: "02", nama: "Februari" },
    { id: "03", nama: "Maret" },
    { id: "04", nama: "April" },
    { id: "05", nama: "Mei" },
    { id: "06", nama: "Juni" },
    { id: "07", nama: "Juli" },
    { id: "08", nama: "Agustus" },
    { id: "09", nama: "September" },
    { id: "10", nama: "Oktober" },
    { id: "11", nama: "November" },
    { id: "12", nama: "Desember" },
  ];

  const [tab, setTab] = useState("pengajar");
  const [isWaliKelas, setIsWaliKelas] = useState(false);

  const [tahunList, setTahunList] = useState([]);
  const [tahunId, setTahunId] = useState("");

  const [semesterList, setSemesterList] = useState([]);

  const [opsi, setOpsi] = useState([]);
  const [pilih, setPilih] = useState("");

  const [mode, setMode] = useState("bulan");
  const [timeline, setTimeline] = useState(bulanNow);

  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingMaster, setLoadingMaster] =
    useState(true);

  /* ===============================
     INITIAL
  =============================== */
  useEffect(() => {
    initPage();
  }, []);

  const initPage = async () => {
    try {
      setLoadingMaster(true);

      await Promise.all([
        loadTahun(),
        cekWaliKelas(),
      ]);
    } finally {
      setLoadingMaster(false);
    }
  };

  /* ===============================
     SAAT TAHUN / TAB BERUBAH
  =============================== */
  useEffect(() => {
    if (!tahunId) return;

    loadSemester();
    loadFilter();
  }, [tahunId, tab]);

  /* ===============================
     SAAT FILTER SIAP
  =============================== */
  useEffect(() => {
    if (
      tahunId &&
      pilih &&
      timeline
    ) {
      loadRows();
    }
  }, [tahunId, pilih, timeline, tab]);

  /* ===============================
     API
  =============================== */
  const cekWaliKelas = async () => {
    try {
      const res = await api.get(
        "/guru/laporan/wali/filter"
      );

      setIsWaliKelas(
        (res.data || []).length > 0
      );
    } catch (err) {
      console.log(err);
    }
  };

  const loadTahun = async () => {
    try {
      const res = await api.get(
        "/guru/tahun/list"
      );

      const list = res.data || [];

      setTahunList(list);

      const aktif =
        list.find((x) => x.aktif) ||
        list[0];

      if (aktif) {
        setTahunId(aktif.id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loadSemester = async () => {
    try {
      const res = await api.get(
        `/guru/semester/list?tahun_id=${tahunId}`
      );

      const list = res.data || [];

      setSemesterList(list);

      if (
        mode === "semester" &&
        list.length
      ) {
        setTimeline(
          list.find((x) => x.aktif)
            ?.id ||
            list[0]?.id ||
            ""
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loadFilter = async () => {
    try {
      setRows([]);
      setOpsi([]);
      setPilih("");

      const url =
        tab === "pengajar"
          ? "/guru/laporan/pengajar/filter"
          : "/guru/laporan/wali/filter";

      const res = await api.get(url);

      const list = res.data || [];

      setOpsi(list);

      if (list.length) {
        setPilih(list[0].id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loadRows = async () => {
    try {
      setLoading(true);

      const url =
        tab === "pengajar"
          ? `/guru/laporan/pengajar?jadwal=${pilih}&mode=${mode}&nilai=${timeline}&tahun_id=${tahunId}`
          : `/guru/laporan/wali?kelas=${pilih}&mode=${mode}&nilai=${timeline}&tahun_id=${tahunId}`;

      const res = await api.get(url);

      setRows(res.data || []);
    } catch (err) {
      console.log(err);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     ACTION
  =============================== */
  const handleTab = (val) => {
    setTab(val);
    setMode("bulan");
    setTimeline(bulanNow);
    setSearch("");
  };

  const handleMode = (val) => {
    setMode(val);

    if (val === "hari") {
      setTimeline(todayManado());
    } else if (val === "bulan") {
      setTimeline(bulanNow);
    } else if (val === "semester") {
      const aktif =
        semesterList.find(
          (x) => x.aktif
        )?.id ||
        semesterList[0]?.id ||
        "";

      setTimeline(aktif);
    }
  };

  /* ===============================
     FILTER TABLE
  =============================== */
  const filtered = useMemo(() => {
    return rows.filter((x) =>
      x.nama
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );
  }, [rows, search]);

  /* ===============================
     PDF
  =============================== */
const handlePDF = async () => {
  if (!filtered.length) {
    alert("Tidak ada data.");
    return;
  }

  const LOGO_URL =
    "https://ccehpokvtkamhkhhhsnt.supabase.co/storage/v1/object/public/public-assets/logo.png";

  const doc = new jsPDF("p", "mm", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();
  const center = pageWidth / 2;

  const loadImageBase64 = async (url) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();

      return await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () =>
          resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    } catch {
      return null;
    }
  };

  const formatTanggal =
    dateTimeManado();

  const periodeText = () => {
    if (mode === "hari") return timeline;

    if (mode === "bulan") {
      const bln = daftarBulan.find(
        (x) => x.id === timeline
      );
      return bln?.nama || timeline;
    }

    if (mode === "semester") {
      const smt = semesterList.find(
        (x) => x.id === timeline
      );

      return smt
        ? `${smt.tahun_id} - ${smt.nama}`
        : timeline;
    }

    return "-";
  };

  const totalHadir = filtered.reduce(
    (sum, x) => sum + Number(x.hadir || 0),
    0
  );

  const totalSakit = filtered.reduce(
    (sum, x) => sum + Number(x.sakit || 0),
    0
  );

  const totalIzin = filtered.reduce(
    (sum, x) => sum + Number(x.izin || 0),
    0
  );

  const totalAlpha = filtered.reduce(
    (sum, x) => sum + Number(x.alpha || 0),
    0
  );

  const logoBase64 =
    await loadImageBase64(LOGO_URL);

  /* ===============================
     PAGE 1 HEADER
  =============================== */
  if (logoBase64) {
    doc.addImage(
      logoBase64,
      "PNG",
      14,
      10,
      18,
      18
    );
  }

  doc.setDrawColor(74, 52, 43);
  doc.setLineWidth(0.5);
  doc.line(14, 31, 196, 31);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(74, 52, 43);

  doc.text(
    "SD GMIM 12 MANADO",
    center,
    17,
    { align: "center" }
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(90, 90, 90);

  doc.text(
    "Sistem Presensi dan Penjadwalan Sekolah",
    center,
    23,
    { align: "center" }
  );

  doc.text(
    "Jl. Pingkan Matindas No. 44, Kec. Paal Dua, Kota Manado",
    center,
    28,
    { align: "center" }
  );

  /* TITLE */
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(20, 20, 20);

  doc.text(
    tab === "pengajar"
      ? "LAPORAN REKAP PRESENSI PENGAJAR"
      : "LAPORAN REKAP PRESENSI WALI KELAS",
    center,
    40,
    { align: "center" }
  );

  /* INFO BOX */
  doc.setFillColor(248, 246, 243);
  doc.roundedRect(14, 46, 182, 24, 2, 2, "F");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  doc.text(`Tahun Ajaran : ${tahunId}`, 18, 54);
  doc.text(`Periode : ${periodeText()}`, 18, 60);
  doc.text(`Dicetak : ${formatTanggal}`, 18, 66);
  doc.text(`Jumlah Data : ${filtered.length}`, 110, 54);

  /* SUMMARY */
  const y = 78;
  const w = 42;
  const g = 4;

  const statBox = (
    x,
    title,
    value,
    r,
    gr,
    b
  ) => {
    doc.setFillColor(r, gr, b);
    doc.roundedRect(x, y, w, 18, 2, 2, "F");

    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    doc.text(title, x + 3, y + 7);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(30, 30, 30);
    doc.text(String(value), x + 3, y + 14);
  };

  statBox(
    14,
    "Hadir",
    totalHadir,
    232,
    245,
    233
  );

  statBox(
    14 + w + g,
    "Sakit",
    totalSakit,
    227,
    242,
    253
  );

  statBox(
    14 + (w + g) * 2,
    "Izin",
    totalIzin,
    255,
    248,
    225
  );

  statBox(
    14 + (w + g) * 3,
    "Alpha",
    totalAlpha,
    255,
    235,
    238
  );

  /* ===============================
     TABLE AUTO PAGE
  =============================== */
  autoTable(doc, {
    startY: 102,
    head: [
      [
        "No",
        "Nama",
        "Kelas",
        "Hadir",
        "Sakit",
        "Izin",
        "Alpha",
      ],
    ],
    body: filtered.map((x, i) => [
      i + 1,
      x.nama,
      `Kelas ${x.kelas}`,
      x.hadir,
      x.sakit,
      x.izin,
      x.alpha,
    ]),
    theme: "grid",
    styles: {
      fontSize: 9,
      cellPadding: 3,
      lineColor: [225, 225, 225],
      lineWidth: 0.1,
    },
    headStyles: {
      fillColor: [74, 52, 43],
      textColor: [255, 255, 255],
      halign: "center",
    },
    bodyStyles: {
      halign: "center",
    },
    columnStyles: {
      1: { halign: "left" },
    },
    alternateRowStyles: {
      fillColor: [250, 250, 250],
    },
  });

  /* ===============================
     TANDA TANGAN HALAMAN TERAKHIR TABEL
  =============================== */
  const lastTablePage =
    doc.internal.getNumberOfPages();

  doc.setPage(lastTablePage);

  const finalY =
    doc.lastAutoTable.finalY;

  if (finalY < 240) {
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    doc.text(
      "Mengetahui,",
      145,
      finalY + 12
    );

    doc.text(
      "Wali Kelas",
      145,
      finalY + 18
    );

    doc.text(
      "_____________________",
      145,
      finalY + 40
    );
  }

  /* ===============================
     HALAMAN ANALISIS
  =============================== */
  doc.addPage();

  const analysisPage =
    doc.internal.getNumberOfPages();

  doc.setPage(analysisPage);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(74, 52, 43);

  doc.text(
    "ANALISIS KEHADIRAN",
    center,
    18,
    { align: "center" }
  );

  const totalAll =
    totalHadir +
    totalSakit +
    totalIzin +
    totalAlpha;

  const persen = (n) =>
    totalAll
      ? ((n / totalAll) * 100).toFixed(1)
      : 0;

  const drawBar = (
    yPos,
    label,
    val,
    color,
    pct
  ) => {
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);

    doc.text(label, 20, yPos);

    doc.setFillColor(
      color[0],
      color[1],
      color[2]
    );

    doc.roundedRect(
      52,
      yPos - 4,
      (pct / 100) * 110,
      6,
      1,
      1,
      "F"
    );

    doc.text(
      `${val} (${pct}%)`,
      165,
      yPos
    );
  };

  drawBar(
    50,
    "Hadir",
    totalHadir,
    [34, 197, 94],
    persen(totalHadir)
  );

  drawBar(
    65,
    "Sakit",
    totalSakit,
    [59, 130, 246],
    persen(totalSakit)
  );

  drawBar(
    80,
    "Izin",
    totalIzin,
    [234, 179, 8],
    persen(totalIzin)
  );

  drawBar(
    95,
    "Alpha",
    totalAlpha,
    [239, 68, 68],
    persen(totalAlpha)
  );

  doc.setFillColor(248, 246, 243);
  doc.roundedRect(
    14,
    118,
    182,
    50,
    2,
    2,
    "F"
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(
    "Catatan Evaluasi",
    18,
    130
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  doc.text(
    `• Persentase kehadiran: ${persen(
      totalHadir
    )}%`,
    18,
    140
  );

  doc.text(
    `• Total ketidakhadiran: ${
      totalSakit +
      totalIzin +
      totalAlpha
    }`,
    18,
    148
  );

  doc.text(
    `• Status terbanyak selain hadir: ${
      Math.max(
        totalSakit,
        totalIzin,
        totalAlpha
      ) === totalAlpha
        ? "Alpha"
        : Math.max(
            totalSakit,
            totalIzin,
            totalAlpha
          ) === totalSakit
        ? "Sakit"
        : "Izin"
    }`,
    18,
    156
  );

  /* ===============================
     FOOTER PREMIUM ALL PAGE
  =============================== */
  const totalPages =
    doc.internal.getNumberOfPages();

  for (
    let i = 1;
    i <= totalPages;
    i++
  ) {
    doc.setPage(i);

    doc.setDrawColor(
      220,
      220,
      220
    );

    doc.setLineWidth(0.2);

    doc.line(
      14,
      286,
      196,
      286
    );

    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.setFontSize(8);
    doc.setTextColor(
      110,
      110,
      110
    );

    doc.text(
      "SD GMIM 12 MANADO",
      14,
      291
    );

    doc.text(
      formatTanggal,
      pageWidth / 2,
      291,
      { align: "center" }
    );

    doc.text(
      `Halaman ${i} dari ${totalPages}`,
      196,
      291,
      { align: "right" }
    );
  }

  /* SAVE */
  doc.save(
    tab === "pengajar"
      ? "Laporan-Pengajar.pdf"
      : "Laporan-Wali-Kelas.pdf"
  );
};

  return (
    <div className="p-6 bg-[#F8F6F3] min-h-screen space-y-5">
      {/* TAB */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() =>
            handleTab(
              "pengajar"
            )
          }
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold ${
            tab === "pengajar"
              ? "bg-[#4A342B] text-white"
              : "bg-white border border-gray-300"
          }`}
        >
          Laporan Pengajar
        </button>

        {isWaliKelas && (
          <button
            onClick={() =>
              handleTab(
                "wali"
              )
            }
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold ${
              tab === "wali"
                ? "bg-[#4A342B] text-white"
                : "bg-white border border-gray-300"
            }`}
          >
            Laporan Wali Kelas
          </button>
        )}
      </div>

      {/* FILTER */}
      <div className="bg-white rounded-2xl border border-gray-300 p-5 shadow-sm flex flex-wrap gap-3 justify-between">
        <div className="flex flex-wrap gap-3">
          {/* SEARCH */}
          <div className="relative">
            <input
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Cari siswa..."
              className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 w-64"
            />

            <Search
              size={18}
              className="absolute left-3 top-3 text-gray-400"
            />
          </div>

          {/* TAHUN */}
          <select
            value={tahunId}
            onChange={(e) =>
              setTahunId(
                e.target.value
              )
            }
            className="px-4 py-2.5 rounded-xl border border-gray-300"
          >
            {tahunList.map(
              (x) => (
                <option
                  key={x.id}
                  value={x.id}
                >
                  {x.id}
                </option>
              )
            )}
          </select>

          {/* OPSI */}
          <select
            value={pilih}
            onChange={(e) =>
              setPilih(
                e.target.value
              )
            }
            className="px-4 py-2.5 rounded-xl border border-gray-300 min-w-[260px]"
          >
            {opsi.map((x) => (
              <option
                key={x.id}
                value={x.id}
              >
                {x.label ||
                  x.nama}
              </option>
            ))}
          </select>

          {/* MODE */}
          <select
            value={mode}
            onChange={(e) =>
              handleMode(
                e.target.value
              )
            }
            className="px-4 py-2.5 rounded-xl border border-gray-300"
          >
            <option value="hari">
              Per Hari
            </option>
            <option value="bulan">
              Per Bulan
            </option>
            <option value="semester">
              Per Semester
            </option>
          </select>

          {/* TIMELINE */}
          {mode === "hari" && (
            <input
              type="date"
              value={timeline}
              onChange={(e) =>
                setTimeline(
                  e.target.value
                )
              }
              className="px-4 py-2.5 rounded-xl border border-gray-300"
            />
          )}

          {mode === "bulan" && (
            <select
              value={timeline}
              onChange={(e) =>
                setTimeline(
                  e.target.value
                )
              }
              className="px-4 py-2.5 rounded-xl border border-gray-300"
            >
              {daftarBulan.map(
                (x) => (
                  <option
                    key={x.id}
                    value={x.id}
                  >
                    {x.nama}
                  </option>
                )
              )}
            </select>
          )}

          {mode === "semester" && (
            <select
              value={timeline}
              onChange={(e) => {
                const val =
                  e.target.value;

                setTimeline(val);

                const selected =
                  semesterList.find(
                    (x) =>
                      x.id === val
                  );

                if (
                  selected?.tahun_id &&
                  selected.tahun_id !==
                    tahunId
                ) {
                  setTahunId(
                    selected.tahun_id
                  );
                }
              }}
              className="px-4 py-2.5 rounded-xl border border-gray-300 min-w-[260px]"
            >
              {semesterList.map(
                (x) => (
                  <option
                    key={x.id}
                    value={x.id}
                  >
                    {x.tahun_id} -{" "}
                    {x.nama}
                  </option>
                )
              )}
            </select>
          )}
        </div>

        {/* PDF */}
        <button
          onClick={handlePDF}
          className="flex items-center gap-2 bg-[#4A342B] text-white px-5 py-2.5 rounded-xl hover:opacity-90 transition"
        >
          <FaDownload />
          Unduh PDF
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-gray-300 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 font-bold text-[#4A342B]">
          {tab === "pengajar"
            ? "Rekap Presensi Pengajar"
            : "Rekap Presensi Wali Kelas"}
        </div>

        <table className="w-full text-sm">
          <thead className="bg-[#4A342B] text-white">
            <tr>
              <th className="py-3">
                No
              </th>
              <th className="py-3 text-left">
                Nama
              </th>
              <th className="py-3">
                Kelas
              </th>
              <th className="py-3">
                Hadir
              </th>
              <th className="py-3">
                Sakit
              </th>
              <th className="py-3">
                Izin
              </th>
              <th className="py-3">
                Alpha
              </th>
            </tr>
          </thead>

          <tbody>
            {loadingMaster ||
            loading ? (
              <tr>
                <td
                  colSpan="7"
                  className="py-8 text-center"
                >
                  Memuat...
                </td>
              </tr>
            ) : filtered.length ? (
              filtered.map(
                (
                  x,
                  i
                ) => (
                  <tr
                    key={i}
                    className="border-b hover:bg-[#F8F6F3]"
                  >
                    <td className="py-3 text-center">
                      {i + 1}
                    </td>
                    <td className="py-3">
                      {x.nama}
                    </td>
                    <td className="text-center">
                      Kelas {x.kelas}
                    </td>
                    <td className="text-center text-green-600 font-bold">
                      {x.hadir}
                    </td>
                    <td className="text-center text-blue-600 font-bold">
                      {x.sakit}
                    </td>
                    <td className="text-center text-yellow-600 font-bold">
                      {x.izin}
                    </td>
                    <td className="text-center text-red-600 font-bold">
                      {x.alpha}
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="py-8 text-center text-gray-400"
                >
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}