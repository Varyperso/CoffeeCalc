import { NavLink } from 'react-router-dom'
import styles from './navbar.module.css'
import Button from './Button'
import { useUserData } from '../../context'
import { useEffect, useRef } from 'react'
import { myFetch } from '../../utils/myFetch'

// prettier-ignore
export default function Navbar() {

  const { handleLogout } = useUserData()

  handleInactivity()
 
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

const handleInactivity = () => {
  const timeoutRef = useRef(null)
  const timeoutDuration = 120 * 60 * 1000 // 2 hours per session
  const { handleLogout } = useUserData()

  const refreshToken = async () => {
    try {
      await myFetch({ url: `https://localhost:5000/refresh-token`, method: 'POST' })
    } catch (error) {
      console.error('Error refreshing token:', error)
    }
  }

  const handleUserActivity = () => {
    const currentTime = Date.now()
    clearTimeout(timeoutRef.current)

    refreshToken()
    localStorage.setItem('lastActivityTime', currentTime.toString())
    startInactivityTimer()
  }

  const startInactivityTimer = () => {
    timeoutRef.current = setTimeout(() => {
      console.log('Token expired due to inactivity')
      handleLogout()
    }, timeoutDuration)
  }

  useEffect(() => {
    const lastActivityTime = localStorage.getItem('lastActivityTime')
    const currentTime = Date.now()
    if (lastActivityTime) {
      const timeSinceLastActivity = currentTime - parseInt(lastActivityTime, 10)
      if (timeSinceLastActivity > timeoutDuration) handleLogout()
    }

    document.addEventListener('click', handleUserActivity)

    return () => {
      document.removeEventListener('click', handleUserActivity)
      clearTimeout(timeoutRef.current)
    }
  }, [])

  return null
}
