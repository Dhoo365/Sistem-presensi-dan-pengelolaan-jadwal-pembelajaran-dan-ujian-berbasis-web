import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import ResetPassword from "./pages/login/ResetKirim";
import UpdatePassword from "./pages/ResetUbah";
import AdminBeranda from "./pages/admin/AdminBeranda";
import AdminLayout from './layouts/AdminLayout'
import AdminKelolaMurid from "./pages/admin/AdminKelolaMurid";
import AdminKelolaGuru from './pages/admin/AdminKelolaGuru'
import AdminKelolaKelas from './pages/admin/AdminKelolaKelas'
import AdminKelolaJadwal from './pages/admin/AdminKelolaJadwal'
import AdminKelolaAkun from "./pages/admin/AdminKelolaAkun";
import NotFoundPage from "./pages/login/NotFoundPage";
import DashboardOrtu from './pages/ortu/DashboardOrtu'
import LayoutOrtu from './layouts/LayoutOrtu'
import AdminKelolaMapel from "./pages/admin/AdminKelolaMapel";
import DashboardGuru from "./pages/guru/DashboardGuru"
import LayoutGuru from "./layouts/LayoutGuru"
import KelolaPresensi from "./pages/guru/KelolaPresensi"
import RiwayatPresensi from "./pages/guru/RiwayatPresensi"
import LihatJadwal from "./pages/guru/LihatJadwal"

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/update-password" element={<UpdatePassword />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminBeranda />} />
        <Route path="murid" element={<AdminKelolaMurid />} />
        <Route path="guru" element={<AdminKelolaGuru />} />
        <Route path="kelas" element={<AdminKelolaKelas />} />
        <Route path="jadwal" element={<AdminKelolaJadwal />} />
        <Route path="akun" element={<AdminKelolaAkun />} />
        <Route path="mapel" element={<AdminKelolaMapel />} />
      </Route>
      <Route path="/guru" element={<LayoutGuru />}>
        <Route index element={<DashboardGuru />} />
        <Route path="presensi" element={<KelolaPresensi />} />
        <Route path="riwayat" element={<RiwayatPresensi />} />
        <Route path="jadwal" element={<LihatJadwal />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>

  )
}

export default App
