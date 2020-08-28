import React from 'react'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import './Form.css'

export const Form = ({ handlers }) => {
  const location = useLocation()

  return (
    <form onSubmit={handlers.submit} className="flex flex--column flex--align-center flex--justify-center">
      <h3 className="title">
        {location.pathname === '/movies' ? 'Movies' : 'TV Shows'}
      </h3>
      <div className="form-group flex">
        <input type="search" placeholder={location.pathname === '/movies' ? 'Find Movies...' : 'Find TV Shows...'} />
        <button type="submit">Search</button>
      </div>

      <div className="form-group flex flex--justify-center flex--align-center">
        <label htmlFor="min-year" className="screen-reader-text">Minimum Release Year</label>
        <input disabled type="number" id="min-year" placeholder="Min Year" />
        <label htmlFor="max-year" className="screen-reader-text">Maximum Release Year</label>
        <input disabled type="number" id="max-year" placeholder="Max Year" />
      </div>
      <div className="flex flex--justify-center flex--align-center">
        <label className="checkmark-container" htmlFor="year-filter">Filter {location.pathname === '/movies' ? 'Movies' : 'TV Shows'} by Year
          <input id="year-filter" onChange={handlers.checked} type="checkbox" />
          <span className="checkmark"></span>
        </label>
      </div>
      <button type="button" onClick={handlers.upcoming}>
        See Upcoming {location.pathname === '/movies' ? 'Movies' : 'TV Shows'}
      </button>
    </form>
  )
}

Form.propTypes = {
  handlers: PropTypes.object
}
