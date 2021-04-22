/* eslint-disable no-alert */
import axios from 'axios';

const baseUrl = '/api/login';

const logout = () => {
  if (window.confirm('Are you sure you want to log out?')) {
    window.localStorage.clear();
    window.location.replace('/');
  }
};

const getToken = () => {
  const loggedUser = window.localStorage.getItem('loggedUser');
  if (!loggedUser) {
    return null;
  }
  return JSON.parse(loggedUser).token;
};

const login = async ({ username, password }) => {
  const { data } = await axios.post(baseUrl, { username, password });
  return data;
};

export default {
  login,
  logout,
  getToken,
};
