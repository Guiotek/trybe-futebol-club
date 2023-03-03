import { Request } from 'express';
import Teams from '../../database/models/Teams';
import Matches from '../../database/models/Matches';

export default class MatchesService {
  public getAll = async () => {
    const result = await Matches.findAll({
      include: [{ model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } }],
    });
    return result;
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
}
