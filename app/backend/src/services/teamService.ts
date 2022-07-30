import Team from '../database/models/Team';
import { ITeam } from '../interfaces/ITeam';
import HttpException from '../shared/HttpException';

class TeamService {
  private _team: ITeam[] | null;
  private _teamById: ITeam | null;

  public async findAll() {
    this._team = await Team.findAll();
    const messageIncorrect = 'Teams not found';
    if (!this._team) throw new HttpException(404, messageIncorrect);
    return this._team;
  }

  public async findOne(id: number) {
    this._teamById = await Team.findOne({
      attributes: ['id', 'teamName'],
      where: { id },
    });
    const messageIncorrect = 'Team not found';
    if (!this._teamById) throw new HttpException(404, messageIncorrect);
    return this._teamById;
  }
}

export default TeamService;
