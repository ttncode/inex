"use client";

import { FetchStateContext } from "@/types";
import { createContext, useContext, useReducer } from "react";
import FetchReducer from "./FetchReducer";

const INITIAL_STATE = {
  data: null, // Initialize user as null
  isFetching: false,
  error: false,
  dispatch: () => {},
};

const AuthContext = createContext<FetchStateContext>({
  data: null,
  isFetching: false,
  error: false,
  dispatch: () => {},
});

export const FetchContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(FetchReducer, INITIAL_STATE);

  const contextData = {
    data: state.data,
    isFetching: state.isFetching,
    error: state.error,
    dispatch,
  };

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};

export const useFetch = () => useContext(AuthContext);
export default FetchContextProvider;
