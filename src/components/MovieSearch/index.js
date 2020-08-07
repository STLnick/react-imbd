import React, { useState } from 'react'

import api from 'api'

import { Cards } from './Cards'
import { Form } from './Form'

import './MovieSearch.css'

export const MovieSearch = () => {
  const [movies, setMovies] = useState([])

  const hideError = () => {
    document.querySelector('.error').innerHTML = ''
    document.querySelector('.error').classList.remove('active-error')
  }

  const showError = (err) => {
    document.querySelector('.error').innerHTML = `<h3>${err}</h3>`
    document.querySelector('.error').classList.add('active-error')
  }

  const handleDetailsClick = async (e) => {
    try {
      const searchResponse = await api.details(e.target.dataset.id)

      setMovies([searchResponse])

      hideError()
    } catch {
      showError()
    }
  }

  const handleRecommendedMoviesClick = async (e) => {
    try {
      const movieID = e.target.dataset.id
      const searchResponse = await api.recommended(movieID)

      setMovies(searchResponse.results)

      hideError()
    } catch {
      showError()
    }
  }

  const handleUpcomingMoviesClick = async () => {
    try {
      const searchResponse = await api.upcoming()

      setMovies(searchResponse.results)

      hideError()
    } catch (error) {
      showError(error)
    }
  }

  const handleCheckboxChange = (e) => {
    const numberInputs = Array.from(document.querySelectorAll('input[type="number"]'))

    numberInputs.forEach(input => e.target.checked ? input.disabled = false : input.disabled = true)
  }

  const filterMovies = (checked, moviesResponse) => {
    // IF there is input convert to number and return it
    // ELSE set a very small year for minYear or very large year for maxYear
    const minYear = document.querySelector('#min-year').value ? Number(document.querySelector('#min-year').value) : 0
    const maxYear = document.querySelector('#max-year').value ? Number(document.querySelector('#max-year').value) : 3000

    if (checked) {
      return moviesResponse
        .filter(movie => movie.release_date ?
          Number(movie.release_date.slice(0, 4)) < maxYear :
          Number(new Date().toDateString().slice(0, 4)) < maxYear)
        .filter(movie => movie.release_date ?
          Number(movie.release_date.slice(0, 4)) > minYear :
          Number(new Date().toDateString().slice(0, 4)) > minYear)
    }

    return moviesResponse
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Grab input fields
    const searchInput = e.target.querySelector('input[type="search"]')
    const checkboxInput = e.target.querySelector('input[type="checkbox"]')

    // Get value from search input field
    const searchText = searchInput.value

    if (searchText) {
      try {
        // Call API with input value
        const searchResponse = await api.index(searchText)

        const searchedMovies = searchResponse.results

        const filteredMovies = filterMovies(checkboxInput.checked, searchedMovies)

        // Set movies with API response
        setMovies(filteredMovies)

        hideError()
      } catch (error) {
        showError()
      }
      // Reset search input
      searchInput.value = ''
    } else {
      // Reset search input
      searchInput.placeholder = 'Enter a movie!'
    }
  }

  return (
    <main>
      <Form handlers={{ submit: handleSubmit, checked: handleCheckboxChange, upcoming: handleUpcomingMoviesClick }} />
      <div className="error"></div>
      <Cards
        buttonHandlers={{ recommended: handleRecommendedMoviesClick, details: handleDetailsClick }}
        movies={movies}
      />
    </main>
  )
}
