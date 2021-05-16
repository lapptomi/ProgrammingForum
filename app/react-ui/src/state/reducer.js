/* eslint-disable arrow-body-style */
export const setLoading = (loading) => {
  return {
    type: 'SET_LOADING_STATUS',
    data: loading,
  };
};

export const setPostsList = (posts) => {
  return {
    type: 'SET_POSTS_LIST',
    data: posts,
  };
};

const reducer = (state, action) => {
  switch (action.type) {
  case 'SET_LOADING_STATUS':
    return { ...state, isLoading: action.data };
  case 'SET_POSTS_LIST':
    return { ...state, posts: action.data };
  default:
    throw new Error('Unexpected action');
  }
};

export default reducer;
