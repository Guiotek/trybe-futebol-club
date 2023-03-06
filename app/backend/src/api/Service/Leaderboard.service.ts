import Model from '../../database/models';

export default class LeaderboardService {
  public getAll = async () => {
    // const allMatches = Matches.findAll();

    const allMatches = Model.query('');

    return allMatches;
  };
}
