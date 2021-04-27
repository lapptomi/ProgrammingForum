/* eslint-disable arrow-body-style */
const _ = require('lodash');

const parseEmail = (email) => {
  if (!_.isString(email) || email.length > 30 || !email) {
    throw new Error(`Invalid or missing email: ${email}`);
  }
  return email;
};

const parseUsername = (username) => {
  if (!_.isString(username) || username.length > 30 || !username) {
    throw new Error(`Invalid or missing username: ${username}`);
  }
  return username;
};

const parsePassword = (password) => {
  if (!_.isString(password) || password.length > 30 || !password) {
    throw new Error(`Invalid or missing password: ${password}`);
  }
  return password;
};

const parseNewUser = (user) => {
  return {
    email: parseEmail(user.email),
    username: parseUsername(user.username),
    password: parsePassword(user.password),
  };
};

const parseTitle = (title) => {
  if (!_.isString(title) || title.length > 30 || !title) {
    throw new Error(`Invalid or missing title: ${title}`);
  }
  return title;
};

const parseDescription = (description) => {
  if (!_.isString(description) || description.length > 200 || !description) {
    throw new Error(`Invalid or missing description: ${description}`);
  }
  return description;
};

const parseNewPost = (newPost) => {
  return {
    title: parseTitle(newPost.title),
    description: parseDescription(newPost.description),
  };
};

module.exports = {
  parseNewUser,
  parseNewPost,
};
