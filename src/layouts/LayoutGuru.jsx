import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/guru/SidebarGuru";
import AppHeader from "./AppHeader";
import FooterGuru from "../components/guru/FooterGuru";

export default function LayoutGuru() {
  const [isSidebarOpen, setIsSidebarOpen] =
    useState(true);

  return (
    <div
      className="
        flex
        h-screen
        bg-[#ECEBEB]
        text-gray-800
        overflow-hidden
      "
    >
      {/* SAFE RESPONSIVE REFACTOR */}
      {/* SIDEBAR */}
      <Sidebar
        isSidebarOpen={
          isSidebarOpen
        }
        setIsSidebarOpen={
          setIsSidebarOpen
        }
      />

      {/* CONTENT WRAPPER */}
      <div
        className="
          flex-1
          min-w-0
          flex flex-col
          overflow-hidden
        "
      >
        {/* SCROLL AREA */}
        <main
          className="
            flex-1
            min-h-0
            overflow-y-auto
            overflow-x-hidden
            no-scrollbar

            px-3 py-3
            sm:px-4 sm:py-4
            lg:px-6 lg:py-5
          "
        >
          {/* HEADER */}
          <div className="mb-4 sm:mb-5">
            <AppHeader
              isSidebarOpen={
                isSidebarOpen
              }
              setIsSidebarOpen={
                setIsSidebarOpen
              }
            />
          </div>

          {/* PAGE CONTENT */}
          <div
            className="
              w-full
              max-w-full
              pb-6
              sm:pb-8
            "
          >
            <Outlet />
          </div>
        </main>

        {/* FOOTER */}
        <div className="shrink-0">
          <FooterGuru />
        </div>
      </div>
    </div>
  );
}