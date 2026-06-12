import React from 'react'
import { useState } from "react";
import User from '../components/navigation/userNav.jsx'
import UserNav from '../components/navigation/userNav.jsx'
import '../pages/profile.css'


const Profile = () => {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState("inicio");
  return (
    <>
    <UserNav/>
    <div className='profile-page'>      
      <div className="container-profile">
        <aside className="sidebar-profile">
          <h2>Mi perfil</h2>
          <button onClick={() => setOpcionSeleccionada("datos")}>
            Mis datos
          </button>

          <button onClick={() => setOpcionSeleccionada("pedidos")}>
            Mis pedidos
          </button>

          <button onClick={() => setOpcionSeleccionada("reseñas")}>
            Mis reseñas
          </button>
        </aside>

        <section className="contenido-profile">
          {opcionSeleccionada === "datos" && (
            <div>
              <h2>Mis Datos Personales</h2>
              <p>Bienvenido a la página.</p>
            </div>
          )}

          {opcionSeleccionada === "pedidos" && (
            <div>
              <h2>Mis Productos</h2>
              <p>Aquí van los productos.</p>
            </div>
          )}

          {opcionSeleccionada === "reseñas" && (
            <div>
              <h2>Mis Reseñas</h2>
              <p>Aquí va la información de contacto.</p>
            </div>
          )}
        </section>
      </div>
    </div>
    </>
  )
}

export default Profile
