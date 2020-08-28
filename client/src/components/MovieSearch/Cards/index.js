import React from 'react'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import styles from './Cards.module.css'

export const Cards = ({ buttonHandlers, movies }) => {
  const location = useLocation()

  const getFormattedNumber = (budget) => {
    let formattedBudget = '$'

    const chunksOfThree = Math.floor(budget.length / 3)

    if (budget.length % 3 === 0) {
      let j = 0
      for (let i = 0; i < chunksOfThree; i++) {
        formattedBudget += budget.slice(j, j + 3) + (i === chunksOfThree - 1 ? '' : ',')
        j += 3
      }
    } else if (budget.length % 3 === 1) {
      let j = 1
      formattedBudget += budget.slice(0, j) + ','
      for (let i = 0; i < chunksOfThree; i++) {
        formattedBudget += budget.slice(j, j + 3) + (i === chunksOfThree - 1 ? '' : ',')
        j += 3
      }
    } else {
      let j = 2
      formattedBudget += budget.slice(0, j) + ','
      for (let i = 0; i < chunksOfThree; i++) {
        formattedBudget += budget.slice(j, j + 3) + (i === chunksOfThree - 1 ? '' : ',')
        j += 3
      }
    }

    return formattedBudget
  }

  const renderCards = () => {
    if (movies) {
      return movies.map(movie => {
        // movie.budget is present when on details page - using this as a check
        const isDetailsDisplay = movie.budget !== undefined ? true : false
        let budget, detailsButton, rating, release, revenue, tagline

        if (isDetailsDisplay) {
          detailsButton = ''

          budget = <p><strong>Budget:</strong> {getFormattedNumber(movie.budget.toString())}</p>
          rating = <p><strong>IMDB Average Rating:</strong> {movie.vote_average} </p>
          revenue = <p><strong>Revenue:</strong> {getFormattedNumber(movie.revenue.toString())}</p>
          tagline = <blockquote className={styles.blockquote}>{movie.tagline}</blockquote>
        } else {
          detailsButton = <button
            button data-id={movie.id}
            onClick={buttonHandlers.details}
            type="button"
          >
            Get {location.pathname === '/movies' ? 'Movie' : 'Show'} Details
          </button>

          budget = ''
          rating = ''
          revenue = ''
          tagline = ''
        }

        if (movie.release_date) {
          release = <p><strong>Released:</strong> {movie.release_date}</p>
        } else if (movie.first_air_date) {
          release = <p><strong>First Aired:</strong> {movie.first_air_date}</p>
        } else {
          release = <p><strong>Released Date:</strong> TBD</p>
        }


        return (
          <div key={movie.id} className={`${styles.card} flex flex--column flex--align-center flex--justify-evenly`}>
            <h2 className={styles.title}>{movie.title}</h2>

            {tagline}

            {release}

            {budget}

            {revenue}

            <p>{movie.overview}</p>

            <img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`} alt="Movie poster" />

            {rating}

            {detailsButton}

            <button
              data-id={movie.id}
              onClick={buttonHandlers.recommended}
              type="button"
            >
              See Recommended {location.pathname === '/movies' ? 'Movies' : 'TV Shows'}
            </button>
          </div>
        )
      })
    } else {
      return <p>No results returned!</p>
    }
  }

  return (
    <div className={`${styles.cardsContainer} flex flex--wrap flex--justify-evenly`}>
      {renderCards()}
    </div>
  )
}

Cards.propTypes = {
  buttonHandlers: PropTypes.object,
  movies: PropTypes.array
}
