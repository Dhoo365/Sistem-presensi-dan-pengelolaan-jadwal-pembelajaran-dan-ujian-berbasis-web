const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase");
const requireAuth = require("../middleware/auth");

/* ===================================================
   AMBIL DATA ANAK MILIK ORTU LOGIN
   support 1 ortu punya banyak anak
=================================================== */
router.get("/anak", requireAuth, async (req, res) => {
  try {

    console.log("========== DEBUG ORTU /ANAK ==========");
    console.log("USER LOGIN:", req.user);
    console.log("USER ID:", req.user?.id);
    const { data, error } = await supabase
      .from("ortu_anak")
      .select(`
        nis,
        murid (
          nis,
          nama
        )
      `)
      .eq("ortu_id", req.user.id);
      console.log("HASIL QUERY ortu_anak:");
      console.log(data);

    if (error) throw error;

    const hasil = await Promise.all(
      (data || []).map(async (item) => {
        const nis = item.nis;

        // ambil kelas aktif siswa
        const { data: kelasData } = await supabase
          .from("kelas_siswa")
          .select(`
            kelas,
            kelas_ref:kelas (
              nama
            )
          `)
          .eq("nis", nis)
          .eq("status", "aktif")
          .limit(1)
          .maybeSingle();

        return {
          nis,
          nama: item.murid?.nama || "-",
          kelas:
            kelasData?.kelas_ref?.nama
              ? `Kelas ${kelasData.kelas_ref.nama}`
              : "-",
        };
      })
    );

    res.json(hasil);

  } catch (err) {
    res.status(500).json({
      error: "Gagal mengambil data anak",
    });
  }
});

