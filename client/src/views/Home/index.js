import React from 'react'
import { Link } from 'react-router-dom'

import tvIcon from '../../img/tv.svg'
import filmIcon from '../../img/film.svg'

export const Home = () => {
  return (
    <div>
      <h2>Home Page</h2>
      <Link to='/movies'>
        <img className="button-svg" src={filmIcon} alt="Film icon" />
        Search Movies
      </Link>
      <Link to='/tv'>
        <img className="button-svg" src={tvIcon} alt="TV icon" />
        Search TV Shows
      </Link>
    </div>
  )
}
