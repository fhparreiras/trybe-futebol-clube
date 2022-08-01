import { Request, Response } from 'express';
import HttpException from '../shared/HttpException';
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
    try {
      const newMatch = await this.matchService.createMatch(
        homeTeam,
        awayTeam,
        homeTeamGoals,
        awayTeamGoals,
      );
      res.status(201).json(newMatch);
    } catch (e) {
      throw new HttpException(404, 'There is no team with such id!');
    }
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    await this.matchService.finishMatch(Number(id));
    res.status(200).json({ message: 'Finished' });
  }
}

export default MatchController;
