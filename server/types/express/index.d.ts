/* eslint-disable @typescript-eslint/no-explicit-any */

// Needed for getting json web token from the request (req.token)
declare namespace Express {
  interface Request {
    token?: any;
  }
}
