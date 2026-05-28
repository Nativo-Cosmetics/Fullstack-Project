import { Routes, Route } from 'react-router-dom'
import Home from './pages/index.jsx'
import Shop from './pages/store.jsx'

import './global.css'

function App() {

  return (
    <>
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tienda' element={<Shop />} />
      </Routes>
    </>
  )
}

export default App
