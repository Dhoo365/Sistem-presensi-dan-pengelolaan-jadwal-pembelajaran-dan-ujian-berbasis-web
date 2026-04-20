const supabase = require("../config/supabase");

/**
 * Middleware: Verifikasi Bearer token dari Supabase Auth.
 * Token disimpan oleh frontend di localStorage saat login.
 */
module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: token tidak ada" });
  }

  const token = authHeader.split(" ")[1];

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data?.user) {
    return res.status(401).json({ error: "Token tidak valid atau sudah expired" });
  }

  req.user = data.user;
  next();
};
