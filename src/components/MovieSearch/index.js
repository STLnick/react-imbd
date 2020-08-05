import React, { useEffect, useState } from 'react'

import api from 'api'

import { Cards } from './Cards'
import { Form } from './Form'

export const MovieSearch = () => {
  const [movies, setMovies] = useState([])

  const handleDetailsClick = async (e) => {
    console.log('DETAILS CLICK')
    console.log(e.target.dataset.id)

    const searchResponse = await api.details(e.target.dataset.id)

    setMovies([searchResponse])
  }

  const handleRecommendedMoviesClick = async (e) => {
    const movieID = e.target.dataset.id
    const searchResponse = await api.recommended(movieID)

    setMovies(searchResponse.results)
  }

  const handleUpcomingMoviesClick = async () => {
    const searchResponse = await api.upcoming()

    setMovies(searchResponse.results)
  }

  const handleCheckboxChange = (e) => {
    const numberInput = document.querySelector('input[type="number"]')
    e.target.checked ? numberInput.disabled = false : numberInput.disabled = true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Grab input fields
    const searchInput = e.target.querySelector('input[type="search"]')
    const numberInput = e.target.querySelector('input[type="number"]')
    const checkboxInput = e.target.querySelector('input[type="checkbox"]')

    // Get value from search input field
    const searchText = searchInput.value

    if (searchText) {
      try {
        // Call API with input value
        const searchResponse = await api.index(searchText)

        const searchedMovies = searchResponse.results

        let filteredMovies

        // Filter movies appropriately
        if (checkboxInput.checked) {
          filteredMovies = searchedMovies
            .filter(movie => movie.release_date ? Number(movie.release_date.slice(0, 4)) < numberInput.value : Number(new Date().toDateString().slice(0, 4)) < numberInput.value)
        } else {
          filteredMovies = searchedMovies
        }

        // Set movies with API response
        setMovies(filteredMovies)

      } catch (error) {
        console.log(error)
      }
      // Reset search input
      searchInput.value = ''
    } else {
      // Reset search input
      searchInput.value = 'Need to enter a movie!'
    }
  }

  return (
    <main>
      <Form handlers={{ submit: handleSubmit, checked: handleCheckboxChange, upcoming: handleUpcomingMoviesClick }} />
      <Cards
        buttonHandlers={{ recommended: handleRecommendedMoviesClick, details: handleDetailsClick }}
        movies={movies}
      />
      <div className="spacer"></div>
    </main>
  )
}
