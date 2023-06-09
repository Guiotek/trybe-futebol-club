import { Router } from 'express';
import MatchesController from '../Controller/Matches.controller';
import AuthToken from '../Middleware/AuthToken';
import CreateMatcheMiddleware from '../Middleware/CreateMatchesMiddleware';

const machesController = new MatchesController();

const machesRouter = Router();

machesRouter.get('/matches', (req, res) => machesController.getAll(req, res));
machesRouter.patch(
  '/matches/:id/finish',
  (req, res, next) => AuthToken(req, res, next),
  (req, res, next) => machesController.finish(req, res, next),
);
machesRouter.patch(
  '/matches/:id',
  (req, res, next) => AuthToken(req, res, next),
  (req, res) => machesController.update(req, res),
);
machesRouter.post(
  '/matches',
  (req, res, next) => AuthToken(req, res, next),
  (req, res, next) => CreateMatcheMiddleware(req, res, next),
  (req, res) => machesController.create(req, res),
);

export default machesRouter;
