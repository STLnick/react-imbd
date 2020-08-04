import dotenv from 'dotenv'

dotenv.config()

export default {
  async index(query) {
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${query}&page=1&include_adult=false`)
    console.log('res')
    console.log(res)
    return await res.json()
  }
}
