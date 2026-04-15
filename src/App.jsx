import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetKirim";
import TestSidebar from "./pages/TestSidebar";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/admin" element={<TestSidebar />} />
    </Routes>
  );
}

export default App;