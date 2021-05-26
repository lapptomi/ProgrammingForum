/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IPost } from '../types';

/* eslint-disable arrow-body-style */
export const setLoading = (loading: boolean) => {
  return {
    type: 'SET_LOADING_STATUS',
    data: loading,
  };
};

export const setPostsList = (posts: Array<IPost>) => {
  return {
    type: 'SET_POSTS_LIST',
    data: posts,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer = (state: any, action: { type: any; data: any; }) => {
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
