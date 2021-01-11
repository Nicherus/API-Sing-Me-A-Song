import { Router } from 'express';
import { getRecommendations, postRecommendation, upvoteRecommendation, downvoteRecommendation } from '../controllers/recommendationsController';
import { mockMiddleware, postRecommendationMiddleware, upvoteDownvoteRecommendationMiddleware } from '../middlewares/recommendationsMiddlewares';

const genres = Router();

genres.post('/', postRecommendationMiddleware, postRecommendation);
genres.get('/', getRecommendations);
genres.post('/:id/upvote', upvoteDownvoteRecommendationMiddleware, upvoteRecommendation);
genres.post('/:id/downvote', upvoteDownvoteRecommendationMiddleware, downvoteRecommendation);
genres.get('/random', mockMiddleware);
genres.get('/genres/:id/random', mockMiddleware);

export default genres;