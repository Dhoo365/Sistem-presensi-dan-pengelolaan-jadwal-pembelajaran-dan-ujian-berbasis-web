// AdminLayout.jsx
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import AppHeader from "./AppHeader";
import AdminFooter from "../components/admin/FooterAdmin";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // auto close sidebar saat resize ke desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );
  }, []);

  return (
    <div className="h-screen flex bg-[#ECEBEB] text-gray-800 overflow-hidden">

      {/* MOBILE OVERLAY */}
      {isMobileSidebarOpen && (
        <div
          onClick={() =>
            setIsMobileSidebarOpen(false)
          }
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* DESKTOP SIDEBAR */}
      <div className="hidden lg:block h-full">
        <AdminSidebar
          isSidebarOpen={isSidebarOpen}
          mobile={false}
        />
      </div>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 left-0 z-50 h-full lg:hidden transition-transform duration-300 ${
          isMobileSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <AdminSidebar
          isSidebarOpen={true}
          mobile={true}
          closeSidebar={() =>
            setIsMobileSidebarOpen(false)
          }
        />
      </div>

      {/* CONTENT */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">

        <main className="flex-1 overflow-y-auto no-scrollbar p-3 sm:p-4 md:p-6">

          <AppHeader
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            openMobileSidebar={() =>
              setIsMobileSidebarOpen(true)
            }
          />

          <Outlet />

        </main>

        <AdminFooter />

      </div>
    </div>
  );
}