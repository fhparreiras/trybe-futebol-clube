import { ILeaderboard } from '../interfaces/ILeaderboard';

const leaderboardObject = (home: ILeaderboard, away: ILeaderboard): ILeaderboard => {
  const totalPoints = home.totalPoints + away.totalPoints;
  const totalGames = home.totalGames + away.totalGames;
  const maxPoints = totalGames * 3;
  return {
    name: home.name,
    totalPoints,
    totalGames,
    totalVictories: home.totalVictories + away.totalVictories,
    totalDraws: home.totalDraws + away.totalDraws,
    totalLosses: home.totalLosses + away.totalLosses,
    goalsFavor: home.goalsFavor + away.goalsFavor,
    goalsOwn: home.goalsOwn + away.goalsOwn,
    goalsBalance: home.goalsBalance + away.goalsBalance,
    efficiency: ((totalPoints / maxPoints) * 100).toFixed(2),
  };
};

export default leaderboardObject;
