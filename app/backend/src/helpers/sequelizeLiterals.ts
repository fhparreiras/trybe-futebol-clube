export const teamHome = `(
  SELECT team_name
  FROM teams
  WHERE
    teams.id = matches.home_team
)`;

export const teamAway = `(
  SELECT team_name
  FROM teams
  WHERE
    teams.id = matches.away_team
)`;
