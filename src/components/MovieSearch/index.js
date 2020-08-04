import React, { useEffect, useState } from 'react'

import api from 'api'

import { Cards } from './Cards'
import { Form } from './Form'

export const MovieSearch = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    (async () => {
      const fetchedMovies = await api.index()
      setMovies(fetchedMovies)
    })()
  }, [])

  return (
    <main>
      <Form />
      <Cards />
    </main>
  )
}
