import { getConnection } from 'typeorm';
import { Request, Response } from 'express';
import { Genre } from '../entity/Genre';

const genresRepository = getConnection().getRepository(Genre); 

export const getGenres = async (request: Request, response: Response) : Promise<any> => {
	
	const genres = await genresRepository.find();
	
	if(genres) return response.status(201).json(genres);

	return response.status(500).send({error: 'internal error please send this to a developer'});
};