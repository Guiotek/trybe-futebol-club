import { Router } from 'express';
import LoginController from '../Controller/Login.controller';

const loginController = new LoginController();

const loginRouter = Router();

loginRouter.post('/login', (req, res, next) => loginController.login(req, res, next));

export default loginRouter;
