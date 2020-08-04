import React from 'react'
import PropTypes from 'prop-types'

import './Cards.css'

export const Cards = ({ buttonHandlers, movies }) => {

  const renderCards = () => {
    return movies.map(movie => {

      return (
        <div key={movie.id} className="card flex flex--column flex--align-center flex--justify-evenly">
          <h2>{movie.title} aaaa  </h2>
          {movie.tagline ? <p>{movie.tagline}</p> : ''}
          <p><strong>Released:</strong> {movie.release_date ? movie.release_date : 'TBD'}</p>
          <p>{movie.overview}</p>
          <img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`} alt="Movie poster" />
          <button data-id={movie.id} onClick={buttonHandlers.details} type="button">Get Movie Details</button>
          <button data-id={movie.id} onClick={buttonHandlers.recommended} type="button">See Recommended Movies</button>
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
  buttonHandlers: PropTypes.object,
  movies: PropTypes.array
}
