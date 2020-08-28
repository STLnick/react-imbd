import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import movie from './routes/movie';
import tv from './routes/tv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/movie', movie);
app.use('/tv', tv);

app.listen(process.env.PORT, () => {
  console.log(`server is listening on port ${process.env.PORT}!`);
});

// Details fetch: fetch(`${baseUrl}/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
