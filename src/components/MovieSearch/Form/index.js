import React from 'react'
import PropTypes from 'prop-types'

import './Form.css'

export const Form = ({ handler }) => {

  return (
    <form onSubmit={handler} className="flex flex--column flex--align-center flex--justify-center">
      <input type="search" placeholder="Find Movies..." />
      <button type="submit">Search</button>
    </form>
  )
}

Form.propTypes = {
  handler: PropTypes.func
}
