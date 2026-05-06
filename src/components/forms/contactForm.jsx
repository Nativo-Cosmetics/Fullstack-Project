import React from 'react'

import './forms.css'
const ContactForm = () => {
  return (
    <div className='contactform-container'>
      <form action="post" className='form'>
        {/* <div className="input__container">
            <div className="shadow__input"></div>
            <input 
                type="text" 
                name="text" 
                placeholder='Name' 
                className='input__name input' />
        </div>
        <div className="input__container">
            <div className="shadow__input"></div>
            <input 
                type="text" 
                name="text" 
                placeholder='Apellido' 
                className='input__lastname input' />
        </div>
        <div className="input__container">
            <div className="shadow__input"></div>
            <input 
                type="text" 
                name="text" 
                placeholder='Email' 
                className='input__email input' />
        </div> */}
        <div className="inputHolder">
            <input type="text" name='name' placeholder='Name' className='nameInput input' />
        </div>
        <div className="inputHolder">
            <input type="text" name='lastName' placeholder='Last Name' className='lastNameInput input' />
        </div>
        <div className="inputHolder">
            <input type="email" name='email' placeholder='Correo' className='emailInput input' />
        </div>
        <div className="inputHolder textAreaHolder">
            <textarea name="message" className='messageInput input' placeholder='Message'></textarea>
        </div>
        <button className='submitForm'>Enviar mensaje</button>
      </form>

      <div className="infoTxtContainer">
        <h2 className='contactTtl'>
            ¡Habla con nosotros!
        </h2>
      </div>
    </div>
  )
}

export default ContactForm
