const _ = require('lodash');

const parseEmail = (email) => {
  if (!_.isString(email) || email.length > 30 || !(email)) {
    throw new Error(`Invalid or missing email: ${email}`);
  }
  return email;
};

const parseUsername = (username) => {
  if (!_.isString(username) || username.length > 30 || !(username)) {
    throw new Error(`Invalid or missing username: ${username}`);
  }
  return username;
};

const parsePassword = (password) => {
  if (!_.isString(password) || password.length > 30 || !(password)) {
    throw new Error(`Invalid or missing password: ${password}`);
  }
  return password;
};

const parseNewUser = (user) => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log('User = ', user);
  }
  return {
    email: parseEmail(user.email),
    username: parseUsername(user.username),
    password: parsePassword(user.password),
  };
};

module.exports = {
  parseNewUser,
};
