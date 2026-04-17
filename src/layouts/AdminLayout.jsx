import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-[#ECEBEB] text-gray-800">

      <AdminSidebar />

      <main className="flex-1 p-6">
        <Outlet />
      </main>

    </div>
  );
}