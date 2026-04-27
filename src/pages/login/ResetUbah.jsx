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

import { supabase } from "../../lib/supabase";
import AuthLayout from "../../layouts/AuthLayout";
import toast from "react-hot-toast";

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

  // SAFE FUNCTION PRESERVED
  useEffect(() => {
    const checkSession = async () => {
      const { data } =
        await supabase.auth.getSession();

      if (!data.session) {
        toast.error(
          "Link reset tidak valid atau sudah expired"
        );
        navigate("/login");
      }
    };

    checkSession();
  }, [navigate]);

  // SAFE FUNCTION PRESERVED
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error(
        "Password minimal 6 karakter"
      );
      return;
    }

    if (
      password !==
      confirmPassword
    ) {
      toast.error(
        "Konfirmasi password tidak sama"
      );
      return;
    }

    try {
      setLoading(true);

      const id =
        toast.loading(
          "Menyimpan password..."
        );

      const { error } =
        await supabase.auth.updateUser({
          password:
            password,
          data: {
            harus_ganti_password: false,
          },
        });

      if (error) {
        toast.error(
          error.message,
          { id }
        );
        return;
      }

      await supabase.auth.signOut();

      toast.success(
        "Password berhasil diperbarui",
        { id }
      );

      navigate("/login");
    } catch (err) {
      toast.error(
        "Terjadi kesalahan"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      {/* FIT TO PARENT LAYOUT */}
      <div className="w-full">
        {/* TITLE */}
        <h1
          className="
            text-[28px] sm:text-[32px]
            leading-tight
            font-black
            text-[#4A342B]
            tracking-tight
            text-center sm:text-left
          "
        >
          Ubah Password
        </h1>

        {/* LINE */}
        <div
          className="
            w-14 h-1.5
            rounded-full
            bg-[#715445]
            mt-3 mb-4
            mx-auto sm:mx-0
          "
        />

        {/* DESC */}
        <p
          className="
            text-[13px]
            text-gray-500
            leading-relaxed
            font-medium
            text-center sm:text-left
            mb-5
          "
        >
          Masukkan password baru
          untuk akun Anda.
        </p>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-3.5"
        >
          {/* PASSWORD */}
          <div>
            <label className="block mb-2 text-[13px] font-bold text-[#4A342B]">
              Password Baru
            </label>

            <div
              className="
                h-11
                rounded-xl
                border border-gray-300
                bg-white
                px-4
                flex items-center gap-3
                transition-all
                focus-within:border-[#715445]
                focus-within:ring-4
                focus-within:ring-[#715445]/10
              "
            >
              <Lock
                size={17}
                className="text-gray-400 shrink-0"
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
                className="
                  w-full bg-transparent
                  outline-none text-sm
                  placeholder:text-gray-400
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="
                  w-8 h-8
                  rounded-lg
                  flex items-center justify-center
                  text-gray-500
                  hover:bg-gray-100
                  transition-all
                "
              >
                {showPassword ? (
                  <Eye size={16} />
                ) : (
                  <EyeOff size={16} />
                )}
              </button>
            </div>
          </div>

          {/* CONFIRM */}
          <div>
            <label className="block mb-2 text-[13px] font-bold text-[#4A342B]">
              Konfirmasi Password
            </label>

            <div
              className="
                h-11
                rounded-xl
                border border-gray-300
                bg-white
                px-4
                flex items-center gap-3
                transition-all
                focus-within:border-[#715445]
                focus-within:ring-4
                focus-within:ring-[#715445]/10
              "
            >
              <Lock
                size={17}
                className="text-gray-400 shrink-0"
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
                className="
                  w-full bg-transparent
                  outline-none text-sm
                  placeholder:text-gray-400
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirm(
                    !showConfirm
                  )
                }
                className="
                  w-8 h-8
                  rounded-lg
                  flex items-center justify-center
                  text-gray-500
                  hover:bg-gray-100
                  transition-all
                "
              >
                {showConfirm ? (
                  <Eye size={16} />
                ) : (
                  <EyeOff size={16} />
                )}
              </button>
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full h-11
              rounded-xl
              bg-[#715445]
              hover:bg-[#5c4337]
              text-white
              text-sm font-black
              shadow-md shadow-[#715445]/20
              transition-all
              active:scale-[0.98]
              disabled:opacity-70
              disabled:cursor-not-allowed
              mt-1
            "
          >
            {loading
              ? "Memproses..."
              : "Ubah Password"}
          </button>
        </form>

        {/* DIVIDER */}
        <div className="flex items-center gap-3 my-4">
          <div className="h-px flex-1 bg-gray-200" />

          <span className="text-[11px] font-semibold text-gray-400 uppercase">
            Atau
          </span>

          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* BACK */}
        <Link
          to="/login"
          className="
            h-10 w-full
            rounded-xl
            border border-gray-300
            bg-white/80
            text-sm font-bold
            text-gray-600
            hover:text-[#715445]
            hover:border-[#715445]/20
            transition-all
            active:scale-[0.98]
            flex items-center justify-center gap-2
          "
        >
          <ArrowLeft size={15} />
          Kembali ke Login
        </Link>
      </div>
    </AuthLayout>
  );
}