import { Request, Response } from 'express';
import TeamService from '../services/teamService';

class TeamController {
  private teamService: TeamService;

  constructor() {
    this.teamService = new TeamService();
  }

  public async getTeams(req: Request, res: Response) {
    const teams = await this.teamService.findAll();
    res.status(200).json(teams);
  }

  public async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const teams = await this.teamService.findOne(Number(id));
    res.status(200).json(teams);
  }
}

export default TeamController;
