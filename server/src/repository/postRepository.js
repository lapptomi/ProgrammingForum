const { pool } = require('../config/dbconfig');

const getAll = async () => {
  const result = await pool.query('SELECT * FROM Posts');
  return result.rows;
};

const create = async (userID, newPost) => {
  const query = ('INSERT INTO Posts (original_poster_id, title, description) VALUES ($1, $2, $3)');
  const values = [userID, newPost.title, newPost.description];
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
