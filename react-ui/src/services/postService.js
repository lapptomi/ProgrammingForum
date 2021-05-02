import axios from 'axios';
import loginService from './loginService';

const baseUrl = '/api/posts';

const config = {
  headers: {
    Authorization: `bearer ${loginService.getToken()}`,
  },
};

const getAll = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};

const create = async (newPost) => {
  const response = await axios.post(baseUrl, newPost, config);
  return response;
};

const findCommentsByPostId = async (postId) => {
  const { data } = await axios.get(`${baseUrl}/${postId}/comments`);
  return data;
};

const addComment = async (postId, comment) => {
  const response = await axios.post(
    `${baseUrl}/${postId}/comments`, { comment }, config,
  );
  return response;
};

export default {
  create,
  getAll,
  findCommentsByPostId,
  addComment,
};
