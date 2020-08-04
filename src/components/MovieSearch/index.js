import React, { useEffect, useState } from 'react'

import api from 'api'

import { Cards } from './Cards'
import { Form } from './Form'

export const MovieSearch = () => {
  const [movies, setMovies] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Grab input field
    const input = e.target.querySelector('input')
    // Get value from input field
    const searchText = input.value
    // Call API with input value
    const searchedMovies = await api.index(searchText)
    // Set movies with API response
    setMovies(searchedMovies.results)
    // Reset search input
    input.value = ''
  }

  return (
    <main>
      <Form handler={handleSubmit} />
      <Cards movies={movies} />
      <div className="spacer"></div>
    </main>
  )
}
