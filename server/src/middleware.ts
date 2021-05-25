/* eslint-disable prefer-destructuring */
import { NextFunction, Request, Response } from 'express';

export const errorHandler = (
  err: Error, _req: Request, _res: Response, next: NextFunction,
): void => {
  console.log('ERROR =', err);
  next();
};
