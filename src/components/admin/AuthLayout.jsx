import bg from "../assets/foto/background.png";
import logo from "../assets/foto/logo.png";

export default function AuthLayout({
  children,
}) {
  return (
    <div
      className="
        min-h-screen
        relative
        overflow-hidden
        font-sans
        flex items-center justify-center
        px-3 py-4
        sm:px-6 sm:py-6
        lg:px-8
      "
    >
      {/* BACKGROUND */}
      <div
        className="
          absolute inset-0
          bg-cover bg-center
          scale-105
        "
        style={{
          backgroundImage: `url(${bg})`,
        }}
      />

      {/* OVERLAY */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-br
          from-black/60
          via-black/40
          to-[#362B26]/60
        "
      />

      {/* BLUR */}
      <div className="absolute inset-0 backdrop-blur-[4px]" />

      {/* MAIN WRAPPER */}
      <div
        className="
          relative z-20
          w-full
          max-w-6xl

          rounded-[2rem]
          sm:rounded-[2.3rem]

          overflow-hidden
          border border-white/15

          bg-white/10
          backdrop-blur-xl

          shadow-[0_25px_70px_rgba(0,0,0,0.30)]
        "
      >
        <div
          className="
            grid grid-cols-1
            lg:grid-cols-2

            min-h-auto
            lg:min-h-[720px]
          "
        >
          {/* LEFT */}
          <div
            className="
              bg-[#F6F2EF]

              px-4 py-5
              sm:px-8 sm:py-8
              md:px-10 md:py-10
              xl:px-14 xl:py-12

              flex flex-col justify-center
            "
          >
            {/* MOBILE BRAND */}
            <div className="lg:hidden text-center mb-6">
              <img
                src={logo}
                alt="Logo"
                className="
                  w-16 h-16
                  sm:w-20 sm:h-20
                  mx-auto
                  object-contain
                  drop-shadow-xl
                "
              />

              <p
                className="
                  mt-3
                  text-xs
                  font-black
                  tracking-[0.25em]
                  text-[#715445]
                "
              >
                SD GMIM 12 MANADO
              </p>
            </div>

            {/* SAFE CHILDREN PRESERVED */}
            <div className="w-full max-w-md mx-auto">
              {children}
            </div>

            <p
              className="
                lg:hidden
                mt-6
                text-center
                text-[11px]
                text-gray-500
                font-medium
              "
            >
              Sistem Presensi & Penjadwalan
            </p>
          </div>

          {/* RIGHT */}
          <div
            className="
              hidden lg:flex

              relative overflow-hidden

              bg-gradient-to-br
              from-[#715445]
              via-[#5E4336]
              to-[#362B26]

              px-10 xl:px-14
              py-12

              items-center justify-center
            "
          >
            {/* DECOR */}
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white/15 to-transparent" />
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-28 -left-24 w-80 h-80 rounded-full bg-black/20 blur-3xl" />

            {/* CONTENT */}
            <div className="relative z-10 text-center max-w-md">
              <div
                className="
                  w-32 h-32
                  xl:w-36 xl:h-36

                  rounded-[2rem]

                  bg-white/10
                  border border-white/15

                  flex items-center justify-center

                  mx-auto mb-8

                  backdrop-blur-md
                  shadow-2xl
                "
              >
                <img
                  src={logo}
                  alt="Logo"
                  className="w-24 h-24 object-contain"
                />
              </div>

              {/* JANGAN UBAH KATA */}
              <p className="text-white/70 text-xs font-black tracking-[0.35em] uppercase mb-4">
                Smart School Platform
              </p>

              {/* JANGAN UBAH KATA */}
              <h2 className="text-white text-3xl xl:text-4xl font-black leading-tight tracking-tight">
                Sistem Presensi
                <br />
                dan Penjadwalan
              </h2>

              {/* JANGAN UBAH KATA */}
              <p className="mt-5 text-white/70 text-sm xl:text-base leading-relaxed">
                Platform sekolah modern untuk administrasi cepat,
                rapi, aman, dan profesional.
              </p>

              <div className="mt-10 space-y-3 text-left">
                {[
                  "Presensi realtime",
                  "Jadwal otomatis",
                  "Data terpusat",
                ].map((item) => (
                  <div
                    key={item}
                    className="
                      flex items-center gap-3
                      rounded-2xl
                      bg-white/10
                      border border-white/10
                      px-4 py-3
                      text-white/90
                      text-sm font-semibold
                    "
                  >
                    <span className="w-2 h-2 rounded-full bg-white" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* END RIGHT */}
        </div>
      </div>
    </div>
  );
}