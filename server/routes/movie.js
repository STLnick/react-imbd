import dotenv from 'dotenv';
import express from 'express';
import got from 'got';
import querystring from 'querystring';

dotenv.config();

const router = express.Router();

router.get('/', async (req, res) => {
  const query = querystring.parse(req.url.slice(req.url.indexOf('?') + 1));
  const { body } = await got(`${process.env.BASE_URL}/search/movie?api_key=${process.env.API_KEY}&query=${query.query}&page=1&include_adult=false`);
  res.status(200).end(body);
});

router.get('/details', async (req, res) => {
  const query = querystring.parse(req.url.slice(req.url.indexOf('?') + 1));
  const { body } = await got(`${process.env.BASE_URL}/movie/${query.id}?api_key=${process.env.API_KEY}&language=en-US`);
  res.status(200).end(body);
});

router.get('/upcoming', async (req, res) => {
  const { body } = await got(`${process.env.BASE_URL}/movie/upcoming?api_key=${process.env.API_KEY}&language=en-US&page=1`);
  res.status(200).end(body);
});

router.get('/recommended', async (req, res) => {
  const query = querystring.parse(req.url.slice(req.url.indexOf('?') + 1));
  const { body } = await got(`${process.env.BASE_URL}/movie/${query.id}/recommendations?api_key=${process.env.API_KEY}&language=en-US&page=1`);
  res.status(200).end(body);
});

export default router;
