import { createContext, useState } from 'react'

export const UiContext = createContext()

export const UserProviderUi = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false) // leftmost sidebar
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  return <UiContext.Provider value={{ isExpanded, setIsExpanded, loading, setLoading, error, setError }}>{children}</UiContext.Provider>
}