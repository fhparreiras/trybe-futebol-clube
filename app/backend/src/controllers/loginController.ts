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
}

export default LoginController;
