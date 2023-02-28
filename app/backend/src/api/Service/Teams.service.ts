import Teams from '../../database/models/Teams';

export default class TeamsService {
  public getAll = async () => {
    const result = await Teams.findAll();
    return result;
  };

  public getOne = async (id: number) => {
    const result = await Teams.findOne({
      where: { id },
    });
    return result;
  };
}
