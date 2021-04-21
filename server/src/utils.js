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

const parseContent = (content) => {
  if (!_.isString(content) || content.length > 200 || !content) {
    throw new Error(`Invalid or missing content: ${content}`);
  }
  return content;
};

const parseNewPost = (newPost) => {
  return {
    title: parseTitle(newPost.title),
    content: parseContent(newPost.content),
  };
};

module.exports = {
  parseNewUser,
  parseNewPost,
};
