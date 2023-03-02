import Users from '../../database/models/Users';
import AuthBody from '../interfaces/AuthBody';
import { sign } from '../utils/JWT';

export default class LoginService {
  public invalid = 'Invalid email or password';
  public verifyBody = async (body: AuthBody) => {
    if (!body.email || !body.password) {
      throw new Error('All fields must be filled');
    }
  };

  public verify = async (body: AuthBody) => {
    const expression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    const { email, password } = body;
    const result: boolean = expression.test(email);
    if (!result) {
      throw new Error(this.invalid);
    }

    if (password.length < 6) {
      throw new Error(this.invalid);
    }
  };

  public verifyPassword = async (userPassword: Users | null, bodyPassword: string) => {
    if (bodyPassword !== userPassword?.password) {
      throw new Error(this.invalid);
    }
  };

  public login = async (body: AuthBody) => {
    this.verifyBody(body);
    this.verify(body);
    const user = await Users.findOne({
      where: { email: body.email },
    });
    this.verifyPassword(user, body.password);
    const token = sign(body);
    return token;
  };
}
