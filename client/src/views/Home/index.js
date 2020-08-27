import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div>
      <h2>Home Page</h2>
      <Link to='/movies'>Search Movies</Link>
      <Link to='/tv'>Search TV Shows</Link>
    </div>
  )
}
