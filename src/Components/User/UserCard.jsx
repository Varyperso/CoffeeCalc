import styles from './usercard.module.css'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

//prettier-ignore
const UserCard = ({ user, toggle = false, chat }) => {
  const [isHovered, setIsHovered] = useState(false);

  let userProfileIcon, toggledUserProfileIcon;

  if (toggle) toggledUserProfileIcon = (
    <span style={{ color: "rgb(0, 170, 96)", marginInline: "auto" }}>
      {user.user.length > 10 ? user.user.substring(0, 10) + "..." : user.user}
      {user.admin ? "☻" : ""}
    </span>
  )
  else userProfileIcon = <img src={user.avatar} alt="" style={{ marginInline: "auto" }} />

  return (
    <div className={toggle ? styles.card : styles.card__toggled} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <NavLink to={`/users/${user.user}`}> 
        {userProfileIcon}
        {toggledUserProfileIcon} 
      </NavLink>
      {isHovered && !toggle && !chat && <div className={styles.hover__info}> {user.user} </div>}
      {isHovered && chat && <div className={styles.hover__info} onClick={() => chat(user._id)}>Chat with {user.user}</div>}
    </div>
  );
};

export default UserCard