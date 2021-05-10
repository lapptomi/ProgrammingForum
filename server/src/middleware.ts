import { NextFunction, Request, Response } from 'express';

/* eslint-disable no-console */
export const tokenExtractor = (req: Request, _res: Response, next: NextFunction): void => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7);
  }
  next();
};

export const errorHandler = (
  err: Error, _req: Request, _res: Response, next: NextFunction,
): void => {
  console.log('ERROR =', err);
  next();
};
