import * as jwt from 'jsonwebtoken';
import AuthSign from '../interfaces/AuthSign';

const secret = process.env.JWT_SECRET as string;

export const sign = (payload: AuthSign) => jwt.sign(payload, secret);

export const verify = (token: string) => {
  jwt.verify(token, secret);
};

export const decode = (token:string) => {
  jwt.decode(token);
};
