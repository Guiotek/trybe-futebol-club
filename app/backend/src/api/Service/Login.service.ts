import * as bcrypt from 'bcryptjs';
import Users from '../../database/models/Users';
import BadRequest from '../Errors/BadRequest';
import Unauthorized from '../Errors/Unauthorized';
import AuthBody from '../interfaces/AuthBody';
import { sign } from '../utils/JWT';

export default class LoginService {
  public invalid = 'Invalid email or password';
  public verifyBody = async (body: AuthBody) => {
    if (!body.email) {
      throw new BadRequest('All fields must be filled');
    }
    if (!body.password) {
      throw new BadRequest('All fields must be filled');
    }
  };

  public verifyEmailAndPass = async (body: AuthBody) => {
    const expression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    const { email, password } = body;
    const result: boolean = expression.test(email);
    if (!result) {
      throw new Unauthorized(this.invalid);
    }
    if (password.length < 6) {
      throw new Unauthorized(this.invalid);
    }
  };

  public verifyPassword = async (userPassword: Users | null, bodyPassword: string) => {
    if (!userPassword) {
      throw new Unauthorized(this.invalid);
    }
    const passwordValid = await bcrypt.compare(bodyPassword, userPassword.password);
    if (!passwordValid) {
      throw new Unauthorized(this.invalid);
    }
  };

  public login = async (body: AuthBody) => {
    await this.verifyBody(body);
    await this.verifyEmailAndPass(body);
    const user = await Users.findOne({
      where: { email: body.email },
    });
    await this.verifyPassword(user, body.password);
    const token = sign(body);
    return token;
  };
}
