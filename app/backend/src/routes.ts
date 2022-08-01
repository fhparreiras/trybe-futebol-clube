import { Router, Request, Response } from 'express';
import LoginController from './controllers/loginController';
import MatchController from './controllers/matchController';
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

routes.get('/teams/:id', (req: Request, res: Response) =>
  teamController.getTeamById(req, res));

routes.get('/teams', (req: Request, res: Response) =>
  teamController.getTeams(req, res));

const matchController = new MatchController();

routes.get('/matches', (req: Request, res: Response) =>
  matchController.getMatches(req, res));

export default routes;
