import { INTEGER, Model, STRING } from 'sequelize';
import db from './index';

class Team extends Model {
  id: number;
  teamName: string;
}

Team.init({
  id: { type: INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  teamName: { type: STRING, allowNull: false },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  tableName: 'teams',
  timestamps: false,
});

export default Team;
