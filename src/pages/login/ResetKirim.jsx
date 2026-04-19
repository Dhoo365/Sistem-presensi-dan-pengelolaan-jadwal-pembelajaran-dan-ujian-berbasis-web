import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Lock, Mail, ArrowLeft } from "lucide-react";
import { supabase } from "../../lib/supabase";
import AuthLayout from "../layouts/AuthLayout";

// Pastikan path import ini sesuai dengan struktur folder Anda
import bg from "../../assets/foto/background.png";
import logo from "../../assets/foto/background.png";

export default function ResetKirim() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const { error } =
      await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo:
            "http://localhost:5173/update-password",
        }
      );

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Link reset berhasil dikirim ke email");
  };

  return (
    <AuthLayout>

      {/* Icon */}
      <div className="w-20 h-20 rounded-full border border-gray-400 flex items-center justify-center mb-6 shadow-sm mx-auto">
        <Lock
          size={32}
          strokeWidth={1.5}
          className="text-[#4A342B]"
        />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-black text-[#4A342B] mb-4 tracking-tight text-center">
        Reset Password
      </h1>

      {/* Desc */}
      <p className="text-[13px] text-gray-600 font-medium italic mb-8 px-2 leading-relaxed text-center">
        Silakan masukkan Email anda dan kami akan
        mengirimkan tautan untuk mereset password anda.
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-5"
      >

        {/* Input */}
        <div className="flex items-center border border-gray-400 focus-within:border-[#4A342B] rounded-lg px-4 py-3 transition-colors duration-300">

          <Mail
            size={18}
            className="text-gray-600"
          />

          <input
            type="email"
            required
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Masukkan Email Anda"
            className="bg-transparent w-full ml-3 text-sm text-gray-800 placeholder-gray-500 outline-none italic"
          />

        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#4A342B] hover:bg-[#36251E] active:scale-[0.98] text-white font-bold text-sm py-3 rounded-xl transition-all duration-300 shadow-md mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? "Mengirim..." : "Kirim"}
        </button>

      </form>

      {/* Divider */}
      <div className="w-full flex items-center gap-4 my-6">
        <div className="h-[1px] flex-1 bg-gray-400"></div>

        <span className="text-xs text-gray-600 font-medium italic">
          Atau
        </span>

        <div className="h-[1px] flex-1 bg-gray-400"></div>
      </div>

      {/* Back */}
      <Link
        to="/login"
        className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-[#4A342B] font-medium italic transition-all duration-300 hover:-translate-x-1"
      >
        <ArrowLeft size={16} />
        kembali ke halaman login
      </Link>

    </AuthLayout>
  );
}