import { NextFunction, Request, Response } from 'express';
import HttpException from '../shared/HttpException';
// import TeamService from '../services/teamService';

const validateMatches = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  if (homeTeam === awayTeam) {
    const errorMessage = 'It is not possible to create a match with two equal teams';
    throw new HttpException(401, errorMessage);
  }
  next();
};

export default validateMatches;
