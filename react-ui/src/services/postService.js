import axios from 'axios';

const baseUrl = '/api/posts';

const token = window.localStorage.getItem('loggedUser');

const config = {
  headers: {
    Authorization: `bearer ${JSON.parse(token)}`,
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

const addComment = async (postId, comment) => {
  const response = await axios.post(
    `${baseUrl}/${postId}/comments`, { comment }, config,
  );
  return response;
};

const addLike = async (postId) => {
  const response = await axios.post(`${baseUrl}/${postId}/likes`, postId, config);
  return response;
};

export default {
  create,
  getAll,
  addComment,
  addLike,
};
