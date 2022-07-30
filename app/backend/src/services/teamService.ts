import Team from '../database/models/Team';
import { ITeam } from '../interfaces/ITeam';
import HttpException from '../shared/HttpException';

class TeamService {
  private _team: ITeam[] | null;

  public async findAll() {
    this._team = await Team.findAll();
    const messageIncorrect = 'Teams not found';
    if (!this._team) throw new HttpException(404, messageIncorrect);
    return this._team;
  }
}

export default TeamService;
