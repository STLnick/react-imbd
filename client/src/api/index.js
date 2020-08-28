import dotenv from 'dotenv'

dotenv.config()

export default {
  movies: (baseUrl = `http://localhost:${process.env.REACT_APP_PORT}`) => ({
    async index(query) {
      try {
        const res = await fetch(`${baseUrl}/movie?query=${query}`)

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
        const res = await fetch(`${baseUrl}/movie/details?id=${id}`)
        // const res = await fetch(`${baseUrl}/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)

        return await res.json()
      } catch (error) {
        console.log(`Currently facing issue with ${error.message}`)
      }

    },
    async upcoming() {
      try {
        const res = await fetch(`${baseUrl}/movie/upcoming`)

        return await res.json()
      } catch (error) {
        console.log(`Currently facing issue with ${error.message}`)
      }
    },
    async recommended(id) {
      try {
        const res = await fetch(`${baseUrl}/movie/recommended?id=${id}`)

        return await res.json()
      } catch (error) {
        console.log(`Currently facing issue with ${error.message}`)
      }
    }
  }),
  tv: (baseUrl = `http://localhost:${process.env.REACT_APP_PORT}`) => ({
    async index(query) {
      try {
        const res = await fetch(`${baseUrl}/tv?query=${query}`)

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
        const res = await fetch(`${baseUrl}/tv/details?id=${id}`)
        // const res = await fetch(`${baseUrl}/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)

        return await res.json()
      } catch (error) {
        console.log(`Currently facing issue with ${error.message}`)
      }

    },
    async upcoming() {
      try {
        const res = await fetch(`${baseUrl}/tv/upcoming`)

        return await res.json()
      } catch (error) {
        console.log(`Currently facing issue with ${error.message}`)
      }
    },
    async recommended(id) {
      try {
        const res = await fetch(`${baseUrl}/tv/recommended?id=${id}`)

        return await res.json()
      } catch (error) {
        console.log(`Currently facing issue with ${error.message}`)
      }
    }
  })
}
