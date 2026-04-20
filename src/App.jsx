import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/login/Login";
import ResetPassword from "./pages/login/ResetKirim";
import Reset from "./pages/login/Reset";
import UpdatePassword from "./pages/login/ResetUbah";
import NotFoundPage from "./pages/NotFoundPage";

import ProtectedRoute from "./components/common/ProtectedRoute";

/* ADMIN */
import AdminLayout from "./layouts/AdminLayout";
import AdminBeranda from "./pages/admin/AdminBeranda";
import AdminKelolaMurid from "./pages/admin/AdminKelolaMurid";
import AdminKelolaGuru from "./pages/admin/AdminKelolaGuru";
import AdminKelolaKelas from "./pages/admin/AdminKelolaKelas";
import AdminKelolaJadwal from "./pages/admin/AdminKelolaJadwal";
import AdminKelolaAkun from "./pages/admin/AdminKelolaAkun";
import AdminKelolaMapel from "./pages/admin/AdminKelolaMapel";

/* ORTU */
import LayoutOrtu from "./layouts/LayoutOrtu";
import DashboardOrtu from "./pages/ortu/DashboardOrtu";
import LihatPresensi from "./pages/ortu/LihatPresensi";
import JadwalOrtu from "./pages/ortu/JadwalOrtu";

function App() {
  return (
    <Routes>
      {/* LOGIN */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="/update-password" element={<UpdatePassword />} />

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminBeranda />} />
        <Route path="murid" element={<AdminKelolaMurid />} />
        <Route path="guru" element={<AdminKelolaGuru />} />
        <Route path="kelas" element={<AdminKelolaKelas />} />
        <Route path="jadwal" element={<AdminKelolaJadwal />} />
        <Route path="akun" element={<AdminKelolaAkun />} />
        <Route path="mapel" element={<AdminKelolaMapel />} />
      </Route>

      {/* ORTU */}
      <Route
        path="/ortu"
        element={
          <ProtectedRoute
            allowedRoles={["ortu", "orangtua"]}
          >
            <LayoutOrtu />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardOrtu />} />
        <Route
          path="lihat-presensi"
          element={<LihatPresensi />}
        />
        <Route
          path="lihat-jadwal"
          element={<JadwalOrtu />}
        />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;