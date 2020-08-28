import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import tvIcon from '../../img/tv.svg'
import filmIcon from '../../img/film.svg'
import logo from '../../img/filmRecorder.svg'

export const Header = () => {
  const location = useLocation()

  return (
    <nav className="top-nav flex flex--align-center flex--justify-between">
      <div className="nav-left flex flex--justify-center">
        <img className="logo" src={logo} alt="Film recorder icon" />
        <h3 class="title">IMDB Movie / TV Search</h3>
      </div>
      <div className="nav-right">
        {location.pathname === '/movies'
          ? <Link className="flex flex--align-center button primary-bg" to='/tv'>
            <img className="button-svg filter-white" src={tvIcon} alt="TV icon" />
            Search TV Shows
          </Link>
          : <Link className="button primary-bg" to='/movies'>
            <img className="button-svg filter-white" src={filmIcon} alt="Film icon" />
            Search Movies
          </Link>}
      </div>
    </nav>
  )
}
