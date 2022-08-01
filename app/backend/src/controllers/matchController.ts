import { Request, Response } from 'express';
import MatchService from '../services/matchService';

class MatchController {
  private matchService: MatchService;

  constructor() {
    this.matchService = new MatchService();
  }

  public async getMatches(req: Request, res: Response) {
    const matches = await this.matchService.findAll();
    const newMatches = matches.map((match) => ({
      id: match.id,
      homeTeam: match.homeTeam,
      homeTeamGoals: match.homeTeamGoals,
      awayTeam: match.awayTeam,
      awayTeamGoals: match.awayTeamGoals,
      inProgress: match.inProgress,
      teamHome: { teamName: match.teamHome },
      teamAway: { teamName: match.teamAway },
    }));
    res.status(200).json(newMatches);
  }

  public async createMatch(req: Request, res: Response) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    const newMatch = await this.matchService.createMatch(
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
    );
    res.status(201).json(newMatch);
  }
}

export default MatchController;
