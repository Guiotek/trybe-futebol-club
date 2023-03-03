import { Request, Response } from 'express';
import MatchesService from '../Service/Matches.service';

export default class MatchesController {
  private service: MatchesService;

  constructor() {
    this.service = new MatchesService();
  }

  public async getAll(req:Request, res: Response): Promise<Response> {
    const allTeams = await this.service.getAll();
    return res.status(200).json(allTeams);
  }
}
