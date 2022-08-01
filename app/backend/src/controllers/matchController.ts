import { match } from 'assert';
import { Request, Response } from 'express';
import MatchService from '../services/matchService';

class MatchController {
  private matchService: MatchService;

  constructor() {
    this.matchService = new MatchService();
  }

  public async getMatches(req: Request, res: Response) {
    const matches = await this.matchService.findAll();
    const newMatches = matches.map((el) => ({
      id: el.id,
      homeTeam: el.homeTeam,
      homeTeamGoals: el.homeTeamGoals,
      awayTeam: el.awayTeam,
      awayTeamGoals: el.awayTeamGoals,
      inProgress: el.inProgress,
      teamHome: { teamName: el.teamHome },
      teamAway: { teamName: el.teamAway },
    }));
    res.status(200).json(newMatches);
  }
}

export default MatchController;
