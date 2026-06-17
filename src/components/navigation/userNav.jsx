import React from 'react'
import { Link } from 'react-router-dom'

import './navigation.css'

const UserNav = () => {
  return (
    <div className='user-nav-container'>
      <Link to='/' className='brandName'>Nativo Cosmetics</Link>
      <ul className='navlist'>
        <li className='item profile'><Link className='itemlink' to='/user/profile'>Mi perfíl</Link></li>
        <li className='item user-cart'><Link className='itemlink' to='/user/cart'>Carrito</Link></li>
        <li className='item store'><Link className='itemlink' to='/tienda'>Tienda</Link></li>
      </ul>
    </div>
  )
}

export default UserNav