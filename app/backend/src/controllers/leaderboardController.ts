import { Request, Response } from 'express';
// import HttpException from '../shared/HttpException';
import LeaderboardService from '../services/leaderboardService';

class LeaderboardController {
  private leaderboardService: LeaderboardService;

  constructor() {
    this.leaderboardService = new LeaderboardService();
  }

  public async getHomeLeaderboard(req: Request, res: Response) {
    await this.leaderboardService.findAll();
    res.status(200).json();
  }
}

export default LeaderboardController;
