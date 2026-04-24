const express = require("express");
const router = express.Router();

const supabase = require("../config/supabase");
const requireAuth = require("../middleware/auth");

/* GET GURU */
router.get("/guru", requireAuth, async (req, res) => {
  try {
    const { data: guru, error: e1 } = await supabase
      .from("guru")
      .select("id_guru,nama,nip,user_id");

    if (e1) throw e1;

    const ids = (guru || []).filter(x => x.user_id).map(x => x.user_id);

    let profiles = [];

    if (ids.length > 0) {
      const { data: p, error: e2 } = await supabase
        .from("profiles")
        .select("id,status")
        .in("id", ids);

      if (e2) throw e2;

      profiles = p || [];
    }

    res.json(
      (guru || []).map(x => {
        const p = profiles.find(a => a.id === x.user_id);

        return {
          id: p ? p.id : x.id_guru,
          nama: x.nama,
          nip: x.nip,
          status: p ? p.status : "aktif",
          email: x.user_id ? "sudah dibuat" : ""
        };
      })
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message
    });
  }
});

/* GET ORTU */
router.get("/ortu", requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("kelas_siswa")
      .select("nis,kelas,murid(nama)")
      .eq("status", "aktif");

    if (error) throw error;

    const nisList = (data || []).map(x => x.nis);

    const { data: relasi, error: relErr } = await supabase
      .from("ortu_anak")
      .select("ortu_id, nis")
      .in("nis", nisList);

    if (relErr) throw relErr;

    const ortuIds = [...new Set((relasi || []).map(x => x.ortu_id))];

    const { data: profiles, error: pErr } = await supabase
      .from("profiles")
      .select("id,status")
      .in("id", ortuIds);

    if (pErr) throw pErr;

    res.json(
      (data || []).map(x => {
        const r = (relasi || []).find(a => a.nis === x.nis);

        const p = r ? (profiles || []).find(z => z.id === r.ortu_id) : null;

        return {
          id: p ? p.id : x.nis,
          nama: (x.murid && x.murid.nama) || "-",
          kelas: x.kelas,
          email: p ? "sudah dibuat" : "",
          status: p ? p.status : "aktif"
        };
      })
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Gagal ambil akun ortu"
    });
  }
});

/* BUAT AKUN GURU */
router.post("/guru/:id", requireAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const email = req.body.email;
    const nama = req.body.nama;
    const { data: userWrap, error: e1 } = await supabase.auth.admin.createUser({
      email,
      password: "12345678",
      email_confirm: true
    });
    if (e1) throw e1;
    const user = userWrap.user;
    await supabase
      .from("profiles")
      .insert([
        { id: user.id, nama, role: "guru", status: "aktif", id_guru: id }
      ]);
    await supabase.from("guru").update({ user_id: user.id }).eq("id_guru", id);
    res.json({ message: "Akun guru dibuat" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* BUAT AKUN ORTU */
router.post("/ortu/:id", requireAuth, async (req, res) => {
  try {
    const nis = req.params.id;
    const email = (req.body.email || "").trim().toLowerCase();
    const nama = (req.body.nama || "").trim();

    if (!email || !email.includes("@")) {
      return res.status(400).json({
        error: "Email tidak valid"
      });
    }

    // =====================================
    // CEK USER SUDAH ADA ATAU BELUM
    // =====================================
    const {
      data: usersWrap,
      error: listErr
    } = await supabase.auth.admin.listUsers();

    if (listErr) throw listErr;

    const userLama = (usersWrap.users || [])
      .find(u => (u.email || "").toLowerCase() === email);

    // =====================================
    // JIKA SUDAH ADA AKUN
    // =====================================
    if (userLama) {
      const userId = userLama.id;

      // cek relasi anak sudah ada atau belum
      const { data: cekRelasi, error: relErr } = await supabase
        .from("ortu_anak")
        .select("id")
        .eq("ortu_id", userId)
        .eq("nis", nis);

      if (relErr) throw relErr;

      if (!cekRelasi || cekRelasi.length === 0) {
        const { error: insRelErr } = await supabase.from("ortu_anak").insert([
          {
            ortu_id: userId,
            nis
          }
        ]);

        if (insRelErr) throw insRelErr;
      }

      // pastikan profile ada
      const { data: cekProfile } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", userId)
        .maybeSingle();

      if (!cekProfile) {
        await supabase.from("profiles").insert([
          {
            id: userId,
            nama,
            role: "orangtua",
            status: "aktif",
            nis_anak: nis
          }
        ]);
      }

      return res.json({
        success: true,
        message: "Anak ditambahkan ke akun lama"
      });
    }

    // =====================================
    // JIKA BELUM ADA AKUN
    // =====================================
    const { data: userWrap, error: e1 } = await supabase.auth.admin.createUser({
      email,
      password: "12345678",
      email_confirm: true
    });

    if (e1) throw e1;

    const user = userWrap.user;

    const { error: pErr } = await supabase.from("profiles").insert([
      {
        id: user.id,
        nama,
        role: "orangtua",
        status: "aktif",
        nis_anak: nis
      }
    ]);

    if (pErr) throw pErr;

    const { error: oaErr } = await supabase.from("ortu_anak").insert([
      {
        ortu_id: user.id,
        nis
      }
    ]);

    if (oaErr) throw oaErr;

    res.json({
      success: true,
      message: "Akun orang tua dibuat"
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: err.message
    });
  }
});

/* RESET PASSWORD */
router.post("/:id/reset", requireAuth, async (req, res) => {
  try {
    const userId = req.params.id;

    const { error } = await supabase.auth.admin.updateUserById(userId, {
      password: "12345678"
    });

    if (error) throw error;

    res.json({
      success: true,
      message: "Password berhasil direset"
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message
    });
  }
});

/* GANTI EMAIL */
router.patch("/:id/email", requireAuth, async (req, res) => {
  try {
    const { email } = req.body;

    const { error } = await supabase.auth.admin.updateUserById(req.params.id, {
      email,
      email_confirm: true
    });

    if (error) throw error;

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

/* STATUS */
router.patch("/:id/status", requireAuth, async (req, res) => {
  try {
    let id = req.params.id;

    if (id.startsWith("G")) {
      const { data } = await supabase
        .from("guru")
        .select("user_id")
        .eq("id_guru", id)
        .single();

      if (!data || !data.user_id) {
        return res.status(400).json({
          error: "Akun guru belum dibuat"
        });
      }

      id = data.user_id;
    }

    const { error } = await supabase
      .from("profiles")
      .update({ status: req.body.status })
      .eq("id", id);

    if (error) throw error;

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* HAPUS */
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const userId = req.params.id;

    const { error } = await supabase
      .from("profiles")
      .update({
        status: "dihapus"
      })
      .eq("id", userId);

    if (error) throw error;

    res.json({
      success: true,
      message: "Akun berhasil diarsipkan"
    });
  } catch (err) {
    console.log("SOFT DELETE ERROR:", err);

    res.status(500).json({
      error: err.message
    });
  }
});

router.patch("/:id/restore", requireAuth, async (req, res) => {
  try {
    await supabase
      .from("profiles")
      .update({ status: "aktif" })
      .eq("id", req.params.id);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});
module.exports = router;