/* ===================================================
   DASHBOARD ORTU BERDASARKAN NIS ANAK
=================================================== */
router.get("/dashboard/:nis", requireAuth, async (req, res) => {
  try {
    const { nis } = req.params;

    // =========================
    // tanggal & hari sekarang
    // =========================
    const now = new Date();

    const today = now.toISOString().split("T")[0];

    const hariMap = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];

    const hariIni = hariMap[now.getDay()];

    const awalBulan = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    )
      .toISOString()
      .split("T")[0];

    // =========================
    // ambil kelas aktif siswa
    // =========================
    const { data: kelasRows, error: errKelas } =
      await supabase
        .from("kelas_siswa")
        .select("kelas")
        .eq("nis", nis)
        .eq("status", "aktif")
        .order("id", {
          ascending: false,
        })
        .limit(1);

    if (errKelas) throw errKelas;

    const kelasAktif =
      kelasRows &&
      kelasRows.length > 0
        ? kelasRows[0].kelas
        : null;

    if (!kelasAktif) {
      return res.json({
        hariIni: [],
        ringkasan: {
          Hadir: 0,
          Izin: 0,
          Sakit: 0,
          Alpha: 0,
        },
        updateTerakhir: "-",
      });
    }

    // =========================
    // ambil jadwal hari ini
    // =========================
    const { data: jadwalHari, error: errJadwal } =
      await supabase
        .from("jadwal")
        .select("*")
        .eq("kelas", kelasAktif)
        .eq("status", "aktif")
        .eq("hari", hariIni)
        .eq("jenis", "pelajaran")
        .order("mulai");

    if (errJadwal) throw errJadwal;

    // =========================
    // ambil absensi hari ini
    // =========================
    const { data: absenHari, error: errAbsen } =
      await supabase
        .from("absensi")
        .select("*")
        .eq("nis", nis)
        .eq("tanggal", today);

    if (errAbsen) throw errAbsen;

    // =========================
    // ambil absensi bulan ini
    // =========================
    const { data: bulanIni, error: errBulan } =
      await supabase
        .from("absensi")
        .select("status")
        .eq("nis", nis)
        .gte("tanggal", awalBulan);

    if (errBulan) throw errBulan;

    // =========================
    // ringkasan bulan ini
    // =========================
    const ringkasan = {
      Hadir: 0,
      Izin: 0,
      Sakit: 0,
      Alpha: 0,
    };

    (bulanIni || []).forEach((x) => {
      const s = (
        x.status || ""
      ).toLowerCase();

      if (s === "hadir")
        ringkasan.Hadir++;
      else if (s === "izin")
        ringkasan.Izin++;
      else if (s === "sakit")
        ringkasan.Sakit++;
      else ringkasan.Alpha++;
    });

    // =========================
    // gabung jadwal + absensi
    // =========================
    const hasil = [];

    let updateTerakhir = "-";

    for (const j of jadwalHari || []) {
      let namaMapel = "-";
      let namaGuru = "-";

      // mapel
      const { data: mapelRows } =
        await supabase
          .from("mapel")
          .select("nama")
          .eq("id_mapel", j.id_mapel)
          .limit(1);

      if (
        mapelRows &&
        mapelRows.length > 0
      ) {
        namaMapel =
          mapelRows[0].nama;
      }

      // guru
      const { data: guruRows } =
        await supabase
          .from("guru")
          .select("nama")
          .eq("id_guru", j.id_guru)
          .limit(1);

      if (
        guruRows &&
        guruRows.length > 0
      ) {
        namaGuru =
          guruRows[0].nama;
      }

      // cari absensi cocok mapel
      const absen =
        (absenHari || []).find(
          (a) =>
            a.id_mapel ===
            j.id_mapel
        );

      const status =
        absen?.status ||
        "belum dipresensi";

      const jam =
        String(
          j.mulai
        ).slice(0, 5);

      if (
        status !== "belum dipresensi"
      ) {
        updateTerakhir = jam;
      }

      hasil.push({
        mapel: namaMapel,
        guru: namaGuru,
        jam,
        status,
      });
    }

    res.json({
      hariIni: hasil,
      ringkasan,
      updateTerakhir,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

/* ===================================================
   JADWAL BERDASARKAN NIS ANAK
=================================================== */
router.get("/jadwal/:nis", requireAuth, async (req, res) => {
  try {
    const { nis } = req.params;

    const { data: kelasRows, error: errKelas } =
      await supabase
        .from("kelas_siswa")
        .select("kelas")
        .eq("nis", nis)
        .eq("status", "aktif")
        .limit(1);

    if (errKelas) throw errKelas;

    const kelasAktif =
      kelasRows && kelasRows.length
        ? kelasRows[0].kelas
        : null;

    if (!kelasAktif) {
      return res.json({
        pelajaran: {},
        ujian: {},
      });
    }

    const { data: rows, error } =
      await supabase
        .from("jadwal")
        .select("*")
        .eq("kelas", kelasAktif)
        .eq("status", "aktif")
        .order("mulai");

    if (error) throw error;

    const hariList = [
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat"
    ];

    const pelajaran = {};
    const ujian = {};

    hariList.forEach((h) => {
      pelajaran[h] = [];
      ujian[h] = [];
    });

    for (const j of rows || []) {
      let namaMapel = "-";
      let namaGuru = "-";

      const { data: mapel } =
        await supabase
          .from("mapel")
          .select("nama")
          .eq("id_mapel", j.id_mapel)
          .limit(1);

      if (mapel && mapel.length)
        namaMapel = mapel[0].nama;

      const { data: guru } =
        await supabase
          .from("guru")
          .select("nama")
          .eq("id_guru", j.id_guru)
          .limit(1);

      if (guru && guru.length)
        namaGuru = guru[0].nama;

      const item = {
        jam: `${String(j.mulai).slice(0,5)} - ${String(j.selesai).slice(0,5)}`,
        mapel: namaMapel,
        guru: namaGuru,
      };

      if (
        (j.jenis || "").toLowerCase() === "ujian"
      ) {
        if (j.hari && ujian[j.hari])
          ujian[j.hari].push(item);
      } else {
        if (j.hari && pelajaran[j.hari])
          pelajaran[j.hari].push(item);
      }
    }

    res.json({
      pelajaran,
      ujian
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});
/* =================================================== */
router.get("/", (req, res) => {
  res.json({
    message: "ortu aktif",
  });
});

module.exports = router;