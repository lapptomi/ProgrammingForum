const reducer = (state, action) => {
  switch (action.type) {
  case 'SET_POSTS_LIST':
    return {
      ...state,
      posts: action.posts,
    };
  default:
    throw new Error('Unexpected action');
  }
};

export default reducer;
