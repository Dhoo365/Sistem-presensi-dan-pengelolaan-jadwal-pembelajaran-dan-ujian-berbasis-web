import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { supabase } from "../lib/supabase";
import AuthLayout from "../layouts/AuthLayout";

// Pastikan path import ini sesuai dengan struktur folder Anda
import bg from "../../assets/foto/background.png";
import logo from "../../assets/foto/logo.png";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    navigate("/admin");
  };

  return (
    <AuthLayout>

      <h1 className="text-4xl font-black text-[#4A342B] mb-1">
        Selamat Datang!
      </h1>

      <div className="w-20 h-1.5 bg-[#4A342B] rounded-full mb-6"></div>

      <p className="text-sm text-gray-600 font-medium italic mb-8 text-left">
        Silakan masuk untuk melanjutkan ke sistem presensi dan penjadwalan.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
      >

        {/* Email */}
        <div className="text-left">
          <label className="block text-[#4A342B] font-bold italic text-sm mb-2">
            Email
          </label>

          <div className="flex items-center border border-gray-400 focus-within:border-[#4A342B] rounded-lg px-4 py-3">

            <User size={18} className="text-gray-600" />

            <input
              type="email"
              required
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Masukkan Email Anda"
              className="w-full ml-3 bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        {/* Password */}
        <div className="text-left">
          <label className="block text-[#4A342B] font-bold italic text-sm mb-2">
            Password
          </label>

          <div className="flex items-center border border-gray-400 focus-within:border-[#4A342B] rounded-lg px-4 py-3">

            <Lock size={18} className="text-gray-600" />

            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Masukkan Password Anda"
              className="w-full ml-3 bg-transparent outline-none text-sm"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="text-gray-600 hover:text-gray-800"
            >
              {showPassword ? (
                <Eye size={18} />
              ) : (
                <EyeOff size={18} />
              )}
            </button>

          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#4A342B] hover:bg-[#36251E] text-white font-bold text-lg py-3 rounded-xl transition-all duration-300"
        >
          {loading ? "Memproses..." : "Masuk"}
        </button>

        {/* Forgot */}
        <div className="text-center mt-2">
          <Link
            to="/reset-password"
            className="text-sm text-gray-600 font-bold italic hover:text-[#4A342B]"
          >
            Lupa Password?
          </Link>
        </div>

      </form>

    </AuthLayout>
  );
}