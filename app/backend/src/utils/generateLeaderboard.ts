// import { IMatch } from '../interfaces/IMatch';

function getHomeTeams(homeTeams: string []): string [] {
  const homeTeamsUniq: string [] = [];
  homeTeams.forEach((team: string) => {
    if (homeTeamsUniq.indexOf(team) === -1)homeTeamsUniq.push(team);
  });
  return homeTeamsUniq;
}

function getTotalGames(homeTeams: string[], homeTeamsUniq: string[]) {
  const totalGames: any[] = [];
  homeTeamsUniq.forEach((team) => {
    let countMatches = 0;
    homeTeams.forEach((homeTeam) => {
      if (homeTeam === team) countMatches += 1;
    });
    totalGames.push({ name: team, totalGames: countMatches });
  });
  return totalGames;
}

function getTotals(matches: any, homeTeamsUniq: string[]) {
  const result: any[] = [];
  homeTeamsUniq.forEach((team) => {
    let totalVictories = 0;
    let totalDraws = 0;
    let totalLosses = 0;
    let goalsFavor = 0;
    let goalsOwn = 0;
    matches.forEach(({ teamHome, homeTeamGoals, awayTeamGoals }: any) => {
      if (team === teamHome) {
        goalsFavor += homeTeamGoals;
        goalsOwn += awayTeamGoals;
        if (homeTeamGoals > awayTeamGoals) { totalVictories += 1; }
        if (homeTeamGoals < awayTeamGoals) totalLosses += 1;
        if (homeTeamGoals === awayTeamGoals) totalDraws += 1;
      }
    });
    result.push({ name: team, totalVictories, totalDraws, totalLosses, goalsFavor, goalsOwn });
  }); return result;
}

function getFinalResult(totals: any, games: any): any {
  const result = totals
    .map(({ name, totalVictories, totalDraws, totalLosses, goalsFavor, goalsOwn }:any, i:any) => (
      {
        name,
        totalPoints: (totalVictories * 3) + (totalDraws),
        totalGames: games[i].totalGames,
        totalVictories,
        totalDraws,
        totalLosses,
        goalsFavor,
        goalsOwn,
        goalsBalance: goalsFavor - goalsOwn,
        efficiency: ((((totalVictories * 3) + (totalDraws)) / (games[i].totalGames * 3)) * 100)
          .toFixed(2),
      }
    ));
  return result;
}

function generateLeaderboard(matches: any): any {
  const homeTeams: string[] = matches.map((match: any) => match.teamHome);
  const homeTeamsUniq = getHomeTeams(homeTeams);
  const totalGames = getTotalGames(homeTeams, homeTeamsUniq);
  const totals = getTotals(matches, homeTeamsUniq);
  const result = getFinalResult(totals, totalGames);
  return result;
}

export default generateLeaderboard;
