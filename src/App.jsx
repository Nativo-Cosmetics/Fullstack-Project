import { Navigate, Routes, Route } from 'react-router-dom'
import Home from './pages/index.jsx'
import Shop from './pages/store.jsx'
import CatalogPage from './pages/CatalogPage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import Register from './pages/register.jsx'
import Profile from './pages/profile.jsx'
import Cart from './pages/CartPage.jsx'
import UserPage from './pages/userPage.jsx'
import PaymentPage from './pages/paymentPage.jsx'

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
        <Route path='/cart' element={<Cart />}/>
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/user' element={<UserPage />} />
        <Route path='payment' element={<PaymentPage />}/>
      </Routes>
    </>
  )
}

export default App
