import axios from 'axios';
import loginService from './loginService';

const baseUrl = '/api/posts';

const config = {
  headers: {
    Authorization: `bearer ${loginService.getToken()}`,
  },
};

const create = async (newPost) => {
  const { data } = await axios.post(baseUrl, newPost, config);
  return data;
};

export default {
  create,
};
