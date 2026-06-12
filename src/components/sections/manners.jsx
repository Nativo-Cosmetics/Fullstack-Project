import React from 'react'

import BrandLogo from '../../assets/img/about.webp'

const Manners = () => {
  return (
    <div className='manners-container'>
        <div className="triple">
            <div className="mision">
              <h2 className="value1 valueTitle">
                Misión
              </h2>
              <p className="value1 valueDesc">
                Brindar productos y experiencias de cuidado capilar natural, 
                efectivos y libres de químicos, elaborados con ingredientes reales y 
                sustentables del sur de Chile, promoviendo el bienestar integral de 
                las personas en armonía con la naturaleza.
              </p>
            </div>
            <div className="vision">
              <h2 className='value2 valueTitle'>
                Visión
              </h2>
              <p className="value2 valueDesc">
                Ser referentes en cosmética capilar orgánica a nivel nacional e 
                internacional, liderando un cambio hacia una belleza consciente, 
                sustentable y libre de estándares impuestos, demostrando que es posible 
                cuidar el cabello respetando el medio ambiente y la salud.
              </p>
            </div>
            <div className="valores">
              <h2 className='value3 valueTitle'>
                Valores
              </h2>
              <ul className='value3 valueDesc'>
                <li className='value'>Respeto por la natiraleza</li>
                <li className='value'>Autenticidad</li>
                <li className='value'>Bienestar integral</li>
                <li className='value'>Sustentabilidad</li>
                <li className='value'>Pasión y compromiso</li>
                <li className='value'>Innovación consciente</li>
              </ul>
            </div>
        </div>

        <div className="native-brand">
            <img src={BrandLogo} alt="Nativo Logo" className='native-brand-logo' />
        </div>
    </div>
  )
}

export default Manners
