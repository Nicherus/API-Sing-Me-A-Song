
import 'reflect-metadata';
import 'dotenv/config';
import {createConnection} from 'typeorm';

const database = process.env.DATABASE_URL;

createConnection({
	'type': 'postgres',
	'url': database,
	'synchronize': true,
	'logging': false,
	'entities': [
		'src/entity/**/*.ts'
	],
	'migrations': [
		'src/migration/**/*.ts'
	],
	'subscribers': [
		'src/subscriber/**/*.ts'
	],
	'cli': {
		'entitiesDir': 'src/entity',
		'migrationsDir': 'src/migration',
		'subscribersDir': 'src/subscriber'
	}
}).then(async () => {
	console.log(('Connected to the database!'));
	import('./server');
}).catch(error => {
	console.log(error);
});