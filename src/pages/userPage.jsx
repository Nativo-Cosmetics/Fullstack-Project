import UserNav from '../components/navigation/userNav'
import CatalogPage from './CatalogPage'
import Cart from '../components/cart/CartPage'
import Profile from './profile'

import React from 'react'

const UserPage = () => {
  return (
    <div>
      <nav>
        <UserNav/>
      </nav>
      <main>
        <Profile/>
        <Cart/>
      </main>
    </div>
  )
}

export default UserPage