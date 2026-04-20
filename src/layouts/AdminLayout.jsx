import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";
import AdminFooter from "../components/admin/FooterAdmin"

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#ECEBEB] text-gray-800 overflow-hidden">
      {/* Sidebar - Positioned on the left */}
      <AdminSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Main Content Area - includes Header and Page Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        <main className="flex-1 p-6 overflow-y-auto no-scrollbar">
          <AdminHeader isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          <Outlet />
        </main>
        <AdminFooter></AdminFooter>
      </div>
    </div>
  );
}