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
      console.log('DETAILS CLICK')
      console.log(e.target.dataset.id)

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

        hideError()
      } catch (error) {
        showError()
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
      <div className="error"></div>
      <Cards
        buttonHandlers={{ recommended: handleRecommendedMoviesClick, details: handleDetailsClick }}
        movies={movies}
      />
      <div className="spacer"></div>
    </main>
  )
}
