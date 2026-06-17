import React from 'react'

import UserNav from '../components/navigation/userNav';
import Navbar from '../components/navigation/navbar.jsx';
import ProductView from '../components/product/ProductView';
import Reviews from '../components/product/reviewsProduct.jsx';
import FooterUsers from '../components/navigation/footerUsers';
import { useLocation } from 'react-router-dom';


const ProductViewPage = () => {
    const location = useLocation();
    return (
        <div>
            <nav>
                {location.pathname === "/cart" ? (<UserNav/>):(
                    <Navbar/>
                )}
            </nav>  
            <main>
                <ProductView/>
                <Reviews/>
            </main>
            <footer>
                <FooterUsers/>
            </footer>
        </div> 
    )
}

export default ProductViewPage;