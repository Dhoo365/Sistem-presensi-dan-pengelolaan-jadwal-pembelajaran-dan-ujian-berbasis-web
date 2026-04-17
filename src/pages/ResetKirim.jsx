// src/pages/ResetKirim.jsx

import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import "../styles/resetKirim.css";

export default function ResetKirim() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Link reset berhasil dikirim");
  };

  return (
    <AuthLayout>

      <div className="rp-lock-circle">
        <i className="ti ti-lock"></i>
      </div>

      <h1>Reset Password</h1>

      <p className="rp-desc">
        Silakan masukkan Email anda dan kami akan
        mengirimkan tautan untuk mereset password anda.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <i className="ti ti-mail icon"></i>
          <input type="email" placeholder="Masukkan Email Anda" />
        </div>

        <button type="submit">Kirim</button>
      </form>

      <div className="rp-divider">
        <span></span>
        <p>Atau</p>
        <span></span>
      </div>

      <Link to="/login" className="rp-back">
        <i className="ti ti-arrow-left"></i>
        kembali ke halaman login
      </Link>

    </AuthLayout>
  );
}