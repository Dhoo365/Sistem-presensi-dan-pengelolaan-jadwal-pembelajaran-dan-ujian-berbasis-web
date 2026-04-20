const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase");
const requireAuth = require("../middleware/auth");

// ===== DASHBOARD =====
router.get("/dashboard", requireAuth, async (req, res) => {
  try {
    const [muridRes, guruRes, mapelRes, kelasRes] = await Promise.all([
      supabase.from("murid").select("id", { count: "exact" }).eq("status", "aktif"),
      supabase.from("guru").select("id", { count: "exact" }).eq("status", "Aktif"),
      supabase.from("mapel").select("id", { count: "exact" }),
      supabase.from("kelas").select("id", { count: "exact" }).eq("status", "aktif"),
    ]);

    res.json({
      murid: muridRes.count ?? 0,
      guru: guruRes.count ?? 0,
      mapel: mapelRes.count ?? 0,
      kelas: kelasRes.count ?? 0,
    });
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil data dashboard" });
  }
});

// ===== JADWAL HARI INI =====
router.get("/jadwal/hari-ini", requireAuth, async (req, res) => {
  try {
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const hariIni = days[new Date().getDay()];

    const { data, error } = await supabase
      .from("jadwal")
      .select(`
        id, hari, jam_mulai, jam_selesai, tipe, tanggal,
        kelas:kelas_id(nama),
        mapel:mapel_id(nama),
        guru:guru_id(nama)
      `)
      .eq("hari", hariIni)
      .eq("tipe", "Pelajaran");

    if (error) throw error;

    const result = (data || []).map((j) => ({
      id: j.id,
      tipe: j.tipe,
      kelas: j.kelas?.nama ?? "-",
      hari: j.hari,
      tanggal: j.tanggal ?? null,
      mapel: j.mapel?.nama ?? "-",
      guru: j.guru?.nama ?? "-",
      time: `${j.jam_mulai} - ${j.jam_selesai}`,
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil jadwal hari ini" });
  }
});

// ===== JADWAL MINGGU INI =====
router.get("/jadwal/minggu-ini", requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("jadwal")
      .select(`
        id, hari, jam_mulai, jam_selesai, tipe, tanggal,
        kelas:kelas_id(nama),
        mapel:mapel_id(nama),
        guru:guru_id(nama)
      `)
      .order("id");

    if (error) throw error;

    const result = (data || []).map((j) => ({
      id: j.id,
      tipe: j.tipe,
      kelas: j.kelas?.nama ?? "-",
      hari: j.hari,
      tanggal: j.tanggal ?? null,
      mapel: j.mapel?.nama ?? "-",
      guru: j.guru?.nama ?? "-",
      time: `${j.jam_mulai} - ${j.jam_selesai}`,
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil jadwal minggu ini" });
  }
});

// ===== MURID =====
router.get("/murid", requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("murid")
      .select(`id, nis, nama, status, created_at, kelas:kelas_id(nama)`)
      .order("created_at", { ascending: false });

    if (error) throw error;

    const result = (data || []).map((m) => ({
      id: m.id,
      nis: m.nis,
      nama: m.nama,
      kelas: m.kelas?.nama ? `Kelas ${m.kelas.nama}` : (m.kelas ?? "-"),
      status: m.status,
      tanggal: m.created_at
        ? new Date(m.created_at).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
        : "-",
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil data murid" });
  }
});

router.post("/murid", requireAuth, async (req, res) => {
  try {
    const { nis, nama, kelas_id, status } = req.body;
    const { data, error } = await supabase
      .from("murid")
      .insert([{ nis, nama, kelas_id, status: status || "aktif" }])
      .select()
      .single();

    if (error) throw error;
    res.json({ message: "Murid berhasil ditambahkan", data });
  } catch (err) {
    res.status(500).json({ error: err.message || "Gagal menambah murid" });
  }
});

router.put("/murid/:id", requireAuth, async (req, res) => {
  try {
    const { nis, nama, kelas_id, status } = req.body;
    const { data, error } = await supabase
      .from("murid")
      .update({ nis, nama, kelas_id, status })
      .eq("id", req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json({ message: "Murid berhasil diperbarui", data });
  } catch (err) {
    res.status(500).json({ error: "Gagal memperbarui murid" });
  }
});

router.patch("/murid/:id/status", requireAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const { error } = await supabase
      .from("murid")
      .update({ status })
      .eq("id", req.params.id);

    if (error) throw error;
    res.json({ message: "Status murid diperbarui" });
  } catch (err) {
    res.status(500).json({ error: "Gagal memperbarui status murid" });
  }
});

// ===== GURU =====
router.get("/guru", requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("guru")
      .select("id, nip, nama, telepon, status")
      .order("nama");

    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil data guru" });
  }
});

router.post("/guru", requireAuth, async (req, res) => {
  try {
    const { id, nip, nama, telepon, status } = req.body;
    const { data, error } = await supabase
      .from("guru")
      .insert([{ id, nip, nama, telepon, status: status || "Aktif" }])
      .select()
      .single();

    if (error) throw error;
    res.json({ message: "Guru berhasil ditambahkan", data });
  } catch (err) {
    res.status(500).json({ error: err.message || "Gagal menambah guru" });
  }
});

router.put("/guru/:id", requireAuth, async (req, res) => {
  try {
    const { nip, nama, telepon, status } = req.body;
    const { data, error } = await supabase
      .from("guru")
      .update({ nip, nama, telepon, status })
      .eq("id", req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json({ message: "Guru berhasil diperbarui", data });
  } catch (err) {
    res.status(500).json({ error: "Gagal memperbarui guru" });
  }
});

router.patch("/guru/:id/status", requireAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const { error } = await supabase
      .from("guru")
      .update({ status })
      .eq("id", req.params.id);

    if (error) throw error;
    res.json({ message: "Status guru diperbarui" });
  } catch (err) {
    res.status(500).json({ error: "Gagal memperbarui status guru" });
  }
});

// ===== KELAS =====
router.get("/kelas", requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("kelas")
      .select("id, nama, status")
      .order("nama");

    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil data kelas" });
  }
});

