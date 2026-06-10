import React from 'react'

// Importing modules
import StaticNavbar from '../components/navigation/staticNavbar.jsx'
import Hero from '../components/sections/hero.jsx'
import Stock from './CatalogPage.jsx'


const Shop = () => {
  return (
    <div className='shop-container'>
      <StaticNavbar />
      <Hero />
      <Stock />
    </div>
  )
}

export default Shop
