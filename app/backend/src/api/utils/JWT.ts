import * as jwt from 'jsonwebtoken';
import AuthBody from '../interfaces/AuthBody';

const secret = process.env.JWT_SECRET as string;

export const sign = (payload: AuthBody) => jwt.sign(payload, secret);

export const verify = () => {};
