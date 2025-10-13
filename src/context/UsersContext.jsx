import { createContext, useContext, useState } from 'react'

const UsersContext = createContext()
export const useUsersData = () => useContext(UsersContext)

export const UserProviderUsers = ({ children }) => {
  const [users, setUsers] = useState([])

  return <UsersContext.Provider value={{ users, setUsers }}>{children}</UsersContext.Provider>
}