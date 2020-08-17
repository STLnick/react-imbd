import dotenv from 'dotenv'

dotenv.config()

export default (
  baseUrl = `http://localhost:${process.env.REACT_APP_PORT}`
) => ({

  async index(query) {
    try {
      const res = await fetch(`${baseUrl}?query=${query}`)

      if (res.status > 400) {
        throw new Error(res.status)
      }

      return await res.json()
    } catch (error) {
      console.log(`Currently facing issue with ${error.message}`)
    }
  },
  // TODO: Convert functions below to send info to server and let server do the actual fetch
  async details(id) {
    try {
      const res = await fetch(`${baseUrl}/details?id=${id}`)
      // const res = await fetch(`${baseUrl}/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)

      return await res.json()
    } catch (error) {
      console.log(`Currently facing issue with ${error.message}`)
    }

  },

  async upcoming() {
    try {
      const res = await fetch(`${baseUrl}/upcoming`)

      return await res.json()
    } catch (error) {
      console.log(`Currently facing issue with ${error.message}`)
    }
  },

  async recommended(id) {
    try {
      const res = await fetch(`${baseUrl}/recommended?id=${id}`)

      return await res.json()
    } catch (error) {
      console.log(`Currently facing issue with ${error.message}`)
    }
  }
})
