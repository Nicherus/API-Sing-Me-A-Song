import { Router } from 'express';
import { postGenreMiddleware } from '../middlewares/genresMiddlewares';
import { getGenres, postGenre } from '../controllers/genresController';

const genres = Router();

genres.post('/', postGenreMiddleware, postGenre);
genres.get('/', getGenres);

export default genres;