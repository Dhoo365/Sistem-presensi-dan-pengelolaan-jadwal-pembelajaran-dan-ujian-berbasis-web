import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
/* Pages */
import Login from './pages/Login'
import Reset from './pages/Reset'
import ResetKirim from './pages/ResetKirim'
import DashboardOrtu from './pages/DashboardOrtu'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/reset' element={<Reset />}></Route>
      <Route path='/reset-kirim' element={<ResetKirim />}></Route>
      <Route path='/orangtua' element={<DashboardOrtu />}></Route>

    </Routes>

  )
}

export default App
