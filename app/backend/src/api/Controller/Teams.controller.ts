import { Request, Response } from 'express';
import TeamService from '../Service/Teams.service';

export default class TeamsController {
  private service: TeamService;

  constructor() {
    this.service = new TeamService();
  }

  public async getAll(req:Request, res: Response): Promise<Response> {
    const allTeams = await this.service.getAll();
    return res.status(200).json(allTeams);
  }

  public async getOne(req:Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const idNumber = Number(id);
    const Team = await this.service.getOne(idNumber);
    return res.status(200).json(Team);
  }
}
