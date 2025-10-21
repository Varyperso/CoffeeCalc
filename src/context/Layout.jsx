import { Outlet } from 'react-router-dom'
import { useUserData, useUiData } from './'

export default function Layout() {
  const { isExpanded } = useUiData()
  const { loggedIn } = useUserData()

  if (!loggedIn) return

  return (
    <div className={`content ${isExpanded ? 'expandedContent' : 'collapsedContent'}`}>
      <Outlet />
    </div>
  )
}