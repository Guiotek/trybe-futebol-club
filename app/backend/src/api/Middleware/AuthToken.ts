import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
// import Users from '../../database/models/Users';

const AuthToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  if (token.length < 155) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  const secret = process.env.JWT_SECRET as string;
  const decoded = await jwt.verify(token, secret) as JwtPayload;
  if (!decoded) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  req.body.user = decoded;
  next();
};

export default AuthToken;
