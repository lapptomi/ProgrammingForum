const { pool } = require('../config/dbconfig');

const getAll = async () => {
  const result = await pool.query('SELECT * FROM Comments');
  return result.rows;
};

const findByPostId = async (postId) => {
  const query = ('SELECT * FROM Comments WHERE (post_id = $1)');
  const result = await pool.query(query, [postId]);
  return result.rows; // result.rows are the comments found from the db
};

const create = async (postId, writerId, writerName, comment) => {
  const query = ('INSERT INTO Comments (post_id, writer_id, writer_username, comment) VALUES ($1, $2, $3, $4)');
  const values = [postId, writerId, writerName, comment];
  await pool.query(query, values);

  return {
    postId, writerId, writerName, comment,
  };
};

module.exports = {
  getAll,
  findByPostId,
  create,
};
