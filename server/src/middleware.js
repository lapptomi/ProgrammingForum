/* eslint-disable no-console */
const tokenExtractor = (req, _res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7);
  }
  next();
};

const errorHandler = (err, _req, _res, next) => {
  console.log('ERROR =', err);
  next();
};

module.exports = {
  tokenExtractor,
  errorHandler,
};
