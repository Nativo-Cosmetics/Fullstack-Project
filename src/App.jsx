import { Navigate, Routes, Route } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext, AuthProvider } from './context/authContext.jsx'


import Home from './pages/index.jsx'
import Shop from './pages/store.jsx'
import CatalogPage from './pages/CatalogPage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import Register from './pages/register.jsx'
import Profile from './pages/profile.jsx'
import Cart from './pages/CartPage.jsx'
import PaymentPage from './pages/paymentPage.jsx'
import AdminProducts from './admin/AdminProducts.jsx'
import AdminReports from './admin/AdminReports.jsx'

import './global.css'

// Aux function to protect routes that requires auth
const ProtectedRoute = ({ children, isAdminRequired = false }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Cargando Sesión...</div> // to stop blinking while validasting cookie

  if (!user) {
    return <Navigate to='/register' /> // if doesn't find a session, redirect to login page, to generate one
  }

  if (isAdminRequired && user.role !== 'admin') {
    return <Navigate to='/' /> // send to main page if not admin.
  }

  return children;
}


function App() {
  return (
    <AuthProvider>
      <Routes>

        {/* public routes */}
        <Route path='/' element={<Home />} />
        <Route path='/tienda' element={<Shop />} />
        <Route path='/catalogo' element={<CatalogPage />} />
        <Route path='/catalogo/:productId' element={<ProductDetailPage />} />
        <Route path='/catalog' element={<Navigate replace to='/catalogo' />} />
        <Route path='/register' element={<Register />} />

        {/* protected routes for clients */}
        <Route path='/profile' element={<Profile />} />
        <Route path='/user' element={<UserPage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/payment' element={<PaymentPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />

        {/* protected routes for admin */}
        <Route path='/admin/productos' element={<AdminProducts />} />
        <Route path='/admin/reportes' element={<AdminReports />} />
      </Routes>
    </AuthProvider>

  )
}

export default App
