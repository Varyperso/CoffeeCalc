import { Outlet } from 'react-router-dom'
import { useUiData } from './'
import Navbar from '../Components/UI/Navbar'
import Sidebar from '../Components/UI/Sidebar'

export default function Layout() {
  const { isExpanded } = useUiData()

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className={`content ${isExpanded ? 'expandedContent' : 'collapsedContent'}`}>
        <Outlet />
      </div>
    </>
  )
}