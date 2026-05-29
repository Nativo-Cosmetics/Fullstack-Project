import React, { useState } from 'react'
import './auth.css'

const LogForm = () => {

  const [toggleForm, setToggleForm] = useState(false)

  const handleToggle= (e) => {
    e.preventDefault()
    setToggleForm(prev => !prev)
  }

  return (
    <div className='form-container'>
      <div className="register-form-container">
        <div 
          className="toggle-forms rform"
          style={{display: toggleForm ? 'flex' : 'none'}}>
          <span className='changeForm'>
            ¿No tienes una cuenta?
          </span>
          <button 
          className='form-btn'
            onClick={handleToggle}>
            Regístrate
          </button>
        </div>
        
        <div 
        className="signin-form"
          style={{ display: toggleForm ? 'none' : 'flex' }}>
          <h2>Regístrate</h2>
          <div className="signIn">
            <input className="signin-input" type="text" placeholder='Nombre' />
            <input className="signin-input" type="text" placeholder='Apellido' />
            <input className="signin-input" type="email" placeholder='Correo Electrónico' />
            <input className="signin-input" type="password" placeholder='Contraseña' />
            <input className="signin-input" type="password" placeholder='Confirmar Contraseña' />
            <button className='-signin-form-btn'>Registrarse</button>
          </div>
        </div>
      </div>

      <div className="login-form-container">
        <div 
          className="toggle-forms lform"
          style={{display: toggleForm ? 'none' : 'flex'}}>
          <span className='changeForm'>
            ¿Ya tienes una cuenta?
          </span>
          <button 
            className='form-btn'
            onClick={handleToggle}>
            Inicia Sesión
          </button>
        </div>
      </div>
      <div 
        className="signup-form"
        style={{ display: toggleForm ? 'flex' : 'none' }}>
        <h2>Bienvenid@</h2>
        <div className="signUp">
          <input className="signup-input" type="email" placeholder='Correo Electrónico' />
          <input className="signup-input" type="password" placeholder='Contraseña' />
          <button className='-signin-form-btn'>Entrar</button>
        </div>
      </div>
    </div>
  )
}

export default LogForm
