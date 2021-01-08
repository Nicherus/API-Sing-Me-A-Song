import { validateRecommendation } from '../validations/recommendations';


export const postRecommendation = async (request, response, next): Promise<any> => {
	const { name, genresIds, youtubeLink } = request.body;

	if(!name || !genresIds || !youtubeLink) return response.status(400).send({error: 'Send name, genres and youtube link'});

	const failValidation = validateRecommendation(name, genresIds, youtubeLink);
	
	if(failValidation) return response.status(400).send({error: 'Please, check the data you are sending'});
};

export const mockMiddleware = async (request, response, next): Promise<any> => {
	next();
};
