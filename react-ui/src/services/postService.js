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

export default {
  create,
  getAll,
};
