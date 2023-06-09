import { NextFunction, Request, Response } from 'express';
import Teams from '../../database/models/Teams';

const CreateMatcheMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;
  if (homeTeamId === awayTeamId) {
    return res.status(422).json(
      { message: 'It is not possible to create a match with two equal teams' },
    );
  }
  const teamOne = await Teams.findOne({
    where: { id: homeTeamId },
  });
  const teamTwo = await Teams.findOne({
    where: { id: awayTeamId },
  });
  if (!teamOne || !teamTwo) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  next();
};

export default CreateMatcheMiddleware;
