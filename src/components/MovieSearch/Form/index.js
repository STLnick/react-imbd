import React from 'react'
import PropTypes from 'prop-types'

import './Form.css'

export const Form = ({ handlers }) => {

  return (
    <form onSubmit={handlers.submit} className="flex flex--column flex--align-center flex--justify-center">
      <div className="flex">
        <input type="search" placeholder="Find Movies..." />
        <button type="submit">Search</button>
      </div>

      <div className="flex flex--justify-center flex--align-center">
        <input disabled type="number" placeholder="Min Year" />
        <input disabled type="number" placeholder="Max Year" />
      </div>
      <div className="flex flex--justify-center flex--align-center">
        <label htmlFor="year-filter">Filter Movies by Release Year</label>
        <input id="year-filter" onChange={handlers.checked} type="checkbox" />
      </div>
      <button type="button" onClick={handlers.upcoming}>See Upcoming Movies</button>
    </form>
  )
}

Form.propTypes = {
  handlers: PropTypes.object
}
