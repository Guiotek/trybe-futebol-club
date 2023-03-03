import { Router } from 'express';
import MatchesController from '../Controller/Matches.controller';

const machesController = new MatchesController();

const machesRouter = Router();

machesRouter.get('/matches', (req, res) => machesController.getAll(req, res));
// machesRouter.get(
//   '/matches:query',
//   (req, res) => machesController.filter(req, res),
//   (req, _res) => console.log(req.query),
// );

export default machesRouter;
