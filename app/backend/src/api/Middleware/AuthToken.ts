import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
// import Users from '../../database/models/Users';

const AuthToken = async (req: Request, res: Response) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  if (token.length < 155) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  // const secret = process.env.JWT_SECRET as string;
  const decoded = await jwt.decode(token)?.normalize;
  if (!decoded) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  console.log(decoded);
  // const response = Users.findOne({
  //   where: { email },
  // });
  return res.status(200).send(decoded);
};

export default AuthToken;
