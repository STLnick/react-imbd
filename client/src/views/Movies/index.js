import React from 'react'
import api from 'api'

import { MediaSearch } from '../../components'

export const Movies = () => {
  const repo = api.movies()
  return <MediaSearch repo={repo} />
}
