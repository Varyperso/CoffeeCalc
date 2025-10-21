import { createContext, useEffect, useState } from 'react'
import { loadFromLocalStorage, myFetch } from '../utils/myFetch'
import { useNavigate } from 'react-router-dom'
import { useUiData } from './'

export const UserContext = createContext()

//prettier-ignore
export const UserProviderUser = ({ children }) => {
  const [user, setUser] = useState({});
  const { setError } = useUiData()

  const navigate = useNavigate()

  const [loggedIn, setLoggedIn] = useState(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    return storedLoginStatus === "true";
  });

  const handleLogout = logout => {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('lastActivityTime');
    setLoggedIn(false)
    setUser({})
    logout ? setError("logout") : setError("expired")
    navigate('/404')
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
 
  return <UserContext.Provider value={{ loggedIn, setLoggedIn, user, setUser, handleLogout }}> {children} </UserContext.Provider>
}