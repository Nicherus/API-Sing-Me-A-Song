import { getConnection } from 'typeorm';
import { Request, Response } from 'express';
import { Genre } from '../entities/Genre';

const genresRepository = getConnection().getRepository(Genre);

export const getGenres = async (request: Request, response: Response) : Promise<any> => {
	
	const genres = await genresRepository.find({
		order: {
			name: 'ASC',
		}
	});
	
	if(genres) return response.status(200).json(genres);

	return response.status(500).send({error: 'internal error please send this to a developer'});
};

export const postGenre = async (request: Request, response: Response) : Promise<Response> => {
	const { name } = request.body;
	
	const genreExists = await genresRepository.find({where: { name: name }});
	if(genreExists[0]) return response.status(409).send({error: 'Genre already exists'});

	const genre = new Genre();
	genre.name = name;
	const saveGenre = await genre.save();
	if(saveGenre) return response.status(201).send('Ok!');
	
	return response.status(500).send({error: 'internal error please send this to a developer'});
};