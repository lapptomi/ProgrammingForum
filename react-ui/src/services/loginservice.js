/* eslint-disable no-alert */
import axios from 'axios';

const baseUrl = '/api/login';

const logout = () => {
  if (window.confirm('Are you sure you want to log out?')) {
    window.localStorage.clear();
    window.location.replace('/');
  }
};

const login = async ({ username, password }) => {
  const { data } = await axios.post(baseUrl, { username, password });
  return data;
};

export default {
  login,
  logout,
};
