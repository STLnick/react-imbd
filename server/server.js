import { promises as fs } from 'fs';
import http from 'http';
import url from 'url';
import got from 'got';

const port = 5000;

const serveFile = async (inputUrl) => {
  console.log(inputUrl);
  const file = await fs.readFile(`.${inputUrl}`, 'utf-8');
  return file;
};

const serveJSON = async () => {
  const { body } = await got('https://jsonplaceholder.typicode.com/todos');
  return body;
};

const server = http.createServer(async (req, res) => {
  res.statusCode = 200;

  if (req.url === '/site/index.html') {
    res.setHeader('Content-Type', 'text/html');
    res.end(await serveFile(req.url));
  } else if (req.url === '/site/todos') {
    res.setHeader('Content-Type', 'text/html');
    res.end(await serveJSON());
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log('server is listening!');
});
