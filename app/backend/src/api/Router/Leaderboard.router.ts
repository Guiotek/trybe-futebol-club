import { Router } from 'express';
import LeaderboardController from '../Controller/Leaderboard.controller';

const leaderboardController = new LeaderboardController();

const leaderboardRouter = Router();

leaderboardRouter.get('/leaderboard/home', (req, res) => leaderboardController.getAll(req, res));

export default leaderboardRouter;
