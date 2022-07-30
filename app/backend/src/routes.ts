import { Router, Request, Response } from 'express';
import LoginController from './controllers/loginController';
import TeamController from './controllers/teamController';
import tokenValidation from './middlewares/tokenValidation';
import validateLogin from './middlewares/validateLogin';

const routes: Router = Router();

const loginController = new LoginController();
routes.post('/login', validateLogin, (req: Request, res: Response) =>
  loginController.login(req, res));

routes.get('/login/validate', tokenValidation, (req: Request, res: Response) =>
  loginController.loginValidate(req, res));

const teamController = new TeamController();

routes.get('/teams', (req: Request, res: Response) =>
  teamController.getTeams(req, res));

export default routes;
