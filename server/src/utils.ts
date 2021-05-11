/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable arrow-body-style */

import * as _ from 'lodash';
import { NewComment, NewPost, NewUser } from '../types';

const parseEmail = (email: any): string => {
  if (!_.isString(email) || email.length > 30 || !email) {
    throw new Error(`Invalid or missing email: ${email as string}`);
  }
  return email;
};

const parseUsername = (username: any): string => {
  if (!_.isString(username) || username.length > 30 || !username) {
    throw new Error(`Invalid or missing username: ${username as string}`);
  }
  return username;
};

const parsePassword = (password: any): string => {
  if (!_.isString(password) || password.length > 30 || !password) {
    throw new Error(`Invalid or missing password: ${password as string}`);
  }
  return password;
};

const parseTitle = (title: any): string => {
  if (!_.isString(title) || title.length > 30 || !title) {
    throw new Error(`Invalid or missing title: ${title as string}`);
  }
  return title;
};

const parseDescription = (description: any): string => {
  if (!_.isString(description) || description.length > 200 || !description) {
    throw new Error(`Invalid or missing description: ${description as string}`);
  }
  return description;
};

export const parseId = (id: any): number => {
  if (!_.isNumber(id) || !id) {
    throw new Error(`Invalid or missing id: ${id as string}`);
  }
  return id;
};

export const toNewUser = (user: NewUser): NewUser => {
  return {
    email: parseEmail(user.email),
    username: parseUsername(user.username),
    password: parsePassword(user.password),
  };
};

export const toNewPost = (posterId: number, newPost: NewPost): NewPost => {
  return {
    original_poster_id: parseId(posterId),
    title: parseTitle(newPost.title),
    description: parseDescription(newPost.description),
  };
};

export const parseComment = (comment: any): string => {
  if (!_.isString(comment) || comment.length > 200 || !comment) {
    throw new Error(`Invalid or missing comment: ${comment as string}`);
  }
  return comment;
};

export const toNewComment = (object: NewComment): NewComment => {
  return {
    post_id: parseId(object.post_id),
    writer_id: parseId(object.writer_id),
    comment: parseComment(object.comment),
  };
};
