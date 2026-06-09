import { Link } from 'react-router-dom'

import './navigation.css'
import Logo from '../../assets/img/nativo-logo.png'


const Navbar = () => {
  return (
    <div className='navbar-container'>
        <div className="img-container">
            <img src={Logo} alt="Logo" />
        </div>
        <div className="navbar-content">
            <div className="navlist">
            <Link className='link home-link' to="/">Inicio</Link>
            <Link className='link store-link' to="/tienda">Tienda</Link>
            <Link className='link contact-link' to="/register">Contacto</Link>
            <Link className='link catalog-link' to="/catalogo">Catálogo</Link>
            <Link className='link catalog-link' to="/cart">Carrito</Link>
        </div>
        <div className="btn-container">
            <Link className='redirectBtn storeBtn' to='/register'>Iniciar sesión</Link>
            <Link className='redirectBtn bookingBtn' to='/'>Agenda tu hora!</Link>
        </div>
        </div>
    </div>
  )
}

export default Navbar
