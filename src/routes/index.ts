import { Router } from 'express';
import genresRouter from './genres';
import recommendationsRouter from './recommendations';

const routes = Router();

routes.use('/genres', genresRouter);
routes.use('/recommendations', recommendationsRouter);
export default routes;