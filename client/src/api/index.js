import dotenv from 'dotenv'

dotenv.config()

const BASE_URL = 'https://api.themoviedb.org/3'

export default {

  async index(query) {
    try {
      const res = await fetch(`${BASE_URL}/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${query}&page=1&include_adult=false`)

      if (res.status > 400) {
        throw new Error(res.status)
      }

      return await res.json()
    } catch (error) {
      console.log(`Currently facing issue with ${error.message}`)
    }
  },

  async details(id) {
    try {
      const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)

      return await res.json()
    } catch (error) {
      console.log(`Currently facing issue with ${error.message}`)
    }

  },

  async upcoming() {
    try {
      const res = await fetch(`${BASE_URL}/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)

      return await res.json()
    } catch (error) {
      console.log(`Currently facing issue with ${error.message}`)
    }
  },

  async recommended(id) {
    try {
      const res = await fetch(`${BASE_URL}/movie/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)

      return await res.json()
    } catch (error) {
      console.log(`Currently facing issue with ${error.message}`)
    }
  }
}
