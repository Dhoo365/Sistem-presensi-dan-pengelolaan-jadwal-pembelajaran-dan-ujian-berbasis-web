import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetKirim";
import AdminBeranda from "./pages/AdminBeranda";
import AdminLayout from './layouts/AdminLayout'
import AdminKelolaMurid from "./pages/AdminKelolaMurid";
import AdminKelolaGuru from './pages/AdminKelolaGuru'
import AdminKelolaKelas from './pages/AdminKelolaKelas'
import AdminKelolaJadwal from './pages/AdminKelolaJadwal'
import AdminKelolaAkun from "./pages/AdminKelolaAkun";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminBeranda />} />
        <Route path="murid" element={<AdminKelolaMurid />} />
        <Route path="guru" element={<AdminKelolaGuru />} />
        <Route path="kelas" element={<AdminKelolaKelas />} />
        <Route path="jadwal" element={<AdminKelolaJadwal />} />
        <Route path="akun" element={<AdminKelolaAkun />} />
      </Route>
    </Routes>
  );
}

export default App;