import { Router, Request, Response } from 'express';
import LoginController from './controllers/loginController';
import validateLogin from './middlewares/validateLogin';

const routes: Router = Router();

const loginController = new LoginController();
routes.post('/login', validateLogin, (req: Request, res: Response) =>
  loginController.login(req, res));

export default routes;
