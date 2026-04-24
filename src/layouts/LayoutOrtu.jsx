import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/ortu/SidebarOrtu";
import AppHeader from "./AppHeader";
import Footer from "../components/ortu/FooterOrtu";

export default function LayoutOrtu() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#ECEBEB] text-gray-800 overflow-hidden">

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        <main className="flex-1 p-6 overflow-y-auto no-scrollbar">

          <AppHeader
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />

          <Outlet />

        </main>

        <Footer />
      </div>
    </div>
  );
}