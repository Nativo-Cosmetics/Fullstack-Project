import { Navigate, Routes, Route } from 'react-router-dom'
import Home from './pages/index.jsx'
import Shop from './pages/store.jsx'
import CatalogPage from './pages/CatalogPage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import Register from './pages/register.jsx'
import Profile from './pages/profile.jsx'
import AdminProducts from './admin/AdminProducts.jsx'

import './global.css'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tienda' element={<Shop />} />
        <Route path='/catalogo' element={<CatalogPage />} />
        <Route path='/catalogo/:productId' element={<ProductDetailPage />} />
        <Route path='/catalog' element={<Navigate replace to='/catalogo' />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/admin/productos' element={<AdminProducts />} />
      </Routes>
    </>
  )
}

export default App
