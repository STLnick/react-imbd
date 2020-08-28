import React from 'react'
import api from 'api'

import { MovieSearch } from '../../components'

export const TV = () => {
  const repo = api.tv()
  return <MovieSearch repo={repo} />
}
