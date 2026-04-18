import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, Lock, Eye, EyeOff } from "lucide-react";

// Pastikan path import ini sesuai dengan struktur folder Anda
import bg from "../../assets/foto/background.png";
import logo from "../../assets/foto/logo.png";

export default function Login() {
  // State untuk visibilitas password
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login berhasil (dummy)");
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

        {/* LEFT COLUMN - Form */}
        <div className="w-full md:w-1/2 bg-[#D1D1D1] p-10 lg:p-14 flex flex-col justify-center">

          <h1 className="text-4xl font-black text-[#4A342B] mb-1">Selamat Datang!</h1>
          <div className="w-20 h-1.5 bg-[#4A342B] rounded-full mb-6"></div>

          <p className="text-sm text-gray-600 font-medium italic mb-8 pr-4">
            Silakan masuk untuk melanjutkan ke sistem presensi dan penjadwalan.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Email Input */}
            <div>
              <label className="block text-[#4A342B] font-bold italic text-sm mb-1.5">
                Email
              </label>
              <div className="flex items-center bg-transparent border border-gray-400 focus-within:border-[#4A342B] rounded-lg px-4 py-3 transition-colors">
                <User size={18} className="text-gray-600" />
                <input
                  type="email"
                  placeholder="Masukkan Email Anda"
                  className=" w-full ml-3 text-sm text-gray-800 placeholder-gray-500 outline-none"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-[#4A342B] font-bold italic text-sm mb-1.5">
                Password
              </label>
              <div className="flex items-center bg-transparent border border-gray-400 focus-within:border-[#4A342B] rounded-lg px-4 py-3 transition-colors">
                <Lock size={18} className="text-gray-600" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan Password Anda"
                  className="bg-transparent w-full ml-3 text-sm text-gray-800 placeholder-gray-500 outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-600 hover:text-gray-800 transition-colors focus:outline-none"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#4A342B] hover:bg-[#36251E] text-white font-bold text-lg py-3 rounded-xl mt-2 transition-colors shadow-md"
            >
              Masuk
            </button>

            {/* Forgot Password Link */}
            <div className="text-center mt-2">
              <Link
                to="/reset-password"
                className="text-sm text-gray-600 font-bold italic hover:text-[#4A342B] transition-colors"
              >
                Lupa Password?
              </Link>
            </div>

          </form>
        </div>

        {/* RIGHT COLUMN - Branding */}
        <div className="w-full md:w-1/2 bg-[#362B26] p-10 lg:p-14 flex flex-col items-center justify-center text-center relative overflow-hidden">
          {/* Optional subtle light effect at the top */}
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