router.post("/kelas", requireAuth, async (req, res) => {
  try {
    const { nama } = req.body;
    const { data, error } = await supabase
      .from("kelas")
      .insert([{ nama, status: "aktif" }])
      .select()
      .single();

    if (error) throw error;
    res.json({ message: "Kelas berhasil ditambahkan", data });
  } catch (err) {
    res.status(500).json({ error: err.message || "Gagal menambah kelas" });
  }
});

router.patch("/kelas/:id/status", requireAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const { error } = await supabase
      .from("kelas")
      .update({ status })
      .eq("id", req.params.id);

    if (error) throw error;
    res.json({ message: "Status kelas diperbarui" });
  } catch (err) {
    res.status(500).json({ error: "Gagal memperbarui status kelas" });
  }
});

// ===== MAPEL =====
router.get("/mapel", requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("mapel")
      .select("id, nama, status")
      .order("nama");

    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil data mapel" });
  }
});

router.post("/mapel", requireAuth, async (req, res) => {
  try {
    const { nama } = req.body;
    const { data, error } = await supabase
      .from("mapel")
      .insert([{ nama, status: "aktif" }])
      .select()
      .single();

    if (error) throw error;
    res.json({ message: "Mapel berhasil ditambahkan", data });
  } catch (err) {
    res.status(500).json({ error: err.message || "Gagal menambah mapel" });
  }
});

