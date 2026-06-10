import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './navigation.css'

// function to open cart modal
// const [openCart, setOpenCart] = useState(false);

const StaticNavbar = () => {
  return (
    <div className='static-navbar'>
      <div className="brandName">
        Nativo Cosmetics
      </div>
      <ul className='nav-links'>
        <li className="item">
          <Link to='/' className='link'>Inicio</Link>
        </li>
        <li className="item">
          <Link to='/catalogo' className='link'>Catálogo</Link>
        </li>
        <li className="item">
          <Link to='/profile' className='link'>Mi perfil</Link>
        </li>
        <li className="item" className='link'>Carrito</li>
      </ul>
    </div>
  )
}

export default StaticNavbar
