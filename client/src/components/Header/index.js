import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export const Header = () => {
  const location = useLocation()

  return (
    <nav>
      <div className="nav-left">
        {/* Logo */}
        <div className="nav-menu">
          Some stuff here in future...
        </div>
      </div>
      <div className="nav-right">
        {location.pathname === '/movies'
          ? <Link to='/tv'>Search TV Shows</Link>
          : <Link to='/movies'>Search Movies</Link>}
      </div>
    </nav>
  )
}
