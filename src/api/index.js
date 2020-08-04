export default {
  async index() {
    const res = await fetch('https://api.themoviedb.org/3/movie/550?api_key=5107c68304ebe2230239976ae7a05c92')
    console.log('res')
    console.log(res)
    return await res.json()
  }
}
