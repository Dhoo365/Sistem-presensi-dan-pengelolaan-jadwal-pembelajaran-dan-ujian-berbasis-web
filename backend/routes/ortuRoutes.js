const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase");
const requireAuth = require("../middleware/auth");

const {
  todayManado,
  timeManado,
  dayNameManado,
} = require("../utils/timezone");

/* ===================================================
   GET DATA ANAK ORTU LOGIN
=================================================== */
router.get("/anak", requireAuth, async (req, res) => {
  try {
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

    if (error) throw error;

    const hasil = await Promise.all(
      (data || []).map(async (item) => {
        const { data: kelasData } = await supabase
          .from("kelas_siswa")
          .select(`
            kelas,
            kelas_ref:kelas (
              nama
            )
          `)
          .eq("nis", item.nis)
          .eq("status", "aktif")
          .limit(1)
          .maybeSingle();

        return {
          nis: item.nis,
          nama: item.murid?.nama || "-",
          kelas: kelasData?.kelas_ref?.nama
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
   DASHBOARD ORTU
=================================================== */
router.get("/dashboard/:nis", requireAuth, async (req, res) => {
  try {
    const { nis } = req.params;

    const today = todayManado();
    const hariIni = dayNameManado();
    const awalBulan = `${today.slice(0, 8)}01`;

    /* kelas aktif */
    const { data: kelasRows, error: errKelas } =
      await supabase
        .from("kelas_siswa")
        .select("kelas")
        .eq("nis", nis)
        .eq("status", "aktif")
        .order("id", { ascending: false })
        .limit(1);

    if (errKelas) throw errKelas;

    const kelasAktif =
      kelasRows?.length > 0
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

    /* jadwal pelajaran hari ini */
    const { data: pelajaranHari, error: errPel } =
      await supabase
        .from("jadwal")
        .select("*")
        .eq("kelas", kelasAktif)
        .eq("status", "aktif")
        .eq("jenis", "pelajaran")
        .eq("hari", hariIni);

    if (errPel) throw errPel;

    /* jadwal ujian hari ini */
    const { data: ujianHari, error: errUj } =
      await supabase
        .from("jadwal")
        .select("*")
        .eq("kelas", kelasAktif)
        .eq("status", "aktif")
        .eq("jenis", "ujian")
        .eq("tanggal", today);

    if (errUj) throw errUj;

    const jadwalHari = [
      ...(pelajaranHari || []),
      ...(ujianHari || []),
    ].sort((a, b) =>
      String(a.mulai).localeCompare(
        String(b.mulai)
      )
    );

    /* absensi hari ini */
    const { data: absenHari, error: errAbsen } =
      await supabase
        .from("absensi")
        .select("*")
        .eq("nis", nis)
        .eq("tanggal", today);

    if (errAbsen) throw errAbsen;

    /* ringkasan bulan ini */
    const { data: bulanIni, error: errBulan } =
      await supabase
        .from("absensi")
        .select("status")
        .eq("nis", nis)
        .gte("tanggal", awalBulan);

    if (errBulan) throw errBulan;

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

    /* update terakhir */
    let updateTerakhir = "-";

    if (absenHari?.length > 0) {
      const sorted = [...absenHari].sort(
        (a, b) =>
          new Date(b.created_at) -
          new Date(a.created_at)
      );

      updateTerakhir =
        timeManado(
          sorted[0].created_at
        ) + " WITA";
    }

    /* ambil mapel & guru */
    const hasil = [];

    for (const j of jadwalHari) {
      let namaMapel = "-";
      let namaGuru = "-";

      const { data: mapel } =
        await supabase
          .from("mapel")
          .select("nama")
          .eq("id_mapel", j.id_mapel)
          .limit(1);

      if (mapel?.length) {
        namaMapel =
          mapel[0].nama;
      }

      const { data: guru } =
        await supabase
          .from("guru")
          .select("nama")
          .eq("id_guru", j.id_guru)
          .limit(1);

      if (guru?.length) {
        namaGuru =
          guru[0].nama;
      }

      const absen =
        (absenHari || []).find(
          (a) =>
            a.id_jadwal ===
            j.id_jadwal
        );

      hasil.push({
        mapel: namaMapel,
        guru: namaGuru,
        jam: `${String(j.mulai).slice(0, 5)} - ${String(j.selesai).slice(0, 5)}`,
        status:
          absen?.status ||
          "Belum",
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
   JADWAL ORTU
=================================================== */
router.get("/jadwal/:nis", requireAuth, async (req, res) => {
  try {
    const { nis } = req.params;

    const today = todayManado();
    const hariIni = dayNameManado();

    const { data: kelasRows, error: errKelas } =
      await supabase
        .from("kelas_siswa")
        .select("kelas")
        .eq("nis", nis)
        .eq("status", "aktif")
        .limit(1);

    if (errKelas) throw errKelas;

    const kelasAktif =
      kelasRows?.length > 0
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
      "Jumat",
      "Sabtu",
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

      if (mapel?.length) {
        namaMapel =
          mapel[0].nama;
      }

      const { data: guru } =
        await supabase
          .from("guru")
          .select("nama")
          .eq("id_guru", j.id_guru)
          .limit(1);

      if (guru?.length) {
        namaGuru =
          guru[0].nama;
      }

      const item = {
        jam: `${String(j.mulai).slice(0, 5)} - ${String(j.selesai).slice(0, 5)}`,
        mapel: namaMapel,
        guru: namaGuru,
      };

      /* ujian */
      if (
        (j.jenis || "").toLowerCase() ===
        "ujian"
      ) {
        if (j.tanggal === today) {
          if (!ujian[hariIni]) {
            ujian[hariIni] = [];
          }

          ujian[hariIni].push(
            item
          );
        } else if (
          j.hari &&
          ujian[j.hari]
        ) {
          ujian[j.hari].push(
            item
          );
        }
      }

      /* pelajaran */
      else {
        if (
          j.hari &&
          pelajaran[j.hari]
        ) {
          pelajaran[j.hari].push(
            item
          );
        }
      }
    }

    res.json({
      pelajaran,
      ujian,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

/* ===================================================
   TEST ROUTE
=================================================== */
router.get("/", (req, res) => {
  res.json({
    message: "ortu aktif",
  });
});

module.exports = router;