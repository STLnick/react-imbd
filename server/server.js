import dotenv from 'dotenv';
import { promises as fs } from 'fs';
import http from 'http';
import url from 'url';
import got from 'got';

dotenv.config();
const port = 5000;

const server = http.createServer(async (req, res) => {
  const queryText = url.parse(req.url).query.split('=')[1];
  const { body } = await got(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${queryText}&page=1&include_adult=false`);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/JSON');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(body);
});

server.listen(port, '127.0.0.1', () => {
  console.log(`server is listening on port ${port}!`);
});

// /search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${query}&page=1&include_adult=false`
