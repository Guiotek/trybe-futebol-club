// import { NextFunction, Request, Response } from 'express';
// import { JwtPayload } from 'jsonwebtoken';
// import { verify } from '../utils/JWT';
// import Users from '../../database/models/Users';

// export default async function AuthToken(req: Request, res: Response, next: NextFunction) {
//   const token = req.header('Authorization');
//   if (!token) {
//     return res.status(401).json({ error: 'Token não encontrado' });
//   }
//   try {
//     const decoded:JwtPayload = verify(token);
//     const { id } = decoded;
//     const user = await Users.findOne({
//       where: { id },
//     });
//     if (!user) {
//       return res.status(401).json({ message: 'Erro ao procurar usuário do token.' });
//     }
//     next();
//   } catch (error) {
//     const err = error as Error;
//     return res.status(401).json({ message: err.message });
//   }
// }
