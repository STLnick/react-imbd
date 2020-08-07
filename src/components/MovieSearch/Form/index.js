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
      <input disabled type="number" placeholder="Release Year" />
      <div className="flex flex--justify-center flex--align-center">
        <label htmlFor="year-filter">Show Movies up to entered year only</label>
        <input id="year-filter" onChange={handlers.checked} type="checkbox" />
      </div>
      <button type="button" onClick={handlers.upcoming}>See Upcoming Movies</button>
    </form>
  )
}

Form.propTypes = {
  handlers: PropTypes.object
}
