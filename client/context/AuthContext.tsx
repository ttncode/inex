"use client";

import AuthReducer from "./AuthReducer";
import { AuthStateContextValue } from "@/types";
import { createContext, useContext, useEffect, useReducer } from "react";
import { useSession } from "next-auth/react";
import { loginSuccess } from "./AuthAction";

const INITIAL_STATE = {
  user: null, // Initialize user as null
  isFetching: false,
  error: false,
  isVerify: false,
  dispatch: () => {},
};

if (typeof window !== "undefined") {
  // Check if running on the client side
  const storedUser = localStorage.getItem("user");
  INITIAL_STATE.user = storedUser ? JSON.parse(storedUser) : null;
}

const AuthContext = createContext<AuthStateContextValue>({
  user: null,
  isFetching: false,
  error: false,
  isVerify: false,
  dispatch: () => {},
});

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    if (!session?.user) return;
    const user = {
      username: session.user.name,
      email: session.user.email,
      avatar: session.user.image,
    };
    dispatch(loginSuccess(user));
  }, [session?.user]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  const contextData = {
    user: state.user,
    isFetching: state.isFetching,
    error: state.error,
    isVerify: state.isVerify,
    dispatch,
  };

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export default AuthContextProvider;
