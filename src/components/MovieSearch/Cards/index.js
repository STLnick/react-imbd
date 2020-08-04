import React from 'react'
import PropTypes from 'prop-types'

import './Cards.css'

export const Cards = ({ movies }) => {

  const renderCards = () => {
    return movies.map(movie => {
      return (
        <div key={movie.id} className="card flex flex--column flex--align-center flex--justify-evenly">
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`} alt="Movie poster" />
        </div>
      )
    })
  }

  return (
    <div className="cards-container flex flex--wrap flex--justify-evenly">
      {renderCards()}
    </div>
  )
}

Cards.propTypes = {
  movies: PropTypes.array
}
