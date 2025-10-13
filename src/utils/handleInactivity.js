import { useRef } from "react"
import { useUserData } from "../context"
import { useEffect } from "react"

export default function handleInactivity() {
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