const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase");
const requireAuth = require("../middleware/auth");

// Ambil data anak (murid) yang terhubung ke akun ortu ini
router.get("/anak", requireAuth, async (req, res) => {
  try {
    const { data: profile, error: profileErr } = await supabase
      .from("profiles")
      .select("murid_id")
      .eq("id", req.user.id)
      .single();

    if (profileErr || !profile?.murid_id) {
      // Coba cari langsung berdasarkan user_id di tabel murid
      const { data: muridList } = await supabase
        .from("murid")
        .select(`id, nama, kelas:kelas_id(nama)`)
        .eq("ortu_id", req.user.id);

      return res.json(
        (muridList || []).map((m) => ({
          id: m.id,
          name: m.nama,
          kelas: m.kelas?.nama ? `Kelas ${m.kelas.nama}` : "-",
        }))
      );
    }

    // Ambil satu murid berdasarkan murid_id di profil ortu
    const { data: murid, error: muridErr } = await supabase
      .from("murid")
      .select(`id, nama, kelas:kelas_id(nama)`)
      .eq("id", profile.murid_id)
      .single();

    if (muridErr || !murid) return res.json([]);

    res.json([{
      id: murid.id,
      name: murid.nama,
      kelas: murid.kelas?.nama ? `Kelas ${murid.kelas.nama}` : "-",
    }]);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil data anak" });
  }
});

// Dashboard: presensi hari ini + ringkasan bulan ini
router.get("/dashboard", requireAuth, async (req, res) => {
  try {
    // Ambil murid_id dari profil ortu
    const { data: profile } = await supabase
      .from("profiles")
      .select("murid_id")
      .eq("id", req.user.id)
      .single();

    const muridId = profile?.murid_id;
    if (!muridId) return res.json({ hariIni: [], ringkasan: {} });

    const hari = new Date().toISOString().split("T")[0];

    // Presensi hari ini
    const { data: hariIni } = await supabase
      .from("presensi")
      .select(`id, status, jam_masuk, mapel:mapel_id(nama), guru:jadwal_id(guru:guru_id(nama))`)
      .eq("murid_id", muridId)
      .eq("tanggal", hari);

    // Ringkasan bulan ini
    const bulanAwal = new Date();
    bulanAwal.setDate(1);
    const { data: bulanIni } = await supabase
      .from("presensi")
      .select("id, status")
      .eq("murid_id", muridId)
      .gte("tanggal", bulanAwal.toISOString().split("T")[0]);

    const ringkasan = { Hadir: 0, Izin: 0, Sakit: 0, Alpha: 0 };
    (bulanIni || []).forEach((p) => {
      if (ringkasan[p.status] !== undefined) ringkasan[p.status]++;
    });

    res.json({
      hariIni: (hariIni || []).map((p) => ({
        id: p.id,
        status: p.status,
        jam: p.jam_masuk ?? "-",
        mapel: p.mapel?.nama ?? "-",
        guru: p.guru?.guru?.nama ?? "-",
      })),
      ringkasan,
    });
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil data dashboard ortu" });
  }
});

// Jadwal untuk kelas anak
router.get("/jadwal", requireAuth, async (req, res) => {
  try {
    const { data: profile } = await supabase
      .from("profiles")
      .select("murid_id")
      .eq("id", req.user.id)
      .single();

    const muridId = profile?.murid_id;
    if (!muridId) return res.json({ pelajaran: {}, ujian: {} });

    const { data: murid } = await supabase
      .from("murid")
      .select("kelas_id")
      .eq("id", muridId)
      .single();

    if (!murid?.kelas_id) return res.json({ pelajaran: {}, ujian: {} });

    const { data: jadwal } = await supabase
      .from("jadwal")
      .select(`hari, jam_mulai, jam_selesai, tipe, mapel:mapel_id(nama), guru:guru_id(nama)`)
      .eq("kelas_id", murid.kelas_id)
      .order("hari");

    const hariList = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
    const pelajaran = {};
    const ujian = {};
    hariList.forEach((h) => { pelajaran[h] = []; ujian[h] = []; });

    (jadwal || []).forEach((j) => {
      const entry = {
        jam: `${j.jam_mulai} - ${j.jam_selesai}`,
        mapel: j.mapel?.nama ?? "-",
        guru: j.guru?.nama ?? "-",
      };
      if (j.tipe === "Ujian") {
        if (ujian[j.hari]) ujian[j.hari].push(entry);
      } else {
        if (pelajaran[j.hari]) pelajaran[j.hari].push(entry);
      }
    });

    res.json({ pelajaran, ujian });
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil jadwal" });
  }
});

router.get("/", (req, res) => {
  res.json({ message: "ortu aktif" });
});

module.exports = router;
