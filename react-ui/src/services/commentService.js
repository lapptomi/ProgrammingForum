import axios from 'axios';
import loginService from './loginService';

const baseUrl = '/api/posts';

const config = {
  headers: {
    Authorization: `bearer ${loginService.getToken()}`,
  },
};

const findCommentsByPostId = async (postId) => {
  const { data } = await axios.get(`${baseUrl}/${postId}/comments`);
  return data;
};

const addLike = async (commentId) => {
  const response = await axios.post(
    `${baseUrl}/comments/${commentId}/likes`, commentId, config,
  );
  return response;
};

export default {
  findCommentsByPostId,
  addLike,
};
