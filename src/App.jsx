import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import ResetPassword from "./pages/ResetKirim";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;