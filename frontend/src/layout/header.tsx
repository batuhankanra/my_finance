import React from 'react'
import { NavLink } from 'react-router'

interface NavItems{
  label:string
  path:string
}

const navItems:NavItems[]=[
  {
    label:"Dashboard",
    path:"/"
  },
  {
    label:"Incomes",
    path:"/incomes"
  },
  {
    label:"Expense",
    path:"/expense"
  },
  {
    label:"Investment",
    path:"/investment"
  }
]

const Header:React.FC = () => {
  return (
     <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="text-xl font-bold text-gray-800">
          Finans<span className="text-blue-600">App</span>
        </span>

        <nav>
          <ul className="flex items-center gap-2 sm:gap-6">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header