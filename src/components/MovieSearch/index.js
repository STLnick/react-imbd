import React, { useEffect, useState } from 'react'

import api from 'api'

import { Cards } from './Cards'
import { Form } from './Form'

export const MovieSearch = () => {
  const [movies, setMovies] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Grab input fields
    const searchInput = e.target.querySelector('input[type="search"]')
    const numberInput = e.target.querySelector('input[type="number"]')
    const checkboxInput = e.target.querySelector('input[type="checkbox"]')
    // Get value from input field
    const searchText = searchInput.value

    if (searchText) {
      // Call API with input value
      const searchResponse = await api.index(searchText)
      const searchedMovies = searchResponse.results

      let filteredMovies

      // Filter movies appropriately
      if (checkboxInput.checked) {
        filteredMovies = searchedMovies
          .filter(movie => movie.release_date ? Number(movie.release_date.slice(0, 4)) < numberInput.value : Number(new Date().toDateString.slice(0, 4)) < numberInput.value)
      } else {
        filteredMovies = searchedMovies
      }

      // Set movies with API response
      setMovies(filteredMovies)

      // Reset search input
      searchInput.value = ''
    } else {
      // Reset search input
      searchInput.value = 'Need to enter a movie!'
    }
  }

  return (
    <main>
      <Form handler={handleSubmit} />
      <Cards movies={movies} />
      <div className="spacer"></div>
    </main>
  )
}
