import { Routes, Route } from 'react-router-dom'
import Home from './pages/index.jsx'
import Catalog from './components/store/catalog.jsx'

import './global.css'

function App() {

  return (
    <>
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/catalog' element={<Catalog />} />
      </Routes>
    </>
  )
}

export default App
