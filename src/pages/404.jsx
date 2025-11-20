import { NavLink, useNavigate } from 'react-router-dom'
import { useUiData, useUserData } from '../context'

const Error404 = () => {
  const { error } = useUiData()

  const navigate = useNavigate()

  console.log(error);
  
  if (error === 'expired') {
    setTimeout(() => navigate('/'), 2000)
    return <div style={{ color: 'brown', fontSize: '2rem' }}> Session expired, redirecting to login page... </div>
  }
  if (error === 'logout') {
    return <div style={{ color: 'brown', fontSize: '2rem' }}> Logging out, redirecting to login page... </div>
  }

  return (
    <>
      <div style={{ color: 'brown', fontSize: '2rem' }}> Error404 Not Found </div>
      <NavLink to={`/`} style={{ textDecoration: 'underline' }}>
        Back To Home/Login
      </NavLink>
    </>
  )
}

export default Error404