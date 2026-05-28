import React from 'react'
import { Link } from 'react-router-dom'

import Logo from '../../assets/img/nativo-logo.png'
// IMporting icons for socialmedia
// import WSP from '../../assets/icons/Whatsapp.svg'
import FB from '../../assets/icons/Facebook.svg?react'
import IG from '../../assets/icons/Instagram.svg?react'
import LD from '../../assets/icons/LinkedIn.svg?react'
import WSP from '../../assets/icons/Whatsapp.svg?react'



const Footer = () => {
  return (
    <div className='footer-container'>
      <div className="socials">
        <img src={Logo} alt="Nativo Cosmetics Logo" className='brand-social-logo' />

        <div className="media">
          <a href="404" className='mediaLink'>
            <WSP className='mediaIcon media-wsp' />
          </a>

          <a href="https://www.facebook.com/nativo.cosmetic" className='mediaLink' target="_blank" rel="noopener noreferrer">
            <FB className='mediaIcon media-fb' />
          </a>

          <a href="https://www.instagram.com/nativo.cosmetic/" className='mediaLink' target="_blank" rel="noopener noreferrer">
            <IG className='mediaIcon media-ig' />
          </a>

          <a href="404" className='mediaLink'>
            <LD className='mediaIcon media-ld' />
          </a>

        </div>
      </div>
      <div className="links-container">
        <h3 className="linksTitle">Enlaces</h3>

        <ul className="linkList">
          <li className="item">
            <Link className='itemlink'  to="/">Inicio</Link>
          </li>

          <li className="item">
            <Link className='itemlink'  to="/tienda">Tienda</Link>
          </li>

          <li className="item">
            <Link className='itemlink'  to="/">Sobre nosotros</Link>
          </li>

          <li className="item">
            <Link className='itemlink' to="/">Contácto</Link>
          </li>
        </ul>

        <ul className="linkList">
          <li className="item">
            <Link className='itemlink' to="/">Inicio</Link>
          </li>

          <li className="item">
            <Link className='itemlink' to="/tienda">Tienda</Link>
          </li>

          <li className="item">
            <Link className='itemlink' to="/">Sobre nosotros</Link>
          </li>

          <li className="item">
            <Link className='itemlink' to="/">Contácto</Link>
          </li>
        </ul>

        <ul className="linkList">
          <li className="item">
            <Link className='itemlink' to="/">Inicio</Link>
          </li>

          <li className="item">
            <Link className='itemlink' to="/tienda">Tienda</Link>
          </li>

          <li className="item">
            <Link className='itemlink'  to="/">Sobre nosotros</Link>
          </li>

          <li className="item">
            <Link className='itemlink' to="/">Contácto</Link>
          </li>
        </ul>


      </div>
    </div>
  )
}

export default Footer