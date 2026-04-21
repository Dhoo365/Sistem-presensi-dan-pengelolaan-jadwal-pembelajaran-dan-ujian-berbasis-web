import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/guru/SidebarGuru";
import Header from "../components/guru/HeaderGuru";
import FooterGuru from "../components/guru/FooterGuru"

export default function LayoutOrtu() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#ECEBEB] text-gray-800 overflow-hidden">
      {/* Sidebar - Positioned on the left */}
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Main Content Area - includes Header and Page Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        <main className="flex-1 p-6 overflow-y-auto no-scrollbar">
          <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          <Outlet />
        </main>
        <FooterGuru></FooterGuru>
      </div>
    </div>
  );
}