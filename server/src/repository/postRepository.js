const pool = require('../config/dbconfig');

const getAll = async () => {
  const result = await pool.query('SELECT * FROM Posts');
  return result.rows;
};

const create = async (newPost) => {
  const query = ('INSERT INTO Posts (title, content) VALUES ($1, $2)');
  const values = [newPost.title, newPost.content];
  await pool.query(query, values);

  return {
    title: newPost.title,
    content: newPost.content,
  };
};

module.exports = {
  getAll,
  create,
};
