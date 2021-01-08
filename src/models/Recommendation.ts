import { v4 as uuidv4 } from 'uuid';

class Recommendation {
	id: string;
	name: string;
	genresIds: string[];
	youtubeLink: string;
	score: number;

	constructor(
		name: string,
		genresIds: string[],
		youtubeLink: string,
	){
    	this.id = uuidv4();
		this.name = name;
		this.genresIds = genresIds;
		this.youtubeLink = youtubeLink;
	}
}

export default Recommendation;