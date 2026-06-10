import React, { use, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './auth.css'

const LogForm = () => {

  // toggle visibility of forms
  const [toggleForm, setToggleForm] = useState(false)

  const handleToggle = (e) => {
    e.preventDefault()
    setToggleForm(prev => !prev)
  }
  
  /***
    Login user 
   */
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  // search user in db 
  const checkUser = async (e) => {
    e.preventDefault()

    let validatedUser = {
      email: email,
      password: password
    }

    try {
      const response = await fetch('http://localhost:8080/api/getUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(validatedUser)
      })

      const data = await response.json()
      console.log(data)
      if (data.status === 'success' && data.user.email) {
        localStorage.setItem('name', data.user)
      
        console.log('Usuario encontrado:', data)
        navigate('/profile')
      } else {
        alert(data.message || 'Error al iniciar sesión')
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
    }
  }


  /***
    Register user 
  */
  const [newName, setNewName] = useState('')
  const [newLastName, setNewLastName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const registerUser = (e) => {
    e.preventDefault()

    /* 
    @params
    name = str
    lastname = str
    email = str
    password = str
    */
   
    let newUser = {
      name: newName,
      lastName: newLastName,
      email: newEmail,
      password: newPassword
    }

    console.log(newUser)

    setTimeout(async () => {
      try {
        const response = await fetch('http://localhost:8080/api/create', {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json' 
          },
          body: JSON.stringify(newUser)
        })


        const data = await response.json()
        if (data.status === 'success' && data.user){
          console.log('Usuario creado exitosamente.')

          // separated login between user, worker or admin/owner
          if(data.user.email.endsWidth('@nativocosmetics.com')) {
            navigate('/dashboard')
          } else if(data.user.email.endsWidth('@admin.nativocosmetics.com')) {
            navigate('/admin/dashboard')
          }
          else if(data.user.email.endsWidth('@gmail.com' || '@hotmail.com' || '@outlook.com')) {
            navigate('/profile')
          } else{
            alert('El correo utilizado no está permitido en la plataforma, por favor vuelve a intentar.')
          }
        }
      } catch(error) {
        console.log('Error en la petición: ' + error)
      }
    }, 1000)
  }

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
          <form className="signIn" onSubmit={registerUser}>
            <input className="signin-input" type="text" placeholder='Nombre' value={newName} onChange={e => setNewName(e.target.value)}/>
            <input className="signin-input" type="text" placeholder='Apellido' value={newLastName} onChange={e => setNewLastName(e.target.value)}/>
            <input className="signin-input" type="email" placeholder='Correo Electrónico' value={newEmail} onChange={e => setNewEmail(e.target.value)}/>
            <input className="signin-input" type="password" placeholder='Contraseña' value={newPassword} onChange={e => setNewPassword(e.target.value)}/>
            <button className='signin-form-btn' type='submit'>Registrarse</button>
          </form>
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
          style={{ display: toggleForm ? 'flex' : 'none' }}
          onSubmit={checkUser}
          >
          <h2 className="form-title">Bienvenid@</h2>
          <form className="signUp">
            <input 
            className="signup-input" 
            type="text"
            id='email' 
            placeholder='Correo Electrónico' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} />

            <input 
            className="signup-input" 
            type="password" 
            id="pass"
            placeholder='Contraseña' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>

            <button 
            className='signin-form-btn'
            type='submit'>
              Entrar
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default LogForm
