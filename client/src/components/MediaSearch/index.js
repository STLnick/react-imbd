import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Cards } from './Cards'
import { Form } from './Form'

import './MediaSearch.css'

export const MediaSearch = ({ repo }) => {
  const [media, setMedia] = useState([])

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
      const searchResponse = await repo.details(e.target.dataset.id)

      setMedia([searchResponse])

      hideError()
    } catch {
      showError()
    }
  }

  const handleRecommendedClick = async (e) => {
    try {
      const mediaID = e.target.dataset.id
      const searchResponse = await repo.recommended(mediaID)

      setMedia(searchResponse.results)

      hideError()
    } catch {
      showError()
    }
  }

  const handleUpcomingClick = async () => {
    try {
      const searchResponse = await repo.upcoming()

      setMedia(searchResponse.results)

      hideError()
    } catch (error) {
      showError(error)
    }
  }

  const handleCheckboxChange = (e) => {
    const numberInputs = Array.from(document.querySelectorAll('input[type="number"]'))

    numberInputs.forEach(input => e.target.checked ? input.disabled = false : input.disabled = true)
  }

  const filterMedia = (checked, mediaResponse) => {
    // IF there is input convert to number and return it
    // ELSE set a very small year for minYear or very large year for maxYear
    const minYear = document.querySelector('#min-year').value ? Number(document.querySelector('#min-year').value) : 0
    const maxYear = document.querySelector('#max-year').value ? Number(document.querySelector('#max-year').value) : 3000

    if (checked) {
      return mediaResponse
        .filter(media => media.release_date ?
          Number(media.release_date.slice(0, 4)) < maxYear :
          Number(new Date().toDateString().slice(0, 4)) < maxYear)
        .filter(media => media.release_date ?
          Number(media.release_date.slice(0, 4)) > minYear :
          Number(new Date().toDateString().slice(0, 4)) > minYear)
    }

    return mediaResponse
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
        const searchResponse = await repo.index(searchText)

        const searchedMedia = searchResponse.results

        const filteredMedia = filterMedia(checkboxInput.checked, searchedMedia)

        // Set movies with API response
        setMedia(filteredMedia)

        hideError()
      } catch (error) {
        showError()
      }
      // Reset search input
      searchInput.value = ''
    } else {
      // Reset search input
      searchInput.placeholder = 'Enter a Title!'
    }
  }

  return (
    <main>
      <Form handlers={{ submit: handleSubmit, checked: handleCheckboxChange, upcoming: handleUpcomingClick }} />
      <div className="error"></div>
      <Cards
        buttonHandlers={{ recommended: handleRecommendedClick, details: handleDetailsClick }}
        media={media}
      />
    </main>
  )
}

MediaSearch.propTypes = {
  repo: PropTypes.object
}
