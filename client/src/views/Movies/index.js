import React from 'react'
import api from 'api'

import { MovieSearch } from '../../components'

export const Movies = () => {
  const repo = api.movies()
  return <MovieSearch repo={repo} />
}
