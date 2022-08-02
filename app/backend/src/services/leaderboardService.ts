import sequelize = require('sequelize');
import Match from '../database/models/Match';
import { IMatch } from '../interfaces/IMatch';
// import HttpException from '../shared/HttpException';
import { teamAway, teamHome } from '../helpers/sequelizeLiterals';

class LeaderboardService {
  private _leaderboardHome: IMatch[] | null;

  public async findAll() {
    this._leaderboardHome = await Match.findAll({
      raw: true,
      attributes: { include: [
        [sequelize.literal(teamHome), 'teamHome'],
        [sequelize.literal(teamAway), 'teamAway'],
      ] },
    });
    return this._leaderboardHome;
  }
}

export default LeaderboardService;
