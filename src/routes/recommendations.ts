import { Router } from 'express';
import { getRecommendations, postRecommendation } from '../controllers/recommendationsController';
import { mockMiddleware, postRecommendationMiddleware } from '../middlewares/recommendationsMiddlewares';

const genres = Router();

genres.post('/', postRecommendationMiddleware, postRecommendation);
genres.get('/', getRecommendations);
genres.post('/:id/upvote', mockMiddleware);
genres.post('/:id/downvote', mockMiddleware);
genres.get('/random', mockMiddleware);
genres.get('/genres/:id/random', mockMiddleware);

export default genres;