import React from 'react'
import { Link } from 'react-router-dom'
import './footerUsers.css'

const FooterUsers = () => {
    return (
        <footer className="footer">
            <div className="footer-grid">

                {/* Columna marca */}
                <div className="brand-col">
                    <div className="brand-name">Nativo Cosmetics</div>
                    <div className="brand-tagline">Cosmética natural & consciente</div>
                    <p>Productos elaborados con ingredientes naturales, pensados para el cuidado de tu piel y el respeto al medioambiente.</p>
                </div>

                {/* Columna navegación */}
                <div>
                    <div className="col-title">Navegación</div>
                    <ul className="footer-links">
                        <li><Link to="/"><i className="ti ti-home" aria-hidden="true"></i> Inicio</Link></li>
                        <li><Link to="/tienda"><i className="ti ti-shopping-bag" aria-hidden="true"></i> Tienda</Link></li>
                        <li><Link to="/catalogo"><i className="ti ti-layout-grid" aria-hidden="true"></i> Catálogo</Link></li>
                        <li><Link to="/"><i className="ti ti-info-circle" aria-hidden="true"></i> Sobre nosotros</Link></li>
                        <li><Link to="/"><i className="ti ti-mail" aria-hidden="true"></i> Contacto</Link></li>
                    </ul>
                </div>

                {/* Columna redes sociales */}
                <div className="socials-col">
                    <div className="col-title">Síguenos</div>
                    <div className="social-grid">
                        <a href="https://www.instagram.com/nativo.cosmetic/" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Instagram">
                        <i className="ti ti-brand-instagram" aria-hidden="true"></i> Instagram
                        </a>
                        <a href="https://www.facebook.com/nativo.cosmetic" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Facebook">
                        <i className="ti ti-brand-facebook" aria-hidden="true"></i> Facebook
                        </a>
                        <a href="#" className="social-btn" aria-label="WhatsApp">
                        <i className="ti ti-brand-whatsapp" aria-hidden="true"></i> WhatsApp
                        </a>
                        <a href="#" className="social-btn" aria-label="LinkedIn">
                        <i className="ti ti-brand-linkedin" aria-hidden="true"></i> LinkedIn
                        </a>
                    </div>
                </div>
            </div>

            {/* Barra inferior */}
            <div className="footer-bottom">
                <span>© 2025 Nativo Cosmetics. Todos los derechos reservados.</span>
                <div className="legal-links">
                <a href="#">Privacidad</a>
                <span className="divider-dot">·</span>
                <a href="#">Términos de uso</a>
                <span className="divider-dot">·</span>
                <a href="#">Cookies</a>
                </div>
            </div>
        </footer>
    )
}

export default FooterUsers