import { createContext, useState } from 'react'

export const UsersContext = createContext()

export const UserProviderUsers = ({ children }) => {
  const [users, setUsers] = useState([])

  return <UsersContext.Provider value={{ users, setUsers }}>{children}</UsersContext.Provider>
}