import React, {
  useState,
  useEffect,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";

import { supabase } from "../lib/supabase";
import AuthLayout from "../layouts/AuthLayout";

export default function ResetUbah() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  /* =========================
     CHECK RESET SESSION
  ========================= */
  useEffect(() => {
    const checkSession = async () => {
      const { data } =
        await supabase.auth.getSession();

      if (!data.session) {
        alert(
          "Link reset tidak valid atau sudah expired"
        );

        navigate("/login");
      }
    };

    checkSession();
  }, [navigate]);

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      alert("Password minimal 6 karakter");
      return;
    }

    if (password !== confirmPassword) {
      alert("Konfirmasi password tidak sama");
      return;
    }

    setLoading(true);

    const { error } =
      await supabase.auth.updateUser({
        password: password,
      });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    await supabase.auth.signOut();

    alert("Password berhasil diperbarui");

    navigate("/login");
  };

  return (
    <AuthLayout>

      {/* ICON */}
      <div className="w-20 h-20 rounded-full border border-gray-400 flex items-center justify-center mb-6 shadow-sm mx-auto">
        <Lock
          size={32}
          strokeWidth={1.5}
          className="text-[#4A342B]"
        />
      </div>

      {/* TITLE */}
      <h1 className="text-3xl font-black text-[#4A342B] mb-4 tracking-tight text-center">
        Ubah Password
      </h1>

      {/* DESC */}
      <p className="text-[13px] text-gray-600 font-medium italic mb-8 px-2 leading-relaxed text-center">
        Silakan masukkan password baru
        untuk akun Anda.
      </p>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-4"
      >

        {/* PASSWORD BARU */}
        <div className="flex items-center border border-gray-400 focus-within:border-[#4A342B] rounded-lg px-4 py-3 transition-colors duration-300">

          <Lock
            size={18}
            className="text-gray-600"
          />

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            required
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            placeholder="Password Baru"
            className="bg-transparent w-full ml-3 text-sm text-gray-800 placeholder-gray-500 outline-none italic"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="text-gray-600 hover:text-[#4A342B] transition-colors"
          >
            {showPassword ? (
              <Eye size={18} />
            ) : (
              <EyeOff size={18} />
            )}
          </button>

        </div>

        {/* KONFIRMASI PASSWORD */}
        <div className="flex items-center border border-gray-400 focus-within:border-[#4A342B] rounded-lg px-4 py-3 transition-colors duration-300">

          <Lock
            size={18}
            className="text-gray-600"
          />

          <input
            type={
              showConfirm
                ? "text"
                : "password"
            }
            required
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            placeholder="Konfirmasi Password"
            className="bg-transparent w-full ml-3 text-sm text-gray-800 placeholder-gray-500 outline-none italic"
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirm(
                !showConfirm
              )
            }
            className="text-gray-600 hover:text-[#4A342B] transition-colors"
          >
            {showConfirm ? (
              <Eye size={18} />
            ) : (
              <EyeOff size={18} />
            )}
          </button>

        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#4A342B] hover:bg-[#36251E] active:scale-[0.98] text-white font-bold text-sm py-3 rounded-xl transition-all duration-300 shadow-md mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading
            ? "Memproses..."
            : "Simpan Password"}
        </button>

      </form>

      {/* DIVIDER */}
      <div className="w-full flex items-center gap-4 my-6">
        <div className="h-[1px] flex-1 bg-gray-400"></div>

        <span className="text-xs text-gray-600 font-medium italic">
          Atau
        </span>

        <div className="h-[1px] flex-1 bg-gray-400"></div>
      </div>

      {/* BACK */}
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