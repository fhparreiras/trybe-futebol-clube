import { ITeam } from './ITeam';

export interface IMatch {
  id?: number | undefined,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
  teamHome?: ITeam,
  teamAway?: ITeam,
}
