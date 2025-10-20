import { Outlet } from 'react-router-dom'
import { useUiData } from './UIContext'

export default function Layout() {
  const { isExpanded } = useUiData()
  return (
    <div className={`content ${isExpanded ? 'expandedContent' : 'collapsedContent'}`}>
      <Outlet />
    </div>
  )
}