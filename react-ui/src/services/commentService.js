import axios from 'axios';

const baseUrl = '/api/posts';

const token = window.localStorage.getItem('loggedUser');

const config = {
  headers: {
    Authorization: `bearer ${JSON.parse(token)}`,
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
