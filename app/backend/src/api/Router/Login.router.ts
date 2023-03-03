import { Router } from 'express';
import LoginController from '../Controller/Login.controller';
import AuthToken from '../Middleware/AuthToken';

const loginController = new LoginController();

const loginRouter = Router();

loginRouter.post('/login', (req, res, next) => loginController.login(req, res, next));
loginRouter.get(
  '/login/role',
  (req, res, next) => AuthToken(req, res, next),
  (req, res) => res.status(200).json({ role: req.body.user.role }),
);

export default loginRouter;
