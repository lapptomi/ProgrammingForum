/* eslint-disable prefer-destructuring */
import { NextFunction, Request, Response } from 'express';

export const tokenExtractor = (req: Request, _res: Response, next: NextFunction): void => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const auth: Array<string> = authorization.split(' ');
    // auth[0] should equal 'bearer'
    // and auth[1] should be the token
    req.token = auth[1];
  }
  next();
};

export const errorHandler = (
  err: Error, _req: Request, _res: Response, next: NextFunction,
): void => {
  console.log('ERROR =', err);
  next();
};
