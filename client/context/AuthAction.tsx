import { User, UserGoogle } from "@/types";

export const loginStart = () => ({
  type: "LOGIN_START",
});

export const loginSuccess = (user: User | UserGoogle | any) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const loginFailure = () => ({
  type: "LOGIN_FAILURE",
});

export const logout = () => ({
  type: "LOGOUT",
});

export const verify = () => ({
  type: "VERIFY",
});
