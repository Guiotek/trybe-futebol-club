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
}
