import { Request } from 'express';
import Teams from '../../database/models/Teams';
import Matches from '../../database/models/Matches';
import NotId from '../Errors/NotId';

export default class MatchesService {
  public getAll = async () => {
    const result = await Matches.findAll({
      include: [{ model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } }],
    });
    return result;
  };

  public update = async (req: Request, id: number) => {
    await Matches.update(
      req.body,
      { where: { id } },
    );
  };

  public filter = async (req: Request) => {
    const { inProgress } = req.query;
    if (inProgress === 'true') {
      const result = await Matches.findAll({
        include: [{ model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
          { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } }],
        where: { inProgress: true },
      });
      return result;
    }
    if (inProgress === 'false') {
      const result = await Matches.findAll({
        include: [{ model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
          { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } }],
        where: { inProgress: false },
      });
      return result;
    }
  };

  public finish = async (id: number) => {
    const match = await Matches.findOne(
      { where: { id } },
    );
    if (!match) {
      throw new NotId('id not found');
    }
    await Matches.update(
      { inProgress: false },
      { where: { id } },
    );
  };
}
