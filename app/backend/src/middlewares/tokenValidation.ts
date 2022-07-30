import { NextFunction, Request, Response } from 'express';
import TokenGenerator from '../shared/TokenGenerator';

const tokenValidation = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization || '';

  const tokenGenerator = new TokenGenerator();
  const payload = tokenGenerator.authenticateToken(token);

  res.locals.payload = payload;

  next();
};

export default tokenValidation;
