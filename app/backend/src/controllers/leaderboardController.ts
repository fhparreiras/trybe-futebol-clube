import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';
import generateHomeLeaderboard from '../utils/generateHomeLeaderboard';
import generateAwayLeaderboard from '../utils/generateAwayLeaderboard';

class LeaderboardController {
  private leaderboardService: LeaderboardService;

  constructor() {
    this.leaderboardService = new LeaderboardService();
  }

  public async getHomeLeaderboard(req: Request, res: Response) {
    const matches = await this.leaderboardService.findAll();
    const result = generateHomeLeaderboard(matches);
    result.sort((a: any, b: any) =>
      (b.totalPoints - a.totalPoints || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor || a.goalsOwn - b.goalsOwn));
    res.status(200).json(result);
  }

  public async getAwayLeaderboard(req: Request, res: Response) {
    const matches = await this.leaderboardService.findAll();
    const result = generateAwayLeaderboard(matches);
    result.sort((a: any, b: any) =>
      (b.totalPoints - a.totalPoints || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor || a.goalsOwn - b.goalsOwn));
    res.status(200).json(result);
  }
}

export default LeaderboardController;
