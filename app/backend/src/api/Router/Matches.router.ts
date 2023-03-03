import { Router } from 'express';
import MatchesController from '../Controller/Matches.controller';

const machesController = new MatchesController();

const machesRouter = Router();

machesRouter.get('/matches', (req, res) => machesController.getAll(req, res));

export default machesRouter;
