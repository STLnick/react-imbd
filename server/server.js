import dotenv from 'dotenv';
import { promises as fs } from 'fs';
import http from 'http';
import url from 'url';
import got from 'got';

dotenv.config();
const port = 5000;

const server = http.createServer(async (req, res) => {
  const [path, query] = req.url.split('?');
  let data;

  switch (path) {
    case '/':
      const queryText = url.parse(req.url).query.split('=')[1];
      data = await got(`${process.env.BASE_URL}/search/movie?api_key=${process.env.API_KEY}&query=${queryText}&page=1&include_adult=false`);

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/JSON');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end(data.body);
      break;
    case '/details':
      const id = url.parse(req.url).query.split('=')[1];
      data = await got(`${process.env.BASE_URL}/movie/${id}?api_key=${process.env.API_KEY}&language=en-US`);

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/JSON');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end(data.body);
      break;
    default:
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end('<h1>404 Page Not Found</h1>');
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`server is listening on port ${port}!`);
});

// Details fetch: fetch(`${baseUrl}/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
