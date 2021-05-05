import React, { createContext, useContext, useReducer } from 'react';

const currentUser = window.localStorage.getItem('loggedUser');
const userToken = currentUser
  ? JSON.parse(currentUser).token
  : null;

const initialState = {
  posts: [],
  isLoggedIn: currentUser !== null,
  token: userToken,
  isLoading: false,
};

export const StateContext = createContext();

export const useGlobalState = () => useContext(StateContext);

export const StateProvider = ({ reducer, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
