import { createContext, useContext, useEffect, useState } from 'react'
import { loadFromLocalStorage, myFetch } from '../utils/myFetch'
import { useNavigate } from 'react-router-dom'
import { useUiData } from './UIContext'

const UserContext = createContext()
export const useUserData = () => useContext(UserContext)

//prettier-ignore
export const UserProviderUser = ({ children, setLoggedIn }) => {
  const [user, setUser] = useState({});

  const navigate = useNavigate()

  const { setError } = useUiData()

  const handleLogout = logout => {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('lastActivityTime');
    setLoggedIn(false)
    setUser({})
    logout ? setError("logout") : setError("expired")
    setTimeout(() => {
      setError('')
      navigate('/')
    }, logout? 1500 : 2500)
  }
 
  const validateUserOnRefresh = async () => {
    const parsedUser = loadFromLocalStorage('user', {});
    if (parsedUser._id) {
      const userData = await myFetch({ url: `https://localhost:5000/user/${parsedUser._id}` })
      setUser(userData);
    } 
  };

  useEffect(() => {
    validateUserOnRefresh()
  }, [])
 
  return <UserContext.Provider value={{ user, setUser, handleLogout }}> {children} </UserContext.Provider>
}