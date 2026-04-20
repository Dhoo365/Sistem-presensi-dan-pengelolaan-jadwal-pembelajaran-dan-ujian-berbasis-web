const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase");
const requireAuth = require("../middleware/auth");

// Ambil riwayat presensi lengkap untuk murid anak ortu
router.get("/", requireAuth, async (req, res) => {
  try {
    const { murid_id, bulan, tahun } = req.query;

    if (!murid_id) {
      return res.status(400).json({ error: "murid_id diperlukan" });
    }

    let query = supabase
      .from("presensi")
      .select(`
        id, tanggal, status, jam_masuk,
        mapel:mapel_id(nama)
      `)
      .eq("murid_id", murid_id)
      .order("tanggal", { ascending: false });

    // Filter bulan jika ada
    if (bulan && tahun) {
      const tglMulai = `${tahun}-${String(bulan).padStart(2, "0")}-01`;
      const tglAkhir = new Date(tahun, bulan, 0).toISOString().split("T")[0];
      query = query.gte("tanggal", tglMulai).lte("tanggal", tglAkhir);
    }

    const { data, error } = await query;
    if (error) throw error;

    // Hitung statistik
    const stats = { hadir: 0, izin: 0, sakit: 0, alpha: 0, total: 0 };
    const hariMap = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

    const riwayat = (data || []).map((p) => {
      const st = (p.status || "").toLowerCase();
      if (st === "hadir") stats.hadir++;
      else if (st === "izin") stats.izin++;
      else if (st === "sakit") stats.sakit++;
      else stats.alpha++;
      stats.total++;

      const tgl = new Date(p.tanggal);
      return {
        id: p.id,
        tanggal: tgl.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
        hari: hariMap[tgl.getDay()],
        jam: p.jam_masuk ?? "09:00",
        mapel: p.mapel?.nama ?? "-",
        status: p.status,
      };
    });

    // Chart data untuk bar chart
    const chartData = [
      { name: "Hadir", value: stats.hadir },
      { name: "Izin", value: stats.izin },
      { name: "Sakit", value: stats.sakit },
      { name: "Alpha", value: stats.alpha },
    ];

    res.json({ stats, riwayat, chartData });
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil data presensi" });
  }
});

// Tambah record presensi
router.post("/", requireAuth, async (req, res) => {
  try {
    const { murid_id, jadwal_id, mapel_id, tanggal, status, jam_masuk } = req.body;
    const { data, error } = await supabase
      .from("presensi")
      .insert([{ murid_id, jadwal_id, mapel_id, tanggal, status, jam_masuk }])
      .select()
      .single();

    if (error) throw error;
    res.json({ message: "Presensi berhasil dicatat", data });
  } catch (err) {
    res.status(500).json({ error: err.message || "Gagal mencatat presensi" });
  }
});

// Update record presensi
router.put("/:id", requireAuth, async (req, res) => {
  try {
    const { status, jam_masuk } = req.body;
    const { data, error } = await supabase
      .from("presensi")
      .update({ status, jam_masuk })
      .eq("id", req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json({ message: "Presensi berhasil diperbarui", data });
  } catch (err) {
    res.status(500).json({ error: "Gagal memperbarui presensi" });
  }
});

module.exports = router;
