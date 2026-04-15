import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
/* Pages */
import Login from './pages/Login'
import Reset from './pages/Reset'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/reset' element={<Reset />}></Route>
      
    </Routes>

  )
}

export default App
