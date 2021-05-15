import React, { createContext, useContext, useReducer } from 'react';

const currentUser = JSON.parse(window.localStorage.getItem('loggedUser'));

const initialState = {
  posts: [],
  isLoggedIn: currentUser !== null,
  loggedUser: currentUser,
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
