import { NextFunction, Request, Response } from 'express';
import HttpException from '../shared/HttpException';

const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  if (!regex.test(email)) {
    throw new HttpException(401, 'Incorrect email or password');
  }
  if (password.length < 7) {
    throw new HttpException(401, 'Incorrect email or password');
  }
  next();
};

export default validateLogin;
