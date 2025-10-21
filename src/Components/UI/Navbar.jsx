import { NavLink } from 'react-router-dom'
import styles from './navbar.module.css'
import Button from './Button'
import { useUserData } from '../../context'
import handleInactivity from '../../utils/handleInactivity'

// prettier-ignore
export default function Navbar() {
  const { loggedIn, handleLogout } = useUserData()

  handleInactivity() // token refresh

  if (!loggedIn) return
 
  return (
    <> 
      <nav className={styles.nav}>
        <NavLink to="/Home" className={styles.siteTitle}> CAFÉ-Calc </NavLink> 
        <img src="/iconMug.jpg" alt="a mug of coffee" width="60px" height="60px" style={{display:"inline", maxWidth:"60px", float:"left"}}/>
        <ul>
          <Button handler={handleLogout} className="logoutButton"> Logout </Button>
          <li className={styles.navli}>
            <NavLink to="/ProductList" className={({ isActive }) => (isActive ? styles.active : undefined)}> Product List </NavLink>
          </li>
          <li className={styles.navli}>
            <NavLink to="/MyCart" className={({ isActive }) => (isActive ? styles.active : undefined)}> My Cart </NavLink>
          </li>
          <li className={styles.navli}>
            <NavLink to="/CoffeeCalc" className={({ isActive }) => (isActive ? styles.active : undefined)}> Coffee-Calc </NavLink>
          </li>
          <li className={styles.navli}>
            <NavLink to="/CoffeeWorld" className={({ isActive }) => (isActive ? styles.active : undefined)}> Coffee World </NavLink>
          </li>
          <li className={styles.navli}>
            <NavLink to="/Chat" className={({ isActive }) => (isActive ? styles.active : undefined)}> Chat </NavLink>
          </li>
        </ul> 
      </nav>
    </>
  );
}