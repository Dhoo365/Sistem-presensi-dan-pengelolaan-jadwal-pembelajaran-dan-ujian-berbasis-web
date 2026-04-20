import React, { useState } from "react";
import {
  Menu,
  User,
  Search,
  Plus,
  KeyRound,
  Power,
  Pencil,
  UserCog,
} from "lucide-react";

export default function AdminKelolaAkun() {
  const [tab, setTab] = useState("guru");
  const [status, setStatus] = useState("semua");
  const [search, setSearch] = useState("");

  const guru = [
    {
      id: 1,
      nama: "Bu Rina",
      nip: "1987721",
      email: "rina@mail.com",
      aktif: true,
    },
    {
      id: 2,
      nama: "Pak Joko",
      nip: "1987722",
      email: "joko@mail.com",
      aktif: true,
    },
    {
      id: 3,
      nama: "Bu Devi",
      nip: "1987724",
      email: "-",
      aktif: false,
    },
  ];

  const ortu = [
    {
      id: 1,
      anak: "Andriano",
      kelas: "Kelas 1",
      email: "ortu.andri@mail.com",
      aktif: true,
    },
    {
      id: 2,
      anak: "Zahra",
      kelas: "Kelas 3",
      email: "-",
      aktif: false,
    },
    {
      id: 3,
      anak: "Yusuf",
      kelas: "Kelas 4",
      email: "ortu.yusuf@mail.com",
      aktif: true,
    },
  ];

  const data = tab === "guru" ? guru : ortu;

  const result = data.filter((item) => {
    const key =
      tab === "guru"
        ? `${item.nama} ${item.nip}`
        : `${item.anak} ${item.kelas}`;

    const cocokSearch = key
      .toLowerCase()
      .includes(search.toLowerCase());

    const cocokStatus =
      status === "semua"
        ? true
        : status === "aktif"
        ? item.aktif
        : !item.aktif;

    return cocokSearch && cocokStatus;
  });

  return (
    <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#ECEBEB]">
      <div className="flex-1 overflow-y-auto p-8 pb-20">

        {/* TAB */}
        <div className="inline-flex items-center bg-[#DFDFDF] border border-gray-300 rounded-full p-1.5 mb-6 shadow-sm">
          <button
            onClick={() => setTab("guru")}
            className={`px-6 py-2.5 text-sm font-bold rounded-full transition ${
              tab === "guru"
                ? "bg-[#ECEBEB] border border-gray-400 text-gray-800"
                : "text-gray-600"
            }`}
          >
            Kelola Akun Guru
          </button>

          <button
            onClick={() => setTab("ortu")}
            className={`px-6 py-2.5 text-sm font-bold rounded-full transition ${
              tab === "ortu"
                ? "bg-[#ECEBEB] border border-gray-400 text-gray-800"
                : "text-gray-600"
            }`}
          >
            Kelola Akun Orang Tua
          </button>
        </div>

        {/* CONTENT */}
        <section className="bg-[#DFDFDF] rounded-2xl p-6 border border-gray-300 shadow-sm">

          {/* HEADER CARD */}
          <div className="flex justify-between items-start mb-5">
            <div className="flex items-start gap-3">
              <UserCog size={28} className="text-gray-700 mt-1" />

              <div>
                <h3 className="font-bold text-xl text-gray-800">
                  {tab === "guru"
                    ? "Daftar Akun Guru"
                    : "Daftar Akun Orang Tua"}
                </h3>

                <p className="text-sm text-gray-600 font-medium">
                  {tab === "guru"
                    ? "Manajemen akun guru dan akses login tenaga pengajar"
                    : "Manajemen akun orang tua dan akses login wali murid"}
                </p>
              </div>
            </div>

            <button className="bg-[#715445] hover:bg-[#5E4236] text-white text-sm font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-colors shadow-sm">
              <Plus size={18} />
              Tambah Akun
            </button>
          </div>

          {/* FILTER */}
          <div className="flex gap-4 mb-5">

            {/* SEARCH */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={
                  tab === "guru"
                    ? "Cari NIP / Nama Guru..."
                    : "Cari Nama Anak / Kelas..."
                }
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 text-sm outline-none bg-white"
              />

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />
            </div>

            {/* STATUS */}
            <div className="inline-flex bg-white border border-gray-300 rounded-xl overflow-hidden">
              {["semua", "aktif", "nonaktif"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`px-5 text-sm font-bold capitalize ${
                    status === s
                      ? "bg-[#ECEBEB] text-gray-800"
                      : "text-gray-500"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-2xl border border-gray-300 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-700 whitespace-nowrap">
                <thead className="border-b border-gray-200 bg-[#F8F8F8]">
                  <tr>
                    {tab === "guru" ? (
                      <>
                        <th className="px-6 py-4 font-bold text-gray-500 uppercase text-xs">
                          Nama Guru
                        </th>
                        <th className="px-6 py-4 font-bold text-gray-500 uppercase text-xs">
                          NIP
                        </th>
                        <th className="px-6 py-4 font-bold text-gray-500 uppercase text-xs">
                          Email
                        </th>
                      </>
                    ) : (
                      <>
                        <th className="px-6 py-4 font-bold text-gray-500 uppercase text-xs">
                          Nama Anak
                        </th>
                        <th className="px-6 py-4 font-bold text-gray-500 uppercase text-xs">
                          Kelas
                        </th>
                        <th className="px-6 py-4 font-bold text-gray-500 uppercase text-xs">
                          Email Ortu
                        </th>
                      </>
                    )}

                    <th className="px-6 py-4 font-bold text-gray-500 uppercase text-xs">
                      Status
                    </th>

                    <th className="px-6 py-4 font-bold text-gray-500 uppercase text-xs text-center">
                      Aksi
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {result.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      {tab === "guru" ? (
                        <>
                          <td className="px-6 py-4 font-bold text-gray-800">
                            {item.nama}
                          </td>
                          <td className="px-6 py-4">{item.nip}</td>
                          <td className="px-6 py-4">{item.email}</td>
                        </>
                      ) : (
                        <>
                          <td className="px-6 py-4 font-bold text-gray-800">
                            {item.anak}
                          </td>
                          <td className="px-6 py-4">{item.kelas}</td>
                          <td className="px-6 py-4">{item.email}</td>
                        </>
                      )}

                      {/* STATUS */}
                      <td className="px-6 py-4">
                        <span
                          className={`text-[11px] font-bold px-3 py-1.5 rounded-full border ${
                            item.aktif
                              ? "bg-[#E4F5E8] text-[#60B873] border-[#60B873]"
                              : "bg-[#FCEAE9] text-[#E16766] border-[#E16766]"
                          }`}
                        >
                          {item.aktif
                            ? "AKTIF"
                            : "NONAKTIF"}
                        </span>
                      </td>

                      {/* AKSI */}
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">

                          <button className="bg-[#E8F0FE] text-[#1A73E8] border border-[#1A73E8] hover:bg-blue-100 px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors">
                            <Pencil size={14} />
                            Edit Email
                          </button>

                          <button className="bg-[#ECECEC] text-gray-700 border border-gray-300 hover:bg-gray-100 px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors">
                            <KeyRound size={14} />
                            Reset
                          </button>

                          <button
                            className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors border ${
                              item.aktif
                                ? "bg-[#FCEAE9] text-[#E16766] border-[#E16766]"
                                : "bg-[#E4F5E8] text-[#60B873] border-[#60B873]"
                            }`}
                          >
                            <Power size={14} />
                            {item.aktif
                              ? "Nonaktifkan"
                              : "Aktifkan"}
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))}

                  {result.length === 0 && (
                    <tr>
                      <td
                        colSpan="5"
                        className="py-10 text-center text-gray-400"
                      >
                        Data tidak ditemukan
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}