import React from 'react'

import './pages.css'

import LogForm from '../components/auth/loginform.jsx'
import UserNav from '../components/navigation/userNav.jsx'

const Register = () => {
  return (
    <div className='register-container'>
      <UserNav />
      <LogForm />
    </div>
  )
}

export default Register
