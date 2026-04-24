const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase");
const requireAuth = require("../middleware/auth");

router.get("/me", requireAuth, async (req, res) => {
  try {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("id, nama, role, status")
      .eq("id", req.user.id)
      .single();

    if (error || !profile) {
      return res.status(404).json({ error: "Profil tidak ditemukan" });
    }

    res.json({ user: profile });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/", (req, res) => {
  res.json({ message: "auth aktif" });
});

module.exports = router;
