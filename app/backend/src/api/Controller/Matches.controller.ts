import { Request, Response } from 'express';
import MatchesService from '../Service/Matches.service';

export default class MatchesController {
  private service: MatchesService;

  constructor() {
    this.service = new MatchesService();
  }

  public async getAll(req:Request, res: Response): Promise<Response> {
    if (req.query.inProgress) {
      const query = await this.service.filter(req);
      return res.status(200).json(query);
    }
    const allTeams = await this.service.getAll();
    return res.status(200).json(allTeams);
  }

  public async finish(req:Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const idN = Number(id);
    await this.service.finish(idN);
    return res.status(200).json({ message: 'Finished' });
  }
}
