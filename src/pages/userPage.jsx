import { Routes, Route, Navigate } from 'react-router-dom'
import UserNav from '../components/navigation/userNav'
import FooterUsers from '../components/navigation/footerUsers'
import Profile from './profile'
import Cart from '../components/cart/CartPage'
import Checkout from './paymentPage'
import ProductView from '../components/product/ProductView'

const UserPage = () => {
  return (
    <div>
      <nav>
        <UserNav /> 
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="profile" />} />
          <Route path="profile" element={<Profile />} />
          <Route path="cart" element={<Cart />} />
          <Route path="payment" element={<Checkout />} />
          <Route path='product/:productId' element={<ProductView/>} />
        </Routes>
      </main>
      <footer>
        <FooterUsers />
      </footer>
    </div>
  )
}

export default UserPage