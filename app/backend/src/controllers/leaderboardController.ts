import { Request, Response } from 'express';
// import HttpException from '../shared/HttpException';
import LeaderboardService from '../services/leaderboardService';
import generateLeaderboard from '../utils/generateLeaderboard';

class LeaderboardController {
  private leaderboardService: LeaderboardService;

  constructor() {
    this.leaderboardService = new LeaderboardService();
  }

  public async getHomeLeaderboard(req: Request, res: Response) {
    const matches = await this.leaderboardService.findAll();
    const result = generateLeaderboard(matches);
    result.sort((a: any, b: any) =>
      (b.totalPoints - a.totalPoints || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor || a.goalsOwn - b.goalsOwn));
    res.status(200).json(result);
  }
}

export default LeaderboardController;
