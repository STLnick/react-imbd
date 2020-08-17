import dotenv from 'dotenv';
import http from 'http';
import got from 'got';
import querystring from 'querystring';

dotenv.config();
const port = 5000;

const server = http.createServer(async (req, res) => {
  const [path, _] = req.url.split('?');
  const query = querystring.parse(req.url.slice(req.url.indexOf('?') + 1));
  let data;

  switch (path) {
    case '/':
      data = await got(`${process.env.BASE_URL}/search/movie?api_key=${process.env.API_KEY}&query=${query.query}&page=1&include_adult=false`);

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/JSON');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end(data.body);
      break;
    case '/details':
      data = await got(`${process.env.BASE_URL}/movie/${query.id}?api_key=${process.env.API_KEY}&language=en-US`);

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/JSON');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end(data.body);
      break;
    case '/upcoming':
      data = await got(`${process.env.BASE_URL}/movie/upcoming?api_key=${process.env.API_KEY}&language=en-US&page=1`);

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/JSON');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end(data.body);
      break;
    case '/recommended':
      data = await got(`${process.env.BASE_URL}/movie/${query.id}/recommendations?api_key=${process.env.API_KEY}&language=en-US&page=1`);

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
