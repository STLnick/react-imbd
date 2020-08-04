export default {
  async index() {
    const res = fetch('https://api.themoviedb.org/3/movie/550?api_key=5107c68304ebe2230239976ae7a05c92')
    return await res.json()
  }
}
