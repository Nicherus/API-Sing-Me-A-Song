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


export const upvoteRecommendation = async (request: Request, response: Response) : Promise<Response> => {
	const id = request.params.id;
	
	const update = await getConnection().getRepository(Recommendation).createQueryBuilder()
		.update(Recommendation)
		.set({ score: () => 'score + 1' })
		.where('id = :id', { id: id })
		.execute();

	if(update) return response.status(200).send('Ok!');

	return response.status(500).send({error: 'internal error please send this to a developer'});
};


export const downvoteRecommendation = async (request: Request, response: Response) : Promise<Response> => {
	const id = request.params.id;
	
	const update = await getConnection().getRepository(Recommendation).createQueryBuilder()
		.update(Recommendation)
		.set({ score: () => 'score - 1' })
		.where('id = :id', { id: id })
		.returning('score').execute();
	console.log(update.raw[0].score);

	if(update.raw[0].score < -4){
		deleteRecommendation(id);
	}

	if(update) return response.status(200).send('Ok!');

	return response.status(500).send({error: 'internal error please send this to a developer'});
};

export const getRecommendations = async (request: Request, response: Response) : Promise<Response> => {

	const recommendations = await recommendationsRepository.find();
	
	if(recommendations) return response.status(201).json(recommendations);

	return response.status(500).send({error: 'internal error please send this to a developer'});
};

export const getRecommendationsRandom = async (request: Request, response: Response) : Promise<Response> => {

	const recommendations = await recommendationsRepository.find({ relations: ['genres'] });
	if(!recommendations) return response.status(404).send({error: 'no songs registered.'});

	let recommendationsFiltered = [];
	let isArrayEmpty = false;

	const random = Math.floor(Math.random() * 100) + 1;
	if(random > 70){
		recommendationsFiltered = recommendations.filter((item) => item.score > -5 && item.score <= 10);
		if(!recommendationsFiltered.length) isArrayEmpty = true;
	} else if(random <= 70){
		recommendationsFiltered = recommendations.filter((item) => item.score > 10);
		if(!recommendationsFiltered.length) isArrayEmpty = true;
	}
	
	let randomRecommendation = {};
	if(isArrayEmpty){
		randomRecommendation = recommendations[Math.floor(Math.random() * recommendations.length)];
	} else{
		randomRecommendation = recommendationsFiltered[Math.floor(Math.random() * recommendationsFiltered.length)];
	}
	
	if(randomRecommendation) return response.status(201).json(randomRecommendation);

	return response.status(500).send({error: 'internal error please send this to a developer'});
};


export const getRecommendationsRandomByGenre = async (request: Request, response: Response) : Promise<Response> => {
	const genreId = request.params.id;
	const recommendations = await recommendationsRepository.find({ relations: ['genres'] });
	if(!recommendations) return response.status(404).send({error: 'no songs registered.'});

	let recommendationsFiltered = [];
	let isArrayEmpty = false;

	const random = Math.floor(Math.random() * 100) + 1;
	if(random > 70){
		recommendationsFiltered = recommendations.filter((item) => item.score > -5 && item.score <= 10 && item.genres.find((item) => item.id == genreId));
		
		if(!recommendationsFiltered.length) isArrayEmpty = true;
	} else if(random <= 70){
		recommendationsFiltered = recommendations.filter((item) => item.score > 10 && item.genres.find((item) => item.id == genreId));
		
		if(!recommendationsFiltered.length) isArrayEmpty = true;
	}
	
	let randomRecommendation = {};
	if(isArrayEmpty){
		randomRecommendation = recommendations[Math.floor(Math.random() * recommendations.length)];
	} else{
		randomRecommendation = recommendationsFiltered[Math.floor(Math.random() * recommendationsFiltered.length)];
	}
	
	if(randomRecommendation) return response.status(201).json(randomRecommendation);
	
	return response.status(500).send({error: 'internal error please send this to a developer'});
};

export const deleteRecommendation = async (id: string) : Promise<boolean> => {
	try{
		await recommendationsRepository.delete(id);
		return true;
	} catch{
		return false;
	}
};