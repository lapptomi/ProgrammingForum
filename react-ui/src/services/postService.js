import axios from 'axios';

const baseUrl = '/api/posts';

// Add auth / token later
const create = async (newPost) => {
  const { data } = await axios.post(baseUrl, newPost);
  return data;
};

export default {
  create,
};