// ===== JADWAL (CRUD) =====
router.get("/jadwal", requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("jadwal")
      .select(`
        id, hari, jam_mulai, jam_selesai, tipe, tanggal,
        kelas:kelas_id(id, nama),
        mapel:mapel_id(id, nama),
        guru:guru_id(id, nama)
      `)
      .order("hari");

    if (error) throw error;

    const result = (data || []).map((j) => ({
      id: j.id,
      hari: j.hari,
      rentangWaktu: `${j.jam_mulai} - ${j.jam_selesai}`,
      kelas: j.kelas?.nama ?? "-",
      kelas_id: j.kelas?.id,
      mapel: j.mapel?.nama ?? "-",
      mapel_id: j.mapel?.id,
      guru: j.guru?.nama ?? "-",
      guru_id: j.guru?.id,
      tipe: j.tipe,
      tanggal: j.tanggal,
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil data jadwal" });
  }
});

router.post("/jadwal", requireAuth, async (req, res) => {
  try {
    const { hari, jam_mulai, jam_selesai, kelas_id, mapel_id, guru_id, tipe, tanggal } = req.body;
    const { data, error } = await supabase
      .from("jadwal")
      .insert([{ hari, jam_mulai, jam_selesai, kelas_id, mapel_id, guru_id, tipe: tipe || "Pelajaran", tanggal }])
      .select()
      .single();

    if (error) throw error;
    res.json({ message: "Jadwal berhasil ditambahkan", data });
  } catch (err) {
    res.status(500).json({ error: err.message || "Gagal menambah jadwal" });
  }
});

router.put("/jadwal/:id", requireAuth, async (req, res) => {
  try {
    const { hari, jam_mulai, jam_selesai, kelas_id, mapel_id, guru_id, tipe, tanggal } = req.body;
    const { data, error } = await supabase
      .from("jadwal")
      .update({ hari, jam_mulai, jam_selesai, kelas_id, mapel_id, guru_id, tipe, tanggal })
      .eq("id", req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json({ message: "Jadwal berhasil diperbarui", data });
  } catch (err) {
    res.status(500).json({ error: "Gagal memperbarui jadwal" });
  }
});

router.delete("/jadwal/:id", requireAuth, async (req, res) => {
  try {
    const { error } = await supabase
      .from("jadwal")
      .delete()
      .eq("id", req.params.id);

    if (error) throw error;
    res.json({ message: "Jadwal berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: "Gagal menghapus jadwal" });
  }
});

// ===== AKUN  =====
router.get("/akun/guru", requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, nama, nip, email, status")
      .eq("role", "guru")
      .order("nama");

    if (error) throw error;

    const result = (data || []).map((p) => ({
      id: p.id,
      nama: p.nama,
      nip: p.nip ?? "-",
      email: p.email ?? "-",
      aktif: p.status === "aktif",
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil akun guru" });
  }
});

router.get("/akun/ortu", requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select(`id, nama, email, status, murid:murid_id(nama, kelas:kelas_id(nama))`)
      .in("role", ["ortu", "orangtua"])
      .order("nama");

    if (error) throw error;

    const result = (data || []).map((p) => ({
      id: p.id,
      anak: p.murid?.nama ?? p.nama ?? "-",
      kelas: p.murid?.kelas?.nama ? `Kelas ${p.murid.kelas.nama}` : "-",
      email: p.email ?? "-",
      aktif: p.status === "aktif",
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil akun ortu" });
  }
});

router.put("/akun/:id/email", requireAuth, async (req, res) => {
  try {
    const { email } = req.body;
    const { error } = await supabase
      .from("profiles")
      .update({ email })
      .eq("id", req.params.id);

    if (error) throw error;
    res.json({ message: "Email berhasil diperbarui" });
  } catch (err) {
    res.status(500).json({ error: "Gagal memperbarui email" });
  }
});

router.patch("/akun/:id/status", requireAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const { error } = await supabase
      .from("profiles")
      .update({ status })
      .eq("id", req.params.id);

    if (error) throw error;
    res.json({ message: "Status akun diperbarui" });
  } catch (err) {
    res.status(500).json({ error: "Gagal memperbarui status akun" });
  }
});

router.get("/", (req, res) => {
  res.json({ message: "admin aktif" });
});

module.exports = router;
