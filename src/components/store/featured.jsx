import React from 'react'

import './store.css'

const Featured = () => {
  return (
    <div className='featured-container'>
        <h2 className="ftTitle">
            Featured Products!
        </h2>
        
        {/* 

        Ahora se colocará un div temporal para visualizar como deberían
        mostrarse los productos destacados, luego se reemplazará por una función map
        conectada a la database, que mostrará los productos destacados de la tienda.

        */}

        <div className="productCards">
            <div className="itemCard">
                <img className='itemMedia' src="https://nativocosmetic.com/cdn/shop/files/Amor_-_Mascarilla_Hidratante_Reparadora_-_Fondo.png?v=1740091424&width=270" alt="" />

                <h3 className="itemName">Producto 1</h3>
                <p className="itemPrice">$10.000</p>
            </div>
            <div className="itemCard">
                <img className='itemMedia' src="https://nativocosmetic.com/cdn/shop/files/Amor_-_Mascarilla_Hidratante_Reparadora_-_Fondo.png?v=1740091424&width=270" alt="" />

                <h3 className="itemName">Producto 1</h3>
                <p className="itemPrice">$10.000</p>
            </div>
            <div className="itemCard">
                <img className='itemMedia' src="https://nativocosmetic.com/cdn/shop/files/Amor_-_Mascarilla_Hidratante_Reparadora_-_Fondo.png?v=1740091424&width=270" alt="" />

                <h3 className="itemName">Producto 1</h3>
                <p className="itemPrice">$10.000</p>
            </div>
        </div>

    </div>
  )
}

export default Featured