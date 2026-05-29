import { Routes, Route } from 'react-router-dom'
import Home from './pages/index.jsx'
import Shop from './pages/store.jsx'
import Catalog from './components/store/catalog.jsx'
import Register from './pages/register.jsx'


import './global.css'

function App() {

  return (
    <>
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tienda' element={<Shop />} />
        <Route path='/catalog' element={<Catalog />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  )
}

export default App
