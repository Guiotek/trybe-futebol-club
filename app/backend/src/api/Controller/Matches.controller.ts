import { NextFunction, Request, Response } from 'express';
import MatchesService from '../Service/Matches.service';
import ErrorMiddleware from '../Middleware/ErrorMiddleware';

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

  public async update(req:Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const ids = Number(id);
    await this.service.update(req, ids);
    return res.status(200).json({ message: 'updated' });
  }

  public async create(req:Request, res: Response): Promise<Response> {
    const result = await this.service.create(req);
    return res.status(201).json(result);
  }

  public async finish(req:Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const idN = Number(id);
      await this.service.finish(idN);
      return res.status(200).json({ message: 'Finished' });
      // ;
    } catch (error) {
      ErrorMiddleware(error, req, res, next);
    }
  }
}
