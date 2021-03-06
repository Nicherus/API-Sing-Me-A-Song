import { validateGenre } from '../validations/genders';
import { Request, Response, NextFunction } from 'express';


export const postGenreMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
	const { name } = request.body;

	if(!name) return response.status(400).send({error: 'Send a Genre'});

	const failValidation = validateGenre(name);
	
	if(failValidation) return response.status(400).send({error: 'Please, check the data you are sending'});

	next();
};