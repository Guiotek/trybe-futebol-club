import { Request, Response } from 'express';
import LeaderboardService from '../Service/Leaderboard.service';

export default class LeaderboardController {
  private service: LeaderboardService;

  constructor() {
    this.service = new LeaderboardService();
  }

  public async getAll(req:Request, res: Response): Promise<Response> {
    const allTeams = await this.service.getAll();
    console.log(allTeams);
    return res.status(200).json(allTeams);
  }
}
