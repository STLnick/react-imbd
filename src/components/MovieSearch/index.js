import React, { useEffect, useState } from 'react'

import { Cards } from './Cards'
import { Form } from './Form'

export const MovieSearch = () => {
  return (
    <main>
      <Form />
      <Cards />
    </main>
  )
}
