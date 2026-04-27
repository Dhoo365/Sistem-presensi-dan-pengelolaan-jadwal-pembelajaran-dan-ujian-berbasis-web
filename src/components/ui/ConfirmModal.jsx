import React from "react";
import {
  AlertTriangle,
  X
} from "lucide-react";

export default function ConfirmModal({
  open,
  title = "Konfirmasi",
  desc = "Lanjutkan tindakan ini?",
  confirmText = "Ya, Lanjut",
  cancelText = "Batal",
  danger = false,
  loading = false,
  onClose,
  onConfirm
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200]">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/45 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* CONTENT */}
      <div className="absolute inset-0 flex items-end sm:items-center justify-center p-0 sm:p-4">
        <div
          className="
            w-full sm:max-w-md
            bg-white
            rounded-t-[2rem] sm:rounded-[2rem]
            border border-gray-100
            shadow-2xl
            animate-in slide-in-from-bottom-5 sm:zoom-in-95
            duration-200
          "
        >
          {/* HEADER */}
          <div className="p-5 sm:p-6 border-b border-gray-100">
            <div className="flex gap-4 items-start">
              <div
                className={`
                  w-12 h-12 rounded-2xl flex items-center justify-center shrink-0
                  ${
                    danger
                      ? "bg-rose-100 text-rose-600"
                      : "bg-[#715445]/10 text-[#715445]"
                  }
                `}
              >
                <AlertTriangle size={20} />
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-black text-gray-900">
                  {title}
                </h3>

                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  {desc}
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* FOOTER */}
          <div className="grid grid-cols-2 gap-3 p-5 sm:p-6">
            <button
              onClick={onClose}
              disabled={loading}
              className="
                min-h-[46px]
                rounded-2xl
                bg-gray-100
                text-sm font-bold
                text-gray-700
                active:scale-95
              "
            >
              {cancelText}
            </button>

            <button
              onClick={onConfirm}
              disabled={loading}
              className={`
                min-h-[46px]
                rounded-2xl
                text-sm font-black
                text-white
                active:scale-95
                ${
                  danger
                    ? "bg-rose-500"
                    : "bg-[#715445]"
                }
              `}
            >
              {loading
                ? "Memproses..."
                : confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}