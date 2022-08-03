function getAwayTeams(awayTeams: string []): string [] {
  const awayTeamsUniq: string [] = [];
  awayTeams.forEach((team: string) => {
    if (awayTeamsUniq.indexOf(team) === -1)awayTeamsUniq.push(team);
  });
  return awayTeamsUniq;
}

function getTotalGames(awayTeams: string[], awayTeamsUniq: string[]) {
  const totalGames: any[] = [];
  awayTeamsUniq.forEach((team) => {
    let countMatches = 0;
    awayTeams.forEach((awayTeam) => {
      if (awayTeam === team) countMatches += 1;
    });
    totalGames.push({ name: team, totalGames: countMatches });
  });
  return totalGames;
}

function getTotals(matches: any, awayTeamsUniq: string[]) {
  const result: any[] = [];
  awayTeamsUniq.forEach((team) => {
    let totalVictories = 0;
    let totalDraws = 0;
    let totalLosses = 0;
    let goalsFavor = 0;
    let goalsOwn = 0;
    matches.forEach(({ teamAway, homeTeamGoals, awayTeamGoals }: any) => {
      if (team === teamAway) {
        goalsFavor += awayTeamGoals;
        goalsOwn += homeTeamGoals;
        if (homeTeamGoals < awayTeamGoals) { totalVictories += 1; }
        if (homeTeamGoals > awayTeamGoals) totalLosses += 1;
        if (homeTeamGoals === awayTeamGoals) totalDraws += 1;
      }
    });
    result.push({ name: team, totalVictories, totalDraws, totalLosses, goalsFavor, goalsOwn });
  }); return result;
}

function getFinalResult(totals: object[], games: any): any {
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

function generateAwayLeaderboard(matches: object[]): any {
  const awayTeams: string[] = matches.map((match: any) => match.teamAway);
  const awayTeamsUniq = getAwayTeams(awayTeams);
  const totalGames = getTotalGames(awayTeams, awayTeamsUniq);
  const totals = getTotals(matches, awayTeamsUniq);
  const result = getFinalResult(totals, totalGames);
  return result;
}

export default generateAwayLeaderboard;
