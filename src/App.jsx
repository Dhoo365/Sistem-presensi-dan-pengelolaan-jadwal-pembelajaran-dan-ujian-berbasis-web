import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetKirim";
import UpdatePassword from "./pages/ResetUbah";
import AdminBeranda from "./pages/AdminBeranda";
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
      <Route path="*" element={<NotFoundPage />} />
    </Routes>

  )
}

export default App
