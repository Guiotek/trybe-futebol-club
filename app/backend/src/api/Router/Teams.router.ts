import { Router } from 'express';
import TeamsController from '../Controller/Teams.controller';

const teamsController = new TeamsController();

const teamsRouter = Router();

teamsRouter.get('/teams', (req, res) => teamsController.getAll(req, res));
teamsRouter.get('/teams/:id', (req, res) => teamsController.getOne(req, res));

export default teamsRouter;
