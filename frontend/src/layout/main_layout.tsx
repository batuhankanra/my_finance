import React from 'react'
import { Outlet } from 'react-router'
import Header from './header'

const MainLayout:React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout