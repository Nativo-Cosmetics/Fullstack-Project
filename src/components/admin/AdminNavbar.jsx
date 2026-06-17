import { NavLink } from 'react-router-dom'
import styles from './AdminNavbar.module.css'

const AdminNavbar = () => {
  return (
    <nav className={styles.adminNavbar}>
      <NavLink
        to='/'
        end
        className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
      >
        Página Principal
      </NavLink>
      <NavLink
        to='/admin/productos'
        className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
      >
        Administración de Productos
      </NavLink>
      <NavLink
        to='/admin/reportes'
        className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
      >
        Administración de Reportes
      </NavLink>
    </nav>
  )
}

export default AdminNavbar
