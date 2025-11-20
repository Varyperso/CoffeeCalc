import { NavLink } from 'react-router-dom'
import styles from './sidebar.module.css'
import Svgs from '../../svg/Svgs'
import { useUiData  } from '../../context'

const Sidebar = () => {
  const { isExpanded, setIsExpanded } = useUiData()
  
  return (
    <nav className={`${styles.sidebar} ${isExpanded ? styles.expanded : styles.collapsed}`}>
      <ul>
        <li>
          <NavLink to="/Chat" className={({ isActive }) => (isActive ? styles.active : undefined)}>
            <span className={`${styles.aspan} ${isExpanded ? styles.visible : styles.hidden}`}> Chat </span>
            <Svgs name="chat-icon" className={`${styles.svg} ${isExpanded ? styles.hidden : styles.visible}`} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/Home" className={({ isActive }) => (isActive ? styles.active : undefined)}>
            <span className={`${styles.aspan} ${isExpanded ? styles.visible : styles.hidden}`}> User Settings </span>
            <Svgs name="settings-icon" className={`${styles.svg} ${isExpanded ? styles.hidden : styles.visible}`} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/MyCart" className={({ isActive }) => (isActive ? styles.active : undefined)}>
            <span className={`${styles.aspan} ${isExpanded ? styles.visible : styles.hidden}`}> My Cart </span>
            <Svgs name="myCart-icon" className={`${styles.svg} ${isExpanded ? styles.hidden : styles.visible}`} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/CoffeeWorld" className={({ isActive }) => (isActive ? styles.active : undefined)}>
            <span className={`${styles.aspan} ${isExpanded ? styles.visible : styles.hidden}`}> Coffee World </span>
            <Svgs name="world-icon" className={`${styles.svg} ${isExpanded ? styles.hidden : styles.visible}`} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/CoffeeCalc" className={({ isActive }) => (isActive ? styles.active : undefined)}>
            <span className={`${styles.aspan} ${isExpanded ? styles.visible : styles.hidden}`}> Coffee Calc </span>
            <Svgs name="coffee-icon" className={`${styles.svg} ${isExpanded ? styles.hidden : styles.visible}`} />
          </NavLink>
        </li>
        <li>
          <p onClick={() => setIsExpanded(prev => !prev)}>
            {isExpanded ? <Svgs name="leftSidebar-icon" /> : <Svgs name="rightSidebar-icon" />}
          </p>
        </li>
      </ul>
    </nav>
  )
}

export default Sidebar
