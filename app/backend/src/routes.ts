import { Router, Request, Response } from 'express';
import LoginController from './controllers/loginController';
import MatchController from './controllers/matchController';
import TeamController from './controllers/teamController';
import LeaderboardController from './controllers/leaderboardController';
import tokenValidation from './middlewares/tokenValidation';
import validateLogin from './middlewares/validateLogin';
import validateMatches from './middlewares/matchesValidation';

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

routes.post('/matches', tokenValidation, validateMatches, (req: Request, res: Response) =>
  matchController.createMatch(req, res));

routes.patch('/matches/:id/finish', tokenValidation, (req: Request, res: Response) =>
  matchController.finishMatch(req, res));

routes.patch('/matches/:id', tokenValidation, (req: Request, res: Response) =>
  matchController.editMatchGoals(req, res));

const leaderboardController = new LeaderboardController();

routes.get('/leaderboard/home', (req: Request, res: Response) =>
  leaderboardController.getHomeLeaderboard(req, res));

routes.get('/leaderboard/away', (req: Request, res: Response) =>
  leaderboardController.getAwayLeaderboard(req, res));

routes.get('/leaderboard', (req: Request, res: Response) =>
  leaderboardController.getLeaderboard(req, res));

export default routes;
