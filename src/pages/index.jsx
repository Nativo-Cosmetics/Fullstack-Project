// **************************
// MAIN PAGE OF WEBSITE
// **************************

import React from 'react'

// IMport modules that forms main page
import Navbar from '../components/navigation/navbar.jsx'
import MainSection from '../components/sections/mainSection.jsx'
import Featured from '../components/store/featured.jsx'
import Catalog from '../components/store/catalog.jsx'
import Manners from '../components/sections/manners.jsx'
import About from '../components/sections/about.jsx'
import Reviews from '../components/sections/rating.jsx'
import Footer from '../components/navigation/footer.jsx'

const Index = () => {
  return (
    <>
        <Navbar />
        <MainSection />
        <Featured />
        <Manners />
        <About />
        <Reviews />
        <Footer />
    </>
  )
}

export default Index
