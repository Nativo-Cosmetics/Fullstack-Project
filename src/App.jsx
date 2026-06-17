import { Navigate, Routes, Route } from 'react-router-dom'
import Home from './pages/index.jsx'
import Shop from './pages/store.jsx'
import CatalogPage from './pages/CatalogPage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import Register from './pages/register.jsx'
import UserPage from './pages/userPage.jsx'
import Checkout from './pages/paymentPage.jsx'
import AdminProducts from './admin/AdminProducts.jsx'
import AdminReports from './admin/AdminReports.jsx'
import ProductViewPage from './pages/productViewPage.jsx'

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
        <Route path='/admin/productos' element={<AdminProducts />} />
        <Route path='/admin/reportes' element={<AdminReports />} />
        <Route path='/product' element={<ProductViewPage />} />
      </Routes>
    </>
  )
}

export default App
