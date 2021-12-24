
const PORT = 8080;

export const baseUrl = `http://localhost:${PORT}`;

export const testUser = {
  email: 'testemail@gmail.com',
  username: 'testusername',
  password: "testpassword",
};

export const testUser2 = {
  email: 'testemail2@gmail.com',
  username: 'testusername2',
  password: "testpassword2",
};

export const nonExistingUser = {
  email: 'randomuser@gmail.com',
  username: 'invalidusername',
  password: "invalidpassword",
};

export const testPost = {
  title: 'randomtitle',
  description: 'randomdescription'
};
