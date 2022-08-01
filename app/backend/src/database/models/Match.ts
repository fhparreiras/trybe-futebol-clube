import { BOOLEAN, INTEGER, Model } from 'sequelize';
import db from './index';
import Team from './Team';
import { ITeam } from '../../interfaces/ITeam';

class Match extends Model {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome?: ITeam;
  teamAway?: ITeam;
}

Match.init({
  id: { type: INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  homeTeam: { type: INTEGER, allowNull: false },
  homeTeamGoals: { type: INTEGER, allowNull: false },
  awayTeam: { type: INTEGER, allowNull: false },
  awayTeamGoals: { type: INTEGER, allowNull: false },
  inProgress: { type: BOOLEAN, allowNull: false },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  tableName: 'matches',
  timestamps: false,
});

Match.hasMany(Team, { foreignKey: 'id', as: 'home_team' });
Match.hasMany(Team, { foreignKey: 'id', as: 'away_team' });
Team.belongsTo(Match, { foreignKey: 'id', as: 'match' });

export default Match;
