import { Outlet } from "react-router-dom"
import NavbarAdmin from "../components/NavbarAdmin"

export default function AdminLayout() {
  return <div className="flex h-screen bg-[#ECEBEB] font-sans text-gray-800 overflow-hidden">
    <NavbarAdmin />
    <Outlet />
  </div>
}