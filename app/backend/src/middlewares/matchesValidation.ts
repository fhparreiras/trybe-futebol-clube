import { NextFunction, Request, Response } from 'express';
import HttpException from '../shared/HttpException';
import TeamService from '../services/teamService';

const validateMatches = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  const teamService = new TeamService();
  const teams = await teamService.findAll();
  const checkExistence = teams.some(({ id }) => id === homeTeam && id === awayTeam);
  if (!checkExistence) {
    throw new HttpException(401, 'There is no team with such id!');
  }
  if (homeTeam === awayTeam) {
    const errorMessage = 'It is not possible to create a match with two equal teams';
    throw new HttpException(401, errorMessage);
  }
  next();
};

export default validateMatches;
