import React from 'react'

import ContactForm from '../forms/contactForm.jsx'
import OwnerPt from '../../assets/img/ownerFixed.jpeg'

const About = () => {
    return (
        <>
            <div className='aboutUs-container'>
                <div className="whoIs">
                    <img src={OwnerPt} alt="" className='imgOwner' />
                </div>
                <div className="aboutOwner">
                    <h2 className='ownerName'>Andrés Olmos</h2>
                    <p className='aboutTxt'>
                        Mi nombre es Andrés Olmos, fundador de NATIVO, y nos dedicamos
                        a la elaboración de productos que no solo embellecen sino que
                        celebran y aprovechan la riqueza de nuestra tierra. Nuestra gama
                        se distingue por su compromiso con la sostenibilidad y el uso de
                        ingredientes autóctonos del sur de Chile, conocidos por sus
                        propiedades beneficiosas para el cuidado del cabello.
                    </p>
                </div>
            </div>

            <ContactForm />
        </>
    )
}

export default About
