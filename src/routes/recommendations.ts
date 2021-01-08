import { Router } from 'express';
import { mockMiddleware, postRecommendation } from '../middlewares/recommendationsMiddlewares';

const genres = Router();

genres.post('/', postRecommendation, mockMiddleware);
genres.post('/:id/upvote', mockMiddleware);
genres.post('/:id/downvote', mockMiddleware);
genres.get('/random', mockMiddleware);
genres.get('/genres/:id/random', mockMiddleware);

export default genres;