import { Navigate, Routes, Route } from 'react-router-dom'
import Home from './pages/index.jsx'
import Shop from './pages/store.jsx'
import CatalogPage from './pages/CatalogPage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import Register from './pages/register.jsx'
import UserPage from './pages/userPage.jsx'
import Checkout from './pages/paymentPage.jsx'
import AdminProductsPage from './components/admin/AdminProductsPage.jsx'
import AdminReportsPage from './components/admin/AdminReportsPage.jsx'
import ProductViewPage from './pages/productViewPage.jsx'
import ReservarPage from './pages/ReservarPage.jsx'
import MisReservasPage from './pages/MisReservasPage.jsx'

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
        <Route path='/user/*' element={<UserPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/admin/productos' element={<AdminProductsPage />} />
        <Route path='/admin/reportes' element={<AdminReportsPage />} />
        <Route path='/product' element={<ProductViewPage />} />
        <Route path='/reservar' element={<ReservarPage />} />
        <Route path='/mis-reservas' element={<MisReservasPage />} />
      </Routes>
    </>
  )
}

export default App
