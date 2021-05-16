/* eslint-disable @typescript-eslint/no-explicit-any */

// Needed for getting jwt token from the request (req.token)
declare namespace Express {
  interface Request {
    token?: any;
  }
}
