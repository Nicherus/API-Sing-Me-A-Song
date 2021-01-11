import { getConnection } from 'typeorm';
import { Request, Response } from 'express';
import { Recommendation } from '../entities/Recommendation';
import { Genre } from '../entities/Genre';

const recommendationsRepository = getConnection().getRepository(Recommendation); 


export const postRecommendation = async (request: Request, response: Response) : Promise<Response> => {
	const { name, genresIds, youtubeLink } = request.body;
	
	
	const recommendationExists = await recommendationsRepository.find({where: { name: name }});
	if(recommendationExists[0]) return response.status(409).send({error: 'Recommendation name already exists'});

	const genresEntities: Genre[] = await Promise.all(genresIds.map((item: string) => {
		const genre = new Genre();
		genre.id = item;
		return genre;
	}));


	const recommendation = new Recommendation();
	recommendation.name = name;
	recommendation.genres = genresEntities;
	recommendation.youtubeLink = youtubeLink;
	recommendation.score = 0;
	const saveRecommendation = await recommendation.save();
	
	if(saveRecommendation) return response.status(201).send('Ok!');

	return response.status(500).send({error: 'internal error please send this to a developer'});
};

export const getRecommendations = async (request: Request, response: Response) : Promise<Response> => {

	const recommendations = await recommendationsRepository.find();
	
	if(recommendations) return response.status(201).json(recommendations);

	return response.status(500).send({error: 'internal error please send this to a developer'});
};