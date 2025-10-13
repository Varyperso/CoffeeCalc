import { useUserData } from '../context/UserContext'
import UpdateUser from '../Components/User/UpdateUser'

export default function Home() {
  const { user, setUser } = useUserData()

  const lastLoginDate = new Date(user.lastLogin)
  lastLoginDate.setHours(lastLoginDate.getHours() + 2)

  // prettier-ignore
  return (
    <>
      <h1>Home Page</h1>
      <p>Hello <span style={{ color: 'var(--my-lightgreen2)' }}> {user.user} </span>! ☻ </p>
      <img src={user.image} style={{ width: '128px', marginInline: 'auto' }} alt="my photo" />
      <img src={user.avatar} style={{ width: '128px', marginInline: 'auto' }} alt="my avatar" />
      <p>Last Login: {lastLoginDate.toUTCString()}</p> <br/>
      <UpdateUser user={user} setUser={setUser} />
    </>
  )
}