import React from 'react'
import { Outlet } from 'react-router'
import SideBar from './sidebar'

const MainLayout:React.FC = () => {
  return (
    <div>
        <SideBar />

        <Outlet />
    </div>
  )
}

export default MainLayout