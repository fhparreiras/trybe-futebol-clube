import { Request, Response } from 'express';
import LoginService from '../services/loginService';
import LoginDto from './dto/loginDto';

class LoginController {
  private loginService: LoginService;

  constructor() {
    this.loginService = new LoginService();
  }

  public async login(req: Request<object, object, LoginDto>, res: Response) {
    const token = await this.loginService.authentication(req.body);
    res.status(200).json(token);
  }

  public loginValidate = async (req: Request, res: Response) => {
    const user = res.locals?.payload;
    const { role } = user;
    // const role = await this.loginService.validate();
    console.log('ROLE: ', role);
    res.status(200).json({ role });
  };
}

export default LoginController;
