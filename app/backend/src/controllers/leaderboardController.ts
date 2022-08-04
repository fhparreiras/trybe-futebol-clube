import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';
import generateHomeLeaderboard from '../utils/generateHomeLeaderboard';
import generateAwayLeaderboard from '../utils/generateAwayLeaderboard';
import leaderboardObject from '../utils/leaderboardObject';
import { ILeaderboard } from '../interfaces/ILeaderboard';

class LeaderboardController {
  private leaderboardService: LeaderboardService;

  constructor() {
    this.leaderboardService = new LeaderboardService();
  }

  public async getHomeLeaderboard(req: Request, res: Response) {
    const matches = await this.leaderboardService.findAll();
    const result = generateHomeLeaderboard(matches);
    result.sort((a: ILeaderboard, b: ILeaderboard) =>
      (b.totalPoints - a.totalPoints || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor || a.goalsOwn - b.goalsOwn));
    res.status(200).json(result);
  }

  public async getAwayLeaderboard(req: Request, res: Response) {
    const matches = await this.leaderboardService.findAll();
    const result = generateAwayLeaderboard(matches);
    result.sort((a: ILeaderboard, b: ILeaderboard) =>
      (b.totalPoints - a.totalPoints || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor || a.goalsOwn - b.goalsOwn));
    res.status(200).json(result);
  }

  public async getLeaderboard(req: Request, res: Response) {
    const matches = await this.leaderboardService.findAll();
    const resultHome = generateHomeLeaderboard(matches);
    const resultAway = generateAwayLeaderboard(matches);
    const generalResult: ILeaderboard[] = [];
    resultHome.forEach((home: ILeaderboard) => {
      resultAway.forEach((away: ILeaderboard) => {
        if (home.name === away.name) {
          generalResult.push(leaderboardObject(home, away));
        }
      });
    });
    generalResult.sort((a: ILeaderboard, b: ILeaderboard) =>
      (b.totalPoints - a.totalPoints || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor || a.goalsOwn - b.goalsOwn));
    res.status(200).json(generalResult);
  }
}

export default LeaderboardController;
