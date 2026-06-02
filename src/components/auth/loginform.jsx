import React, { useState } from 'react'
import './auth.css'
import { Link } from 'react-router-dom'


const LogForm = () => {

  const mockUsers = [
    {
      "email": "test@nativo.com",
      "password": "1234",
      "name": "user"
    },
    {
      "email": "admin@nativo.com",
      "password": "admin1234",
      "name": "admin"
    }
  ]

  const [loginError, setLoginError] = useState('')

  const handleToggle = (e) => {
    e.preventDefault()
    setToggleForm(prev => !prev)
  }

  // Logical managment
  const [toggleForm, setToggleForm] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    const user = mockUsers.find(u => u.email === email && u.password === password)

    if (user) {
      alert(`Bienvenido ${user.name}`)
    } else {
      setLoginError('Correo o contraseña incorrectos')
    }
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className='form-container'>
      <div className="register-form-container">
        <div
          className="toggle-forms rform"
          style={{ display: toggleForm ? 'flex' : 'none' }}>
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
          <h2 className="form-title">Regístrate</h2>
          <div className="signIn">
            <input className="signin-input" type="text" placeholder='Nombre' />
            <input className="signin-input" type="text" placeholder='Apellido' />
            <input className="signin-input" type="email" placeholder='Correo Electrónico' />
            <input className="signin-input" type="password" placeholder='Contraseña' />
            <input className="signin-input" type="password" placeholder='Confirmar Contraseña' />
            <button className='signin-form-btn'>Registrarse</button>
          </div>
        </div>
      </div>

      <div className="login-form-container">
        <div
          className="toggle-forms lform"
          style={{ display: toggleForm ? 'none' : 'flex' }}>
          <span className='changeForm'>
            ¿Ya tienes una cuenta?
          </span>
          <button
            className='form-btn'
            onClick={handleToggle}>
            Inicia Sesión
          </button>
        </div>
        <div
          className="signup-form"
          style={{ display: toggleForm ? 'flex' : 'none' }}>
          <h2 className="form-title">Bienvenid@</h2>
          <div className="signUp">
            <input 
            className="signup-input" 
            type="email" 
            placeholder='Correo Electrónico' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} />

            <input 
            className="signup-input" 
            type="password" 
            placeholder='Contraseña' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>

            <button 
            className='signin-form-btn'
            onClick={handleLogin}>
              <Link to='/profile'>Entrar</Link>
            </button>

            {loginError && <span style={{color: 'red', fontFamily: 'var(--montserrat)', fontSize: '14px'}}>{loginError}</span>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogForm
