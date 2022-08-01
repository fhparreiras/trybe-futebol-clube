import sequelize = require('sequelize');
import Match from '../database/models/Match';
// import Team from '../database/models/Team';
import { IMatch } from '../interfaces/IMatch';
import HttpException from '../shared/HttpException';
import { teamAway, teamHome } from '../helpers/sequelizeLiterals';

class MatchService {
  private _match: IMatch[] | null;
  private _newMatch: IMatch;

  public async findAll() {
    this._match = await Match.findAll({
      raw: true,
      attributes: { include: [
        [sequelize.literal(teamHome), 'teamHome'],
        [sequelize.literal(teamAway), 'teamAway'],
      ] },
    });
    const messageIncorrect = 'Matches not found';
    if (!this._match) throw new HttpException(404, messageIncorrect);
    return this._match;
  }

  public async createMatch(
    homeTeam: number,
    awayTeam: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    this._newMatch = await Match.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return this._newMatch;
  }

  public finishMatch = async (id: number) => {
    await Match.update({ inProgress: false }, { where: { id } });
  };
}

export default MatchService;
