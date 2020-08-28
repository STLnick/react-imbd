import React from 'react'
import api from 'api'

import { MediaSearch } from '../../components'

export const TV = () => {
  const repo = api.tv()
  return <MediaSearch repo={repo} />
}
