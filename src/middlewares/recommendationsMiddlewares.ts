import { Request, Response, NextFunction } from 'express';
import { validateRecommendation } from '../validations/recommendations';


export const postRecommendationMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<Response> => {
	const { name, genresIds, youtubeLink } = request.body;
	
	if(!name || !genresIds || !youtubeLink) return response.status(400).send({error: 'Send name, genres and youtube link'});

	const failValidation = validateRecommendation(name, genresIds, youtubeLink);
	
	if(failValidation) return response.status(400).send({error: 'Please, check the data you are sending'});

	next();
};

export const mockMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<NextFunction | void> => {
	next();
};
