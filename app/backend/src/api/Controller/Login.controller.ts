import { NextFunction, Request, Response } from 'express';
import LoginService from '../Service/Login.service';

export default class LoginController {
  private service: LoginService;

  constructor() {
    this.service = new LoginService();
  }

  public async login(req:Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const result = await this.service.login(req.body);
      return res.status(200).json({ token: result });
    } catch (error) {
      next(error);
    }
  }
}
