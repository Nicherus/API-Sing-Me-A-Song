import { Request, Response, NextFunction } from 'express';
import { validateRecommendation, validateUpvoteDownvote } from '../validations/recommendations';


export const postRecommendationMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<Response> => {
	const { name, genresIds, youtubeLink } = request.body;
	
	if(!name || !genresIds || !youtubeLink) return response.status(400).send({error: 'Send name, genres and youtube link'});

	const failValidation = validateRecommendation(name, genresIds, youtubeLink);
	
	if(failValidation) return response.status(400).send({error: 'Please, check the data you are sending'});

	next();
};

export const checkIdMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<Response> => {
	const id = request.params.id;
	
	if(!id) return response.status(400).send({error: 'Send a valid id'});

	const failValidation = validateUpvoteDownvote(id);
	
	if(failValidation) return response.status(400).send({error: 'Please, send a valid id'});

	next();
};