import React from "react";
import { Link } from "react-router-dom";
import { Lock, Mail, ArrowLeft } from "lucide-react";

// Pastikan path import ini sesuai dengan struktur folder Anda
import bg from "../../assets/foto/background.png";
import logo from "../../assets/foto/logo.png";

export default function ResetKirim() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Link reset berhasil dikirim (dummy)");
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-8 font-sans">

      {/* Background with Blur Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${bg})` }}
      ></div>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-10"></div>

      {/* Main Card Wrapper */}
      <div className="relative z-20 flex flex-col md:flex-row w-full max-w-4xl rounded-[2rem] overflow-hidden shadow-2xl min-h-[500px] border border-white/20">

        {/* LEFT COLUMN - Form Area */}
        <div className="w-full md:w-1/2 bg-[#D1D1D1] p-10 lg:p-14 flex flex-col items-center justify-center text-center">

          {/* Lock Icon Circle */}
          <div className="w-20 h-20 rounded-full border border-gray-400 flex items-center justify-center mb-6 shadow-sm">
            <Lock size={32} strokeWidth={1.5} className="text-[#4A342B]" />
          </div>

          <h1 className="text-3xl font-black text-[#4A342B] mb-4 tracking-tight">Reset Password</h1>

          <p className="text-[13px] text-gray-600 font-medium italic mb-8 px-4 leading-relaxed">
            Silakan masukkan Email anda dan kami akan mengirimkan tautan untuk mereset password anda.
          </p>

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">

            {/* Email Input */}
            <div className="flex items-center bg-transparent border border-gray-400 focus-within:border-[#4A342B] rounded-lg px-4 py-3 transition-colors">
              <Mail size={18} className="text-gray-600" />
              <input
                type="email"
                placeholder="Masukkan Email Anda"
                className="bg-transparent w-full ml-3 text-sm text-gray-800 placeholder-gray-500 outline-none italic"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#4A342B] hover:bg-[#36251E] text-white font-bold text-sm py-3 rounded-xl transition-colors shadow-md mt-2"
            >
              Kirim
            </button>
          </form>

          {/* Divider */}
          <div className="w-full flex items-center gap-4 my-6">
            <div className="h-[1px] flex-1 bg-gray-400"></div>
            <span className="text-xs text-gray-600 font-medium italic">Atau</span>
            <div className="h-[1px] flex-1 bg-gray-400"></div>
          </div>

          {/* Back to Login Link */}
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#4A342B] font-medium italic transition-colors"
          >
            <ArrowLeft size={16} />
            kembali ke halaman login
          </Link>

        </div>

        {/* RIGHT COLUMN - Branding (Identical to Login) */}
        <div className="w-full md:w-1/2 bg-[#362B26] p-10 lg:p-14 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white/5 to-transparent"></div>

          <img
            src={logo}
            alt="Logo SD GMIM 12"
            className="w-40 h-40 object-contain mb-8 drop-shadow-2xl z-10"
          />
          <h2 className="text-2xl lg:text-3xl font-bold text-white leading-snug z-10">
            Sistem Presensi dan<br />Penjadwalan SD GMIM 12
          </h2>
        </div>

      </div>
    </div>
  );
}