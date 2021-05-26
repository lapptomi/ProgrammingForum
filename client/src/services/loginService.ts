/* eslint-disable no-alert */

const logout = (): void => {
  if (window.confirm('Are you sure you want to log out?')) {
    window.localStorage.clear();
    window.location.replace('/');
  }
};

export default {
  logout,
};
