import { Router } from 'express';
import { getRecommendations, postRecommendation, upvoteRecommendation, downvoteRecommendation, getRecommendationsRandom, getRecommendationsRandomByGenre } from '../controllers/recommendationsController';
import { postRecommendationMiddleware, checkIdMiddleware } from '../middlewares/recommendationsMiddlewares';

const recommendations = Router();

recommendations.post('/', postRecommendationMiddleware, postRecommendation);
recommendations.get('/', getRecommendations);
recommendations.post('/:id/upvote', checkIdMiddleware, upvoteRecommendation);
recommendations.post('/:id/downvote', checkIdMiddleware, downvoteRecommendation);
recommendations.get('/random', getRecommendationsRandom);
recommendations.get('/genres/:id/random', checkIdMiddleware, getRecommendationsRandomByGenre);

export default recommendations